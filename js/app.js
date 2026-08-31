(function () {
  const state = {
    view: 'home',
    query: '',
    activeLine: null, // null = all lines; otherwise a single line id
    currentGuideLine: null, // which line's detail page is currently shown
    quizIndex: 0,
    quizScores: { interior: 0, oceanview: 0, balcony: 0, suite: 0 },
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
    shipShare: document.getElementById('ship-share'),
    footerShare: document.getElementById('footer-share'),
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
    topbarShare: document.getElementById('topbar-share'),
    guideView: document.getElementById('guide-view'),
    guideLink: document.getElementById('guide-link'),
    guideBack: document.getElementById('guide-back'),
    guideBrowseBtn: document.getElementById('guide-browse-btn'),
    landingView: document.getElementById('landing-view'),
    browseLink: document.getElementById('browse-link'),
    landingBrowseBtn: document.getElementById('landing-browse-btn'),
    landingGuideLink: document.getElementById('landing-guide-link'),
    landingGuideBtn: document.getElementById('landing-guide-btn'),
    landingDrinksLink: document.getElementById('landing-drinks-link'),
    landingRecentReviews: document.getElementById('landing-recent-reviews'),
    landingStats: document.getElementById('landing-stats'),
    deckplanForm: document.getElementById('deckplan-form'),
    deckplanInput: document.getElementById('deckplan-input'),
    deckplanSuggestions: document.getElementById('deckplan-suggestions'),
    deckplanNote: document.getElementById('deckplan-note'),
    hero: document.getElementById('hero'),
    lineGuideView: document.getElementById('line-guide-view'),
    lineGuideBack: document.getElementById('line-guide-back'),
    lineGuideTitle: document.getElementById('line-guide-title'),
    lineGuideIntro: document.getElementById('line-guide-intro'),
    lineGuideAboutTitle: document.getElementById('line-guide-about-title'),
    lineGuideAbout: document.getElementById('line-guide-about'),
    lineGuideGradesTitle: document.getElementById('line-guide-grades-title'),
    lineGuideGrades: document.getElementById('line-guide-grades'),
    lineGuideCtaSub: document.getElementById('line-guide-cta-sub'),
    lineGuideBrowseBtn: document.getElementById('line-guide-browse-btn'),
    lineGuideGrid: document.getElementById('line-guide-grid'),
    drinksLink: document.getElementById('drinks-link'),
    drinksView: document.getElementById('drinks-view'),
    drinksGrid: document.getElementById('drinks-grid'),
    wifiLink: document.getElementById('wifi-link'),
    wifiView: document.getElementById('wifi-view'),
    wifiGrid: document.getElementById('wifi-grid'),
    landingWifiLink: document.getElementById('landing-wifi-link'),
    gratuitiesLink: document.getElementById('gratuities-link'),
    gratuitiesView: document.getElementById('gratuities-view'),
    gratuitiesGrid: document.getElementById('gratuities-grid'),
    landingGratuitiesLink: document.getElementById('landing-gratuities-link'),
    promotionsLink: document.getElementById('promotions-link'),
    promotionsView: document.getElementById('promotions-view'),
    promotionsGrid: document.getElementById('promotions-grid'),
    promotionsAsOf: document.getElementById('promotions-asof'),
    landingPromotionsLink: document.getElementById('landing-promotions-link'),
    quizPromoLink: document.getElementById('quiz-promo-link'),
    quizView: document.getElementById('quiz-view'),
    quizBack: document.getElementById('quiz-back'),
    quizProgress: document.getElementById('quiz-progress'),
    quizQuestionWrap: document.getElementById('quiz-question-wrap'),
    quizResultWrap: document.getElementById('quiz-result-wrap'),
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

  // --- Routing & SEO metadata --------------------------------------------
  let isRoutingFromUrl = false;

  function setUrl(params) {
    if (isRoutingFromUrl) return;
    const url = buildShareUrl(params);
    if (url !== window.location.href) {
      history.pushState({}, '', url);
    }
  }

  function updateMeta({ title, description }) {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) metaDesc.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', window.location.href);
  }

  // --- Ship view -------------------------------------------------------------
  function hideAllViews() {
    els.landingView.hidden = true;
    els.homeView.hidden = true;
    els.shipView.hidden = true;
    els.guideView.hidden = true;
    els.lineGuideView.hidden = true;
    els.drinksView.hidden = true;
    els.wifiView.hidden = true;
    els.gratuitiesView.hidden = true;
    els.promotionsView.hidden = true;
    els.quizView.hidden = true;
    els.topbarShare.hidden = true;
  }

  function showShip(shipId) {
    state.selectedShipId = shipId;
    state.selectedRating = null;
    state.selectedTags = new Set();
    hideAllViews();
    els.shipView.hidden = false;
    els.hero.hidden = false;
    els.hero.classList.add('is-compact');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    renderShipView();
    loadRemoteReviews(shipId);
    resetForm();

    setUrl({ ship: shipId });
    const ship = shipById(shipId);
    updateMeta({
      title: ship ? `${ship.name} Cabin Reviews | Pick My Cabin` : 'Pick My Cabin',
      description: ship
        ? `Real cabin reviews for ${ship.name} — ratings, tags and photos from travellers and agents who've actually stayed there.`
        : undefined,
    });
  }

  function goHome({ reset } = {}) {
    hideAllViews();
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
    setUrl({ browse: 1 });
    updateMeta({
      title: 'Browse Cruise Cabin Reviews — Every Ship, Every Line | Pick My Cabin',
      description: 'Search cabin reviews for over 160 ships across every major cruise line — ratings, tags and photos from real travellers and agents.',
    });
  }

  function goHomeFilteredToLine(lineId) {
    state.activeLine = lineId;
    state.query = '';
    els.search.value = '';
    goHome();
    renderLineFilters();
    renderShipGrid();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function showGuide() {
    hideAllViews();
    els.guideView.hidden = false;
    els.hero.hidden = false;
    els.hero.classList.add('is-compact');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setUrl({ guide: 1 });
    updateMeta({
      title: 'Cabin Guide: Interior, Oceanview, Balcony & Suite Explained | Pick My Cabin',
      description: "Learn the difference between Interior, Oceanview, Balcony and Suite cabins, plus the premium enclaves each cruise line doesn't advertise.",
    });
  }

  function showLineGuide(lineId) {
    const guide = LINE_GUIDES[lineId];
    if (!guide) return;
    const line = lineById(lineId);
    const lineName = line ? line.name : lineId;

    els.lineGuideTitle.textContent = `${lineName}, explained`;
    els.lineGuideIntro.textContent = `New to ${lineName}? Here's what makes it different from a typical cruise line, and exactly what each cabin grade actually gets you.`;
    els.lineGuideAboutTitle.textContent = `New to ${lineName}?`;
    els.lineGuideAbout.innerHTML = guide.about.map((p) => `<p class="guide-section-sub">${p}</p>`).join('');
    els.lineGuideGradesTitle.textContent = `Every ${lineName} cabin grade`;
    els.lineGuideGrades.innerHTML = guide.grades
      .map(
        (g) => `
      <article class="grade-card">
        <div class="grade-card-head">
          <h3>${g.name}</h3>
          <span class="grade-tier">${g.tier}</span>
        </div>
        <p class="grade-price">${g.price}</p>
        <p class="grade-summary">${g.summary}</p>
        <p class="grade-includes"><strong>Included:</strong> ${g.includes}</p>
      </article>`
      )
      .join('');
    els.lineGuideCtaSub.textContent = `Browse traveller reviews across the whole ${lineName} fleet.`;
    els.lineGuideBrowseBtn.textContent = `Browse ${lineName} reviews`;

    state.currentGuideLine = lineId;

    hideAllViews();
    els.lineGuideView.hidden = false;
    els.hero.hidden = false;
    els.hero.classList.add('is-compact');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    setUrl({ line: lineId });
    updateMeta({
      title: `${lineName} Cabin Guide — Every Grade Explained | Pick My Cabin`,
      description: `A grade-by-grade breakdown of every ${lineName} cabin type, from the most affordable to the top suite.`,
    });
  }

  function renderLineGuideGrid() {
    els.lineGuideGrid.innerHTML = LINES.filter((line) => LINE_GUIDES[line.id])
      .map((line) => `<button type="button" class="line-guide-btn" data-line="${line.id}">${line.name}</button>`)
      .join('');
    els.lineGuideGrid.querySelectorAll('.line-guide-btn').forEach((btn) => {
      btn.addEventListener('click', () => showLineGuide(btn.dataset.line));
    });
  }

  // --- Cabin quiz -------------------------------------------------------
  function showQuiz() {
    state.quizIndex = 0;
    state.quizScores = { interior: 0, oceanview: 0, balcony: 0, suite: 0 };
    els.quizResultWrap.hidden = true;
    els.quizQuestionWrap.hidden = false;
    hideAllViews();
    els.quizView.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    renderQuizQuestion();
    setUrl({ quiz: 1 });
    updateMeta({
      title: 'Find Your Cabin Type Quiz | Pick My Cabin',
      description: 'Answer four quick questions to find out whether Interior, Oceanview, Balcony or Suite fits how you actually cruise.',
    });
  }

  function renderQuizQuestion() {
    const total = CABIN_QUIZ.questions.length;
    const q = CABIN_QUIZ.questions[state.quizIndex];

    els.quizProgress.textContent = `Question ${state.quizIndex + 1} of ${total}`;
    els.quizQuestionWrap.innerHTML = `
      <h2 class="quiz-question-text">${q.text}</h2>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button type="button" class="quiz-option-btn" data-index="${i}">${opt.label}</button>`).join('')}
      </div>
    `;
    els.quizQuestionWrap.querySelectorAll('.quiz-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => selectQuizAnswer(q.options[Number(btn.dataset.index)].scores));
    });
  }

  function selectQuizAnswer(scores) {
    Object.entries(scores).forEach(([type, points]) => {
      state.quizScores[type] += points;
    });
    state.quizIndex += 1;
    if (state.quizIndex < CABIN_QUIZ.questions.length) {
      renderQuizQuestion();
    } else {
      renderQuizResult();
    }
  }

  function renderQuizResult() {
    const order = ['suite', 'balcony', 'oceanview', 'interior']; // tie-break toward the higher tier
    const winner = order.reduce((best, type) =>
      state.quizScores[type] > state.quizScores[best] ? type : best
    , order[order.length - 1]);
    const result = CABIN_QUIZ.results[winner];

    els.quizProgress.textContent = 'Your match';
    els.quizQuestionWrap.hidden = true;
    els.quizResultWrap.hidden = false;
    els.quizResultWrap.innerHTML = `
      <article class="cabin-type-card quiz-result-card">
        <h3>${result.name}</h3>
        <p class="cabin-type-price">${result.price}</p>
        <p>${result.summary}</p>
        <p class="cabin-type-size">${result.size}</p>
      </article>
      <div class="quiz-result-actions">
        <button class="cta-btn" id="quiz-browse-btn">Browse reviews</button>
        <button type="button" class="text-btn" id="quiz-guide-btn">See the full Cabin Guide →</button>
        <button type="button" class="text-btn" id="quiz-retake-btn">Retake the quiz</button>
      </div>
      <div class="share-icons">${shareIconsHtml(
        buildShareUrl({ quiz: 1 }),
        `My cabin type is ${result.name}, according to Pick My Cabin's quiz — what's yours?`
      )}</div>
    `;
    document.getElementById('quiz-browse-btn').addEventListener('click', () => goHome({ reset: true }));
    document.getElementById('quiz-guide-btn').addEventListener('click', () => showGuide());
    document.getElementById('quiz-retake-btn').addEventListener('click', () => showQuiz());
  }

  els.quizPromoLink.addEventListener('click', (e) => {
    e.preventDefault();
    showQuiz();
  });

  els.quizBack.addEventListener('click', () => showLanding());

  function showLanding() {
    hideAllViews();
    els.landingView.hidden = false;
    els.topbarShare.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    renderLandingStats();
    setUrl({});
    updateMeta({
      title: 'Pick My Cabin — Real Cabin Reviews From Cruise Travellers',
      description: 'Search any cruise ship and cabin number to see honest traveller-reported ratings, or add your own — across every major cruise line.',
    });
  }

  function renderLandingStats() {
    const shipCount = allShips().length;
    els.landingStats.textContent = `${LINES.length} cruise lines · ${shipCount.toLocaleString()} ships tracked`;
  }

  // --- Package comparison grids (drinks, WiFi) ------------------------------
  function renderPackageGrid(gridEl, packages) {
    gridEl.innerHTML = LINES.filter((line) => packages[line.id])
      .map((line) => {
        const d = packages[line.id];
        if (d.included) {
          return `
            <article class="drinks-card drinks-card-included">
              <p class="drinks-card-line">${line.name}</p>
              <p class="drinks-card-included-badge">Included in fare</p>
              <p class="drinks-card-note">${d.note}</p>
            </article>
          `;
        }
        if (d.noPackage) {
          return `
            <article class="drinks-card drinks-card-included drinks-card-nopackage">
              <p class="drinks-card-line">${line.name}</p>
              <p class="drinks-card-included-badge drinks-card-nopackage-badge">${d.noPackageLabel || 'No package sold'}</p>
              <p class="drinks-card-note">${d.note}</p>
            </article>
          `;
        }
        return `
          <article class="drinks-card">
            <p class="drinks-card-line">${line.name}</p>
            ${d.tiers
              .map(
                (t) => `
              <div class="drinks-tier">
                <div class="drinks-tier-head">
                  <span class="drinks-tier-name">${t.name}</span>
                  <span class="drinks-tier-price">${t.price}</span>
                </div>
                ${t.includes ? `<p class="drinks-tier-includes">${t.includes}</p>` : ''}
              </div>
            `
              )
              .join('')}
            <p class="drinks-card-note">${d.note}</p>
          </article>
        `;
      })
      .join('');
  }

  // --- Drinks packages -----------------------------------------------------
  function showDrinks() {
    hideAllViews();
    els.drinksView.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setUrl({ drinks: 1 });
    updateMeta({
      title: 'Cruise Drinks Packages Compared — Every Major Line | Pick My Cabin',
      description: 'Compare drinks package prices, inclusions and gratuity rules across Royal Caribbean, Celebrity, Princess, MSC and more.',
    });
  }

  function renderDrinksGrid() {
    renderPackageGrid(els.drinksGrid, DRINKS_PACKAGES);
  }

  // --- WiFi plans ------------------------------------------------------------
  function showWifi() {
    hideAllViews();
    els.wifiView.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setUrl({ wifi: 1 });
    updateMeta({
      title: 'Cruise WiFi Plans Compared — Every Major Line | Pick My Cabin',
      description: 'Compare internet package prices and inclusions across every major cruise line, from basic browsing to streaming.',
    });
  }

  function renderWifiGrid() {
    renderPackageGrid(els.wifiGrid, WIFI_PLANS);
  }

  // --- Gratuities --------------------------------------------------------
  function showGratuities() {
    hideAllViews();
    els.gratuitiesView.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setUrl({ gratuities: 1 });
    updateMeta({
      title: 'Cruise Gratuities Compared — Every Major Line | Pick My Cabin',
      description: 'Compare the automatic daily gratuity or service charge for every major cruise line, by cabin category.',
    });
  }

  function renderGratuitiesGrid() {
    renderPackageGrid(els.gratuitiesGrid, GRATUITIES);
  }

  // --- Promotions ----------------------------------------------------------
  function showPromotions() {
    hideAllViews();
    els.promotionsView.hidden = false;
    els.hero.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setUrl({ promotions: 1 });
    updateMeta({
      title: 'Current Cruise Line Promotions Compared | Pick My Cabin',
      description: `A snapshot of each major cruise line's flagship current offer, as of ${PROMOTIONS.asOfDate}.`,
    });
  }

  function renderPromotionsGrid() {
    els.promotionsAsOf.textContent = `as of ${PROMOTIONS.asOfDate}`;
    els.promotionsGrid.innerHTML = LINES.filter((line) => PROMOTIONS.lines[line.id])
      .map((line) => {
        const p = PROMOTIONS.lines[line.id];
        if (p.notFound) {
          return `
            <article class="drinks-card promo-card">
              <p class="drinks-card-line">${line.name}</p>
              <p class="promo-notfound">No current flagship promotion we could confidently confirm.</p>
              ${p.checkUrl ? `<a href="${p.checkUrl}" target="_blank" rel="noopener noreferrer" class="promo-source-link">Check current offers →</a>` : ''}
            </article>
          `;
        }
        return `
          <article class="drinks-card promo-card">
            <p class="drinks-card-line">${line.name}</p>
            <p class="promo-name">${p.name}</p>
            <p class="drinks-card-note">${p.includes}</p>
            <p class="promo-window">${p.window}</p>
            ${p.restrictions ? `<p class="promo-restrictions">${p.restrictions}</p>` : ''}
            <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="promo-source-link">See official offer →</a>
          </article>
        `;
      })
      .join('');
  }

  // --- Deck plan search --------------------------------------------------
  function deckPlanUrl(ship) {
    const slug = ship.name.trim().replace(/\s+/g, '-');
    return `https://cruisedeckplans.com/ships/deckbydeck.php?ship=${encodeURIComponent(slug)}&deck=5`;
  }

  function matchingShipsFor(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allShips()
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 6);
  }

  function exactShipMatch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return allShips().find((s) => s.name.toLowerCase() === q) || null;
  }

  function hideDeckplanSuggestions() {
    els.deckplanSuggestions.hidden = true;
    els.deckplanSuggestions.innerHTML = '';
  }

  function goToDeckPlan(ship) {
    els.deckplanInput.value = ship.name;
    hideDeckplanSuggestions();
    els.deckplanNote.hidden = true;
    window.open(deckPlanUrl(ship), '_blank', 'noopener');
  }

  els.deckplanInput.addEventListener('input', () => {
    els.deckplanNote.hidden = true;
    const matches = matchingShipsFor(els.deckplanInput.value);
    if (matches.length === 0) {
      hideDeckplanSuggestions();
      return;
    }
    els.deckplanSuggestions.innerHTML = matches
      .map((s, i) => {
        const line = lineById(s.lineId);
        return `<button type="button" class="deckplan-suggestion" data-index="${i}">${escapeHtml(s.name)}${
          line ? `<span class="line-name">${escapeHtml(line.name)}</span>` : ''
        }</button>`;
      })
      .join('');
    els.deckplanSuggestions.hidden = false;
    els.deckplanSuggestions.querySelectorAll('.deckplan-suggestion').forEach((btn) => {
      btn.addEventListener('click', () => goToDeckPlan(matches[Number(btn.dataset.index)]));
    });
  });

  document.addEventListener('click', (e) => {
    if (!els.deckplanForm.contains(e.target)) hideDeckplanSuggestions();
  });

  els.deckplanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = els.deckplanInput.value;
    const exact = exactShipMatch(query);
    if (exact) {
      goToDeckPlan(exact);
      return;
    }
    const matches = matchingShipsFor(query);
    if (matches.length === 1) {
      goToDeckPlan(matches[0]);
      return;
    }
    els.deckplanNote.textContent = matches.length > 1
      ? 'Multiple ships match — pick one from the list.'
      : "We don't recognise that ship — pick one from the list.";
    els.deckplanNote.hidden = false;
  });

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

  els.landingDrinksLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDrinks();
  });

  els.landingWifiLink.addEventListener('click', (e) => {
    e.preventDefault();
    showWifi();
  });

  els.landingGratuitiesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showGratuities();
  });

  els.landingPromotionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPromotions();
  });

  els.drinksLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDrinks();
  });

  els.wifiLink.addEventListener('click', (e) => {
    e.preventDefault();
    showWifi();
  });

  els.gratuitiesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showGratuities();
  });

  els.promotionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPromotions();
  });

  els.guideBack.addEventListener('click', () => goHome());
  els.guideBrowseBtn.addEventListener('click', () => goHome({ reset: true }));

  document.querySelectorAll('.enclave-more[data-line]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showLineGuide(link.dataset.line);
    });
  });

  els.lineGuideBack.addEventListener('click', () => showGuide());
  els.lineGuideBrowseBtn.addEventListener('click', () => goHomeFilteredToLine(state.currentGuideLine));

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

    els.shipShare.innerHTML = shareIconsHtml(
      buildShareUrl({ ship: ship.id }),
      `Check out real cabin reviews for ${ship.name} on Pick My Cabin`
    );
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Share icons -------------------------------------------------------
  const SHARE_ICON_FACEBOOK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/></svg>';
  const SHARE_ICON_X = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.6 8.68L23 22h-6.9l-5.4-6.6L4.5 22H1.4l8.1-9.26L1 2h7l4.9 6.02L18.9 2Zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20Z"/></svg>';
  const SHARE_ICON_WHATSAPP = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.02 2C6.5 2 2.03 6.46 2.03 12c0 1.9.53 3.66 1.44 5.17L2 22l4.98-1.44A9.9 9.9 0 0 0 12.02 22C17.55 22 22 17.54 22 12S17.55 2 12.02 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-2.96.86.85-2.87-.19-.3A7.96 7.96 0 1 1 12.02 20Zm4.4-5.94c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28Z"/></svg>';
  const SHARE_ICON_INSTAGRAM = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>';
  const SHARE_ICON_LINK = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 15 15 9"/><path d="M7 13.5 5.6 14.9a3.5 3.5 0 0 0 4.95 4.95l2.1-2.1"/><path d="M17 10.5l1.4-1.4a3.5 3.5 0 0 0-4.95-4.95l-2.1 2.1"/></svg>';

  function buildShareUrl(params) {
    const url = new URL(window.location.origin + window.location.pathname);
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.set(key, value);
    });
    return url.toString();
  }

  function shareIconsHtml(url, text, copyMsg) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    return `
      <span class="share-label">Share</span>
      <a class="share-icon share-icon-fb" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">${SHARE_ICON_FACEBOOK}</a>
      <a class="share-icon share-icon-x" href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener noreferrer" aria-label="Share on X">${SHARE_ICON_X}</a>
      <a class="share-icon share-icon-wa" href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">${SHARE_ICON_WHATSAPP}</a>
      <button type="button" class="share-icon share-icon-ig" data-share-url="${escapeHtml(url)}" data-copy-msg="Link copied — paste it into your Instagram bio or story" aria-label="Copy link for Instagram">${SHARE_ICON_INSTAGRAM}</button>
      <button type="button" class="share-icon share-icon-link" data-share-url="${escapeHtml(url)}" data-copy-msg="${escapeHtml(copyMsg || 'Link copied!')}" aria-label="Copy link">${SHARE_ICON_LINK}</button>
      <span class="share-copied-msg" role="status"></span>
    `;
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.share-icons button.share-icon[data-share-url]');
    if (!btn) return;
    const container = btn.closest('.share-icons');
    const msgEl = container ? container.querySelector('.share-copied-msg') : null;
    const showMsg = (text) => {
      if (!msgEl) return;
      msgEl.textContent = text;
      msgEl.classList.add('is-visible');
      clearTimeout(msgEl._hideTimer);
      msgEl._hideTimer = setTimeout(() => msgEl.classList.remove('is-visible'), 2600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(btn.dataset.shareUrl)
        .then(() => showMsg(btn.dataset.copyMsg))
        .catch(() => showMsg('Could not copy — copy the link from your address bar'));
    } else {
      showMsg('Could not copy — copy the link from your address bar');
    }
  });

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
  renderLineGuideGrid();
  renderDrinksGrid();
  renderWifiGrid();
  renderGratuitiesGrid();
  renderPromotionsGrid();
  loadGlobalRecent();
  loadVisitorCount();

  const homeShareText = "Pick My Cabin — real cruise cabin reviews from people who've actually stayed there";
  els.footerShare.innerHTML = shareIconsHtml(buildShareUrl({}), homeShareText);
  els.topbarShare.innerHTML = shareIconsHtml(buildShareUrl({}), homeShareText);

  function route() {
    const params = new URLSearchParams(window.location.search);
    isRoutingFromUrl = true;
    try {
      const shipParam = params.get('ship');
      const lineParam = params.get('line');
      if (shipParam && shipById(shipParam)) {
        showShip(shipParam);
      } else if (params.has('quiz')) {
        showQuiz();
      } else if (params.has('guide')) {
        showGuide();
      } else if (lineParam && LINE_GUIDES[lineParam]) {
        showLineGuide(lineParam);
      } else if (params.has('drinks')) {
        showDrinks();
      } else if (params.has('wifi')) {
        showWifi();
      } else if (params.has('gratuities')) {
        showGratuities();
      } else if (params.has('promotions')) {
        showPromotions();
      } else if (params.has('browse')) {
        goHome();
      } else {
        showLanding();
      }
    } finally {
      isRoutingFromUrl = false;
    }
  }

  window.addEventListener('popstate', route);
  route();
})();
