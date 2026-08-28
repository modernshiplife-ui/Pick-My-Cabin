(function () {
  const state = {
    view: 'home',
    query: '',
    activeLine: null, // null = all lines; otherwise a single line id
    selectedShipId: null,
    selectedRating: null,
    selectedTags: new Set(),
    selectedPhotos: [], // { file, previewUrl }
    remoteReviews: {}, // shipId -> array, fetched from the API when available
    globalRecent: null, // recent reviews across all ships, fetched from the API when available
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
    recentReviews: document.getElementById('recent-reviews'),
    reviewPhotos: document.getElementById('review-photos'),
    photoPreviews: document.getElementById('photo-previews'),
    photoAddBtn: document.getElementById('photo-add-btn'),
    visitorCount: document.getElementById('visitor-count'),
    guideView: document.getElementById('guide-view'),
    guideLink: document.getElementById('guide-link'),
    guideBack: document.getElementById('guide-back'),
    guideBrowseBtn: document.getElementById('guide-browse-btn'),
    landingView: document.getElementById('landing-view'),
    browseLink: document.getElementById('browse-link'),
    landingBrowseBtn: document.getElementById('landing-browse-btn'),
    landingGuideLink: document.getElementById('landing-guide-link'),
    landingGuideBtn: document.getElementById('landing-guide-btn'),
    landingRecentReviews: document.getElementById('landing-recent-reviews'),
    landingStats: document.getElementById('landing-stats'),
    hero: document.getElementById('hero'),
  };

  const MAX_PHOTOS = 4;

  function saveLocalReviews() {
    localStorage.setItem('pmc-reviews', JSON.stringify(state.localReviews));
  }

  function saveAddedShips() {
    localStorage.setItem('pmc-added-ships', JSON.stringify(state.addedShips));
  }

  function reviewsForShip(shipId) {
    const local = state.localReviews.filter((r) => r.shipId === shipId);
    const remote = state.remoteReviews[shipId] || [];
    return [...remote, ...local];
  }

  function reviewTimestamp(r) {
    if (r.ts) return r.ts;
    const parsed = Date.parse(r.when);
    return isNaN(parsed) ? 0 : parsed;
  }

  function recentReviews(limit) {
    if (state.globalRecent) return state.globalRecent.slice(0, limit);
    const combined = [...state.localReviews];
    combined.sort((a, b) => reviewTimestamp(b) - reviewTimestamp(a));
    return combined.slice(0, limit);
  }

  function reviewCardHtml(r, { showShipName } = {}) {
    const ship = showShipName ? shipById(r.shipId) : null;
    return `
      <article class="review-card${showShipName ? ' is-clickable' : ''}"${showShipName ? ` data-ship="${r.shipId}"` : ''}>
        <div class="review-card-head">
          <span class="review-cabin">${ship ? `${ship.name} · ` : ''}Cabin ${r.cabin}</span>
          <span class="review-rating">${r.rating === 'up' ? '👍' : '👎'}</span>
        </div>
        ${r.tags && r.tags.length ? `<div class="review-tags">${r.tags.map((t) => `<span>${t}</span>`).join('')}</div>` : ''}
        ${r.comment ? `<p class="review-comment">${escapeHtml(r.comment)}</p>` : ''}
        ${r.photos && r.photos.length ? `<div class="review-photos">${r.photos.map((key) => `<a href="/photos/${encodeURIComponent(key)}" target="_blank" rel="noopener"><img src="/photos/${encodeURIComponent(key)}" alt="Cabin photo" loading="lazy" /></a>`).join('')}</div>` : ''}
        <p class="review-meta">${escapeHtml(r.author || 'Anonymous')} · ${r.when || 'recently'}</p>
      </article>`;
  }

  function renderRecentReviews() {
    const reviews = recentReviews(6);
    const containers = [els.recentReviews, els.landingRecentReviews].filter(Boolean);

    containers.forEach((container) => {
      if (reviews.length === 0) {
        container.innerHTML = '<p class="empty-note">No reviews yet — be the first to add one.</p>';
        return;
      }

      const [first, ...rest] = reviews;
      let html = reviewCardHtml(first, { showShipName: true });
      if (rest.length > 0) {
        html += `<button type="button" class="text-btn recent-toggle">Show ${rest.length} more recent review${rest.length === 1 ? '' : 's'}</button>`;
        html += `<div class="recent-more" hidden>${rest.map((r) => reviewCardHtml(r, { showShipName: true })).join('')}</div>`;
      }
      container.innerHTML = html;

      container.querySelectorAll('.review-card[data-ship]').forEach((card) => {
        card.addEventListener('click', () => showShip(card.dataset.ship));
      });

      const toggle = container.querySelector('.recent-toggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          const more = container.querySelector('.recent-more');
          const expanded = !more.hidden;
          more.hidden = expanded;
          toggle.textContent = expanded
            ? `Show ${rest.length} more recent review${rest.length === 1 ? '' : 's'}`
            : 'Show fewer';
        });
      }
    });
  }

  function loadGlobalRecent() {
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        state.globalRecent = Array.isArray(data) ? data : [];
        renderRecentReviews();
      })
      .catch(() => {
        // No live backend yet — local reviews still populate this.
      });
  }

  // --- Visitor count ---------------------------------------------------
  function showVisitorCount(count) {
    els.visitorCount.textContent = `${count.toLocaleString()} visitors`;
    els.visitorCount.hidden = false;
  }

  function loadVisitorCount() {
    const alreadyCounted = localStorage.getItem('pmc-counted');
    const request = alreadyCounted
      ? fetch('/api/visits')
      : fetch('/api/visits', { method: 'POST' });

    request
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!alreadyCounted) localStorage.setItem('pmc-counted', '1');
        showVisitorCount(data.count);
      })
      .catch(() => {
        // No live backend yet — just leave the counter hidden.
      });
  }

  // --- Home: search + browse ------------------------------------------------
  function scrollToShipGrid() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    els.shipGrid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function renderLineFilters() {
    els.lineFilters.innerHTML = '';

    const allChip = document.createElement('button');
    allChip.className = 'chip';
    allChip.textContent = 'All lines';
    allChip.setAttribute('aria-pressed', String(state.activeLine === null));
    allChip.addEventListener('click', () => {
      state.activeLine = null;
      renderLineFilters();
      renderShipGrid();
      scrollToShipGrid();
    });
    els.lineFilters.appendChild(allChip);

    LINES.forEach((line) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.line = line.id;
      chip.setAttribute('aria-pressed', String(state.activeLine === line.id));
      chip.textContent = line.name;
      chip.addEventListener('click', () => {
        state.activeLine = line.id;
        renderLineFilters();
        renderShipGrid();
        scrollToShipGrid();
      });
      els.lineFilters.appendChild(chip);
    });
  }

  function renderShipGrid() {
    const q = state.query.trim().toLowerCase();
    const matches = allShips().filter((ship) => {
      if (state.activeLine && ship.lineId !== state.activeLine) return false;
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
    els.landingView.hidden = true;
    els.homeView.hidden = true;
    els.guideView.hidden = true;
    els.shipView.hidden = false;
    els.hero.hidden = false;
    els.hero.classList.add('is-compact');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    renderShipView();
    loadRemoteReviews(shipId);
    resetForm();
  }

  function goHome({ reset } = {}) {
    els.landingView.hidden = true;
    els.shipView.hidden = true;
    els.guideView.hidden = true;
    els.homeView.hidden = false;
    els.hero.hidden = false;
    els.hero.classList.remove('is-compact');
    state.selectedShipId = null;
    if (reset) {
      state.query = '';
      els.search.value = '';
      state.activeLine = null;
      renderLineFilters();
      renderShipGrid();
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  function showGuide() {
    els.landingView.hidden = true;
    els.homeView.hidden = true;
    els.shipView.hidden = true;
    els.guideView.hidden = false;
    els.hero.hidden = false;
    els.hero.classList.add('is-compact');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function showLanding() {
    els.homeView.hidden = true;
    els.shipView.hidden = true;
    els.guideView.hidden = true;
    els.landingView.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    renderLandingStats();
  }

  function renderLandingStats() {
    const shipCount = allShips().length;
    els.landingStats.textContent = `${LINES.length} cruise lines · ${shipCount.toLocaleString()} ships tracked`;
  }

  els.backToHome.addEventListener('click', () => goHome());

  document.getElementById('brand-home-link').addEventListener('click', (e) => {
    e.preventDefault();
    showLanding();
  });

  els.browseLink.addEventListener('click', (e) => {
    e.preventDefault();
    goHome({ reset: true });
  });

  els.landingBrowseBtn.addEventListener('click', () => goHome({ reset: true }));

  [els.guideLink, els.landingGuideLink].forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showGuide();
    });
  });

  els.landingGuideBtn.addEventListener('click', () => showGuide());

  els.guideBack.addEventListener('click', () => goHome());
  els.guideBrowseBtn.addEventListener('click', () => goHome({ reset: true }));

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
      els.reviewsList.innerHTML = reviews.map((r) => reviewCardHtml(r)).join('');
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

  // --- Photos ----------------------------------------------------------
  function renderPhotoPreviews() {
    els.photoPreviews.innerHTML = state.selectedPhotos
      .map(
        (p, i) => `
        <div class="photo-preview">
          <img src="${p.previewUrl}" alt="" />
          <button type="button" class="photo-remove" data-index="${i}" aria-label="Remove photo">&times;</button>
        </div>`
      )
      .join('');
    els.photoPreviews.querySelectorAll('.photo-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.index);
        URL.revokeObjectURL(state.selectedPhotos[i].previewUrl);
        state.selectedPhotos.splice(i, 1);
        renderPhotoPreviews();
      });
    });
    els.photoAddBtn.hidden = state.selectedPhotos.length >= MAX_PHOTOS;
  }

  els.reviewPhotos.addEventListener('change', () => {
    const files = Array.from(els.reviewPhotos.files || []);
    const room = MAX_PHOTOS - state.selectedPhotos.length;
    files.slice(0, room).forEach((file) => {
      state.selectedPhotos.push({ file, previewUrl: URL.createObjectURL(file) });
    });
    els.reviewPhotos.value = '';
    renderPhotoPreviews();
  });

  function uploadPhoto({ file }) {
    return fetch('/api/photos', { method: 'POST', headers: { 'content-type': file.type }, body: file })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => data.key);
  }

  function resetForm() {
    els.reviewForm.reset();
    state.selectedRating = null;
    state.selectedTags = new Set();
    state.selectedPhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    state.selectedPhotos = [];
    els.reviewForm.querySelectorAll('.rating-pick .rate-btn').forEach((b) => b.classList.remove('is-selected'));
    renderTagPick();
    renderPhotoPreviews();
    updateSubmitState();
    els.reviewStatus.textContent = '';
    els.reviewStatus.className = 'form-note';
  }

  els.reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const shipId = state.selectedShipId;
    const hasPhotos = state.selectedPhotos.length > 0;

    els.reviewSubmit.disabled = true;
    els.reviewStatus.textContent = hasPhotos ? 'Uploading photos…' : 'Saving…';
    els.reviewStatus.className = 'form-note';

    let photoKeys = [];
    let photoUploadFailed = false;
    if (hasPhotos) {
      try {
        photoKeys = await Promise.all(state.selectedPhotos.map(uploadPhoto));
      } catch {
        photoUploadFailed = true;
      }
    }

    const review = {
      id: `local-${Date.now()}`,
      shipId,
      cabin: els.reviewCabin.value.trim(),
      rating: state.selectedRating,
      tags: Array.from(state.selectedTags),
      comment: els.reviewComment.value.trim(),
      author: els.reviewAuthor.value.trim() || 'Anonymous',
      photos: photoKeys,
      when: 'Just now',
      ts: Date.now(),
    };

    state.localReviews.unshift(review);
    saveLocalReviews();
    renderShipView();
    renderShipGrid();
    renderRecentReviews();
    resetForm();
    els.reviewStatus.textContent = photoUploadFailed
      ? 'Saved — but photos couldn’t be uploaded right now.'
      : 'Saved — thank you!';
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
  renderRecentReviews();
  renderLandingStats();
  loadGlobalRecent();
  loadVisitorCount();
})();
