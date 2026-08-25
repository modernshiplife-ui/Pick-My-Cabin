(function () {
  const state = {
    view: 'home',
    query: '',
    activeLines: new Set(LINES.map((l) => l.id)),
    selectedShipId: null,
    selectedRating: null,
    selectedTags: new Set(),
    remoteReviews: {}, // shipId -> array, fetched from the API when available
    localReviews: JSON.parse(localStorage.getItem('pmc-reviews') || '[]'),
    addedShips: JSON.parse(localStorage.getItem('pmc-added-ships') || '[]'),
  };

  const allShips = () => SHIPS.concat(state.addedShips);
  const shipById = (id) => allShips().find((s) => s.id === id);
  const lineById = (id) => LINES.find((l) => l.id === id);

  const els = {
    search: document.getElementById('global-search'),
    lineFilters: document.getElementById('line-filters'),
    shipGrid: document.getElementById('ship-grid'),
    noResults: document.getElementById('no-results'),
    noResultsQuery: document.getElementById('no-results-query'),
    addShipToggle: document.getElementById('add-ship-toggle'),
    addShipForm: document.getElementById('add-ship-form'),
    addShipLine: document.getElementById('add-ship-line'),
    addShipName: document.getElementById('add-ship-name'),
    homeView: document.getElementById('home-view'),
    shipView: document.getElementById('ship-view'),
    backToHome: document.getElementById('back-to-home'),
    shipLineLabel: document.getElementById('ship-line-label'),
    shipTitle: document.getElementById('ship-title'),
    ratingSummary: document.getElementById('rating-summary'),
    reviewsList: document.getElementById('reviews-list'),
    reviewForm: document.getElementById('review-form'),
    reviewCabin: document.getElementById('review-cabin'),
    tagPick: document.getElementById('tag-pick'),
    reviewComment: document.getElementById('review-comment'),
    reviewAuthor: document.getElementById('review-author'),
    reviewSubmit: document.getElementById('review-submit'),
    reviewStatus: document.getElementById('review-status'),
  };

  function saveLocalReviews() {
    localStorage.setItem('pmc-reviews', JSON.stringify(state.localReviews));
  }

  function saveAddedShips() {
    localStorage.setItem('pmc-added-ships', JSON.stringify(state.addedShips));
  }

  function reviewsForShip(shipId) {
    const demo = DEMO_REVIEWS.filter((r) => r.shipId === shipId);
    const local = state.localReviews.filter((r) => r.shipId === shipId);
    const remote = state.remoteReviews[shipId] || [];
    return [...remote, ...local, ...demo];
  }

  // --- Home: search + browse ------------------------------------------------
  function renderLineFilters() {
    els.lineFilters.innerHTML = '';
    LINES.forEach((line) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.line = line.id;
      chip.setAttribute('aria-pressed', 'true');
      chip.textContent = line.name;
      chip.addEventListener('click', () => {
        if (state.activeLines.has(line.id)) {
          state.activeLines.delete(line.id);
          chip.setAttribute('aria-pressed', 'false');
        } else {
          state.activeLines.add(line.id);
          chip.setAttribute('aria-pressed', 'true');
        }
        renderShipGrid();
      });
      els.lineFilters.appendChild(chip);
    });
  }

  function renderShipGrid() {
    const q = state.query.trim().toLowerCase();
    const matches = allShips().filter((ship) => {
      if (!state.activeLines.has(ship.lineId)) return false;
      if (!q) return true;
      const line = lineById(ship.lineId);
      return ship.name.toLowerCase().includes(q) || (line && line.name.toLowerCase().includes(q));
    });

    els.noResults.hidden = matches.length > 0;
    els.noResultsQuery.textContent = state.query;
    els.addShipForm.hidden = true;
    if (matches.length === 0) {
      els.shipGrid.innerHTML = '';
      return;
    }

    els.shipGrid.innerHTML = matches
      .map((ship) => {
        const reviews = reviewsForShip(ship.id);
        const up = reviews.filter((r) => r.rating === 'up').length;
        const down = reviews.filter((r) => r.rating === 'down').length;
        const line = lineById(ship.lineId);
        const countLabel = reviews.length === 0 ? 'No reviews yet' : `${up}👍 ${down}👎`;
        return `
          <button class="ship-card" data-id="${ship.id}">
            <span class="ship-card-line">${line ? line.name : ''}</span>
            <span class="ship-card-name">${ship.name}</span>
            <span class="ship-card-count">${countLabel}</span>
          </button>`;
      })
      .join('');

    els.shipGrid.querySelectorAll('.ship-card').forEach((card) => {
      card.addEventListener('click', () => showShip(card.dataset.id));
    });
  }

  els.search.addEventListener('input', () => {
    state.query = els.search.value;
    renderShipGrid();
  });

  els.addShipToggle.addEventListener('click', () => {
    els.addShipLine.innerHTML = LINES.map((l) => `<option value="${l.id}">${l.name}</option>`).join('');
    els.addShipName.value = state.query;
    els.addShipForm.hidden = false;
  });

  els.addShipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = els.addShipName.value.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
    const ship = { id, lineId: els.addShipLine.value, name };
    state.addedShips.push(ship);
    saveAddedShips();
    showShip(id);
  });

  // --- Ship view -------------------------------------------------------------
  function showShip(shipId) {
    state.selectedShipId = shipId;
    state.selectedRating = null;
    state.selectedTags = new Set();
    els.homeView.hidden = true;
    els.shipView.hidden = false;
    document.getElementById('hero').classList.add('is-compact');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    renderShipView();
    loadRemoteReviews(shipId);
    resetForm();
  }

  els.backToHome.addEventListener('click', () => {
    els.shipView.hidden = true;
    els.homeView.hidden = false;
    document.getElementById('hero').classList.remove('is-compact');
    state.selectedShipId = null;
  });

  function renderShipView() {
    const ship = shipById(state.selectedShipId);
    if (!ship) return;
    const line = lineById(ship.lineId);
    els.shipLineLabel.textContent = line ? line.name : '';
    els.shipTitle.textContent = ship.name;

    const reviews = reviewsForShip(ship.id);
    const up = reviews.filter((r) => r.rating === 'up').length;
    const down = reviews.filter((r) => r.rating === 'down').length;
    els.ratingSummary.innerHTML = `
      <span class="summary-up">👍 <strong>${up}</strong></span>
      <span class="summary-down">👎 <strong>${down}</strong></span>
    `;

    if (reviews.length === 0) {
      els.reviewsList.innerHTML = `<p class="empty-note">No reviews yet for ${ship.name} — be the first to add one.</p>`;
    } else {
      els.reviewsList.innerHTML = reviews
        .map(
          (r) => `
        <article class="review-card${r.demo ? ' is-demo' : ''}">
          ${r.demo ? '<span class="demo-badge">Example</span>' : ''}
          <div class="review-card-head">
            <span class="review-cabin">Cabin ${r.cabin}</span>
            <span class="review-rating">${r.rating === 'up' ? '👍' : '👎'}</span>
          </div>
          ${r.tags && r.tags.length ? `<div class="review-tags">${r.tags.map((t) => `<span>${t}</span>`).join('')}</div>` : ''}
          ${r.comment ? `<p class="review-comment">${escapeHtml(r.comment)}</p>` : ''}
          <p class="review-meta">${escapeHtml(r.author || 'Anonymous')} · ${r.when || 'recently'}</p>
        </article>`
        )
        .join('');
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function loadRemoteReviews(shipId) {
    fetch(`/api/reviews?ship=${encodeURIComponent(shipId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        state.remoteReviews[shipId] = Array.isArray(data) ? data : [];
        if (state.selectedShipId === shipId) {
          renderShipView();
          renderShipGrid();
        }
      })
      .catch(() => {
        // API/D1 not live yet — local + example reviews still work fine.
      });
  }

  // --- Review form -------------------------------------------------------
  function renderTagPick() {
    els.tagPick.innerHTML = TAGS.map((tag) => `<button type="button" class="chip" data-tag="${tag}" aria-pressed="false">${tag}</button>`).join('');
    els.tagPick.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const tag = chip.dataset.tag;
        if (state.selectedTags.has(tag)) {
          state.selectedTags.delete(tag);
          chip.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedTags.add(tag);
          chip.setAttribute('aria-pressed', 'true');
        }
      });
    });
  }

  els.reviewForm.querySelectorAll('.rating-pick .rate-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedRating = btn.dataset.vote;
      els.reviewForm.querySelectorAll('.rating-pick .rate-btn').forEach((b) => b.classList.toggle('is-selected', b === btn));
      updateSubmitState();
    });
  });

  els.reviewCabin.addEventListener('input', updateSubmitState);

  function updateSubmitState() {
    els.reviewSubmit.disabled = !(els.reviewCabin.value.trim() && state.selectedRating);
  }

  function resetForm() {
    els.reviewForm.reset();
    state.selectedRating = null;
    state.selectedTags = new Set();
    els.reviewForm.querySelectorAll('.rating-pick .rate-btn').forEach((b) => b.classList.remove('is-selected'));
    renderTagPick();
    updateSubmitState();
    els.reviewStatus.textContent = '';
    els.reviewStatus.className = 'form-note';
  }

  els.reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const shipId = state.selectedShipId;
    const review = {
      id: `local-${Date.now()}`,
      shipId,
      cabin: els.reviewCabin.value.trim(),
      rating: state.selectedRating,
      tags: Array.from(state.selectedTags),
      comment: els.reviewComment.value.trim(),
      author: els.reviewAuthor.value.trim() || 'Anonymous',
      when: 'Just now',
    };

    state.localReviews.unshift(review);
    saveLocalReviews();
    renderShipView();
    renderShipGrid();
    resetForm();
    els.reviewStatus.textContent = 'Saved on this device — thank you!';
    els.reviewStatus.className = 'form-note is-success';

    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(review),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .catch(() => {
        // No live backend yet — the local copy above still shows immediately.
      });
  });

  // --- Init ------------------------------------------------------------------
  renderLineFilters();
  renderShipGrid();
  renderTagPick();
})();
