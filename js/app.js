(function () {
  // Top-down orientation: bow at the top of the canvas, stern at the bottom,
  // port column on the left, starboard on the right — like looking straight
  // down at the deck, not a side elevation.
  const PLAN = { colW: 132, gap: 96, yBow: 70, yStern: 900, viewW: 560 };
  const SORTERS = {
    cabin: (a, b) => a.id.localeCompare(b.id),
    deck: (a, b) => a.deck - b.deck || a.id.localeCompare(b.id),
    category: (a, b) => a.category.localeCompare(b.category),
    size: (a, b) => a.sqft - b.sqft,
  };

  const state = {
    shipId: SHIPS[0].id,
    deckIndex: 0,
    view: 'map',
    activeCabin: null,
    activeFilters: new Set(Object.keys(CATEGORIES)),
    quietOnly: false,
    sortKey: 'cabin',
    sortDir: 1,
    shortlist: JSON.parse(localStorage.getItem('pmc-shortlist') || '[]'),
  };

  const els = {
    shipSelect: document.getElementById('ship-select'),
    viewToggle: document.getElementById('view-toggle'),
    rungs: document.getElementById('deck-rungs'),
    plan: document.getElementById('deck-plan'),
    planView: document.getElementById('map-view'),
    listView: document.getElementById('list-view'),
    listBody: document.getElementById('list-body'),
    tooltip: document.getElementById('cabin-tooltip'),
    legend: document.getElementById('category-legend'),
    quietToggle: document.getElementById('quiet-toggle'),
    deckLabel: document.getElementById('active-deck-label'),
    deckSub: document.getElementById('active-deck-sub'),
    detail: document.getElementById('cabin-detail'),
    shortlistTray: document.getElementById('shortlist-tray'),
    shortlistCount: document.getElementById('shortlist-count'),
    copySummaryBtn: document.getElementById('copy-summary'),
  };

  function ship() {
    return SHIPS.find((s) => s.id === state.shipId);
  }

  function deck() {
    return ship().decks[state.deckIndex];
  }

  function saveShortlist() {
    localStorage.setItem('pmc-shortlist', JSON.stringify(state.shortlist));
  }

  function findCabin(shipId, cabinId) {
    const s = SHIPS.find((x) => x.id === shipId);
    if (!s) return null;
    for (const d of s.decks) {
      const found = d.cabins.find((c) => c.id === cabinId);
      if (found) return found;
    }
    return null;
  }

  // --- Ship + view controls -------------------------------------------------
  function renderShipSelect() {
    els.shipSelect.innerHTML = SHIPS.map((s) => `<option value="${s.id}">${s.name}</option>`).join('');
    els.shipSelect.value = state.shipId;
    els.shipSelect.addEventListener('change', () => {
      state.shipId = els.shipSelect.value;
      state.deckIndex = 0;
      state.activeCabin = null;
      renderRungs();
      renderCurrentView();
      renderDetail(null);
    });
  }

  function setView(view) {
    state.view = view;
    els.viewToggle.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    els.planView.hidden = view !== 'map';
    els.listView.hidden = view !== 'list';
    renderCurrentView();
  }

  els.viewToggle.querySelectorAll('button').forEach((b) => {
    b.addEventListener('click', () => setView(b.dataset.view));
  });

  function renderCurrentView() {
    if (state.view === 'map') renderPlan();
    else renderList();
  }

  // --- Deck rungs (cutaway elevation selector) -----------------------------
  function renderRungs() {
    const decks = ship().decks;
    els.rungs.innerHTML = '';
    decks.slice().reverse().forEach((d) => {
      const btn = document.createElement('button');
      btn.className = 'rung';
      btn.style.setProperty('--rung-width', `${92 - (d.index / (decks.length - 1)) * 40}%`);
      btn.dataset.deckIndex = d.index;
      btn.setAttribute('aria-pressed', d.index === state.deckIndex ? 'true' : 'false');
      btn.innerHTML = `<span class="rung-num">${d.number}</span>`;
      btn.setAttribute('aria-label', `Deck ${d.number}`);
      btn.addEventListener('click', () => setDeck(d.index));
      els.rungs.appendChild(btn);
    });
  }

  function setDeck(index) {
    state.deckIndex = index;
    state.activeCabin = null;
    renderRungs();
    renderCurrentView();
    renderDetail(null);
  }

  // --- Filters shared by map + list ------------------------------------------
  function categoryVisible(cat) {
    return state.activeFilters.has(cat);
  }

  function cabinDimmed(cabin) {
    if (!categoryVisible(cabin.category)) return true;
    if (state.quietOnly && cabin.quiet < 0.55) return true;
    return false;
  }

  // --- Map view (top-down) --------------------------------------------------
  function yForPos(pos) {
    // pos: 0 stern .. 1 bow. Bow renders near the top (small y).
    return PLAN.yStern - pos * (PLAN.yStern - PLAN.yBow);
  }

  function renderPlan() {
    const d = deck();
    els.deckLabel.textContent = `Deck ${d.number}`;
    els.deckSub.textContent = `${d.cabins.length} cabins · ${ship().name}`;

    const cabinsPerSide = d.cabins.length / 2;
    const cabinLen = ((PLAN.yStern - PLAN.yBow) / cabinsPerSide) * 0.82;
    const portX = 40;
    const starboardX = 40 + PLAN.colW + PLAN.gap;
    const hullLeft = portX - 24;
    const hullRight = starboardX + PLAN.colW + 24;
    const midX = (hullLeft + hullRight) / 2;
    const viewH = PLAN.yStern + 90;

    const parts = [];

    // Hull outline: pointed bow at top, rounded stern at bottom.
    parts.push(
      `<path class="hull" d="M ${hullLeft} ${PLAN.yBow + 140} L ${hullLeft} ${PLAN.yStern} A 90,40 0 0 0 ${hullRight} ${PLAN.yStern} L ${hullRight} ${PLAN.yBow + 140} Q ${hullRight} ${PLAN.yBow - 60} ${midX} ${PLAN.yBow - 60} Q ${hullLeft} ${PLAN.yBow - 60} ${hullLeft} ${PLAN.yBow + 140} Z" />`
    );
    parts.push(`<line class="corridor" x1="${midX}" y1="${PLAN.yBow - 20}" x2="${midX}" y2="${PLAN.yStern - 10}" />`);
    parts.push(`<text class="bow-label" x="${midX}" y="${PLAN.yBow - 66}">BOW — FORWARD</text>`);
    parts.push(`<text class="stern-label" x="${midX}" y="${PLAN.yStern + 46}">STERN — AFT</text>`);

    const midY = yForPos(0.5);
    parts.push(
      `<g class="shaft"><rect x="${midX - 42}" y="${midY - 20}" width="84" height="40" rx="3" /><line x1="${midX - 36}" y1="${midY}" x2="${midX + 36}" y2="${midY}" /><line x1="${midX - 14}" y1="${midY - 10}" x2="${midX - 14}" y2="${midY + 10}" /><line x1="${midX + 14}" y1="${midY - 10}" x2="${midX + 14}" y2="${midY + 10}" /></g>`
    );

    d.cabins.forEach((cabin) => {
      const y = yForPos(cabin.pos) - cabinLen / 2;
      const x = cabin.side === 'port' ? portX : starboardX;
      const dimmed = cabinDimmed(cabin);
      const active = state.activeCabin === cabin.id;
      const shortlisted = state.shortlist.some((s) => s.shipId === state.shipId && s.cabinId === cabin.id);
      const cat = CATEGORIES[cabin.category];
      const showLabel = cabinLen >= 20;
      parts.push(
        `<g class="cabin${dimmed ? ' is-dim' : ''}${active ? ' is-active' : ''}${shortlisted ? ' is-shortlisted' : ''}" data-id="${cabin.id}">` +
          `<rect x="${x}" y="${y.toFixed(1)}" width="${PLAN.colW}" height="${cabinLen.toFixed(1)}" rx="3" fill="${cat.color}" />` +
          (showLabel
            ? `<text class="cabin-label" x="${x + PLAN.colW / 2}" y="${(y + cabinLen / 2 + 4).toFixed(1)}" fill="${cat.text}">${cabin.id}</text>`
            : '') +
          `</g>`
      );
    });

    parts.push(`<text class="col-label" x="${portX + PLAN.colW / 2}" y="${PLAN.yBow - 34}">PORT</text>`);
    parts.push(`<text class="col-label" x="${starboardX + PLAN.colW / 2}" y="${PLAN.yBow - 34}">STARBOARD</text>`);

    parts.push(
      `<g class="compass" transform="translate(${hullLeft + 6},${PLAN.yStern - 30})"><circle r="16" /><line x1="0" y1="-16" x2="0" y2="16" /><line x1="-16" y1="0" x2="16" y2="0" /><text y="-20">N</text></g>`
    );

    els.plan.setAttribute('viewBox', `0 0 ${PLAN.viewW} ${viewH}`);
    els.plan.innerHTML = parts.join('');

    els.plan.querySelectorAll('.cabin').forEach((g) => {
      const cabin = findCabin(state.shipId, g.dataset.id);
      g.addEventListener('mouseenter', (e) => showTooltip(e, cabin));
      g.addEventListener('mousemove', (e) => moveTooltip(e));
      g.addEventListener('mouseleave', hideTooltip);
      g.addEventListener('click', () => selectCabin(cabin));
      g.addEventListener('focus', (e) => showTooltip(e, cabin));
      g.addEventListener('blur', hideTooltip);
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `Cabin ${cabin.id}, ${CATEGORIES[cabin.category].label}, ${cabin.sqft} square feet`);
    });
  }

  function showTooltip(e, cabin) {
    els.tooltip.hidden = false;
    els.tooltip.innerHTML = `<strong>${cabin.id}</strong><span>${CATEGORIES[cabin.category].label} · ${cabin.sqft} sq ft</span>`;
    moveTooltip(e);
  }

  function moveTooltip(e) {
    const rect = els.plan.parentElement.getBoundingClientRect();
    const x = (e.clientX ?? rect.left) - rect.left;
    const y = (e.clientY ?? rect.top) - rect.top;
    els.tooltip.style.left = `${x + 14}px`;
    els.tooltip.style.top = `${y + 14}px`;
  }

  function hideTooltip() {
    els.tooltip.hidden = true;
  }

  // --- List view -----------------------------------------------------------
  function renderList() {
    const d = deck();
    els.deckLabel.textContent = `Deck ${d.number}`;
    els.deckSub.textContent = `${d.cabins.length} cabins · ${ship().name}`;

    const rows = deck()
      .cabins.filter((c) => !cabinDimmed(c))
      .slice()
      .sort((a, b) => state.sortDir * SORTERS[state.sortKey](a, b));

    els.listBody.innerHTML = rows
      .map((c) => {
        const shortlisted = state.shortlist.some((s) => s.shipId === state.shipId && s.cabinId === c.id);
        const active = state.activeCabin === c.id;
        return `
        <tr data-id="${c.id}" class="${active ? 'is-active' : ''}${shortlisted ? ' is-shortlisted' : ''}">
          <td class="mono">${c.id}</td>
          <td>${c.deck}</td>
          <td><span class="cat-dot" style="background:${CATEGORIES[c.category].color}"></span>${CATEGORIES[c.category].label}</td>
          <td>${c.sqft} sqft</td>
          <td>${c.occupancy}</td>
          <td>${c.elevatorWalk}</td>
        </tr>`;
      })
      .join('');

    els.listBody.querySelectorAll('tr').forEach((row) => {
      row.addEventListener('click', () => selectCabin(findCabin(state.shipId, row.dataset.id)));
    });
  }

  document.querySelectorAll('#list-view th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (state.sortKey === key) state.sortDir *= -1;
      else {
        state.sortKey = key;
        state.sortDir = 1;
      }
      document.querySelectorAll('#list-view th[data-sort]').forEach((h) => h.removeAttribute('data-dir'));
      th.setAttribute('data-dir', state.sortDir === 1 ? 'asc' : 'desc');
      renderList();
    });
  });

  // --- Legend / filters --------------------------------------------------
  function renderLegend() {
    els.legend.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.cat = key;
      chip.setAttribute('aria-pressed', 'true');
      chip.innerHTML = `<span class="chip-swatch" style="background:${cat.color}"></span>${cat.label}`;
      chip.addEventListener('click', () => toggleFilter(key, chip));
      els.legend.appendChild(chip);
    });
  }

  function toggleFilter(key, chip) {
    if (state.activeFilters.has(key)) {
      state.activeFilters.delete(key);
      chip.setAttribute('aria-pressed', 'false');
    } else {
      state.activeFilters.add(key);
      chip.setAttribute('aria-pressed', 'true');
    }
    renderCurrentView();
  }

  // --- Cabin detail --------------------------------------------------------
  function selectCabin(cabin) {
    state.activeCabin = cabin.id;
    renderCurrentView();
    renderDetail(cabin);
  }

  function quietLabel(score) {
    if (score > 0.7) return 'Quietest on this deck';
    if (score > 0.45) return 'Typical motion & noise';
    return 'Expect more motion / noise';
  }

  function renderDetail(cabin) {
    if (!cabin) {
      els.detail.innerHTML = `<p class="detail-empty">Select a cabin to see its details here.</p>`;
      return;
    }
    const cat = CATEGORIES[cabin.category];
    const shortlisted = state.shortlist.some((s) => s.shipId === state.shipId && s.cabinId === cabin.id);
    els.detail.innerHTML = `
      <div class="stub">
        <div class="stub-row">
          <span class="stub-id">${cabin.id}</span>
          <span class="stub-cat" style="color:${cat.color}">${cat.label}</span>
        </div>
        <dl class="stub-grid">
          <div><dt>Ship</dt><dd>${ship().name}</dd></div>
          <div><dt>Deck</dt><dd>${cabin.deck}</dd></div>
          <div><dt>Side</dt><dd>${cabin.side === 'port' ? 'Port' : 'Starboard'}</dd></div>
          <div><dt>Size</dt><dd>${cabin.sqft} sq ft</dd></div>
          <div><dt>Sleeps</dt><dd>${cabin.occupancy}</dd></div>
          <div><dt>Lift &amp; stairs</dt><dd>${cabin.elevatorWalk} walk</dd></div>
          <div><dt>Motion &amp; noise</dt><dd>${quietLabel(cabin.quiet)}</dd></div>
        </dl>
        <button class="shortlist-btn" id="shortlist-btn">${shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}</button>
      </div>
    `;
    document.getElementById('shortlist-btn').addEventListener('click', () => toggleShortlist(cabin));
  }

  function toggleShortlist(cabin) {
    const i = state.shortlist.findIndex((s) => s.shipId === state.shipId && s.cabinId === cabin.id);
    if (i === -1) state.shortlist.push({ shipId: state.shipId, cabinId: cabin.id });
    else state.shortlist.splice(i, 1);
    saveShortlist();
    renderShortlist();
    renderCurrentView();
    if (state.activeCabin === cabin.id) renderDetail(cabin);
  }

  function renderShortlist() {
    els.shortlistCount.textContent = state.shortlist.length;
    if (state.shortlist.length === 0) {
      els.shortlistTray.innerHTML = `<p class="tray-empty">Cabins you shortlist will line up here for comparison.</p>`;
      els.copySummaryBtn.hidden = true;
      return;
    }
    els.copySummaryBtn.hidden = false;
    const rows = state.shortlist
      .map((s) => ({ ship: SHIPS.find((x) => x.id === s.shipId), cabin: findCabin(s.shipId, s.cabinId) }))
      .filter((r) => r.cabin)
      .map(
        ({ ship: sh, cabin: c }) => `
        <li>
          <span class="tray-swatch" style="background:${CATEGORIES[c.category].color}"></span>
          <span class="tray-id">${c.id}</span>
          <span class="tray-ship">${sh.name}</span>
          <span class="tray-cat">${CATEGORIES[c.category].label}</span>
          <button aria-label="Remove ${c.id} from shortlist" data-ship="${sh.id}" data-id="${c.id}">&times;</button>
        </li>`
      )
      .join('');
    els.shortlistTray.innerHTML = `<ul class="tray-list">${rows}</ul>`;
    els.shortlistTray.querySelectorAll('button[data-id]').forEach((btn) => {
      btn.addEventListener('click', () => toggleShortlist(findCabin(btn.dataset.ship, btn.dataset.id)));
    });
  }

  els.copySummaryBtn.addEventListener('click', async () => {
    const lines = state.shortlist
      .map((s) => ({ ship: SHIPS.find((x) => x.id === s.shipId), cabin: findCabin(s.shipId, s.cabinId) }))
      .filter((r) => r.cabin)
      .map(
        ({ ship: sh, cabin: c }) =>
          `${sh.name} · Cabin ${c.id} · Deck ${c.deck} · ${CATEGORIES[c.category].label} · ${c.sqft} sq ft`
      );
    const text = `Cabin shortlist — ${BRAND.site}\n\n${lines.join('\n')}`;
    try {
      await navigator.clipboard.writeText(text);
      els.copySummaryBtn.textContent = 'Copied';
      setTimeout(() => (els.copySummaryBtn.textContent = 'Copy shortlist'), 1600);
    } catch (e) {
      els.copySummaryBtn.textContent = 'Copy failed — select & copy manually';
    }
  });

  els.quietToggle.addEventListener('click', () => {
    state.quietOnly = !state.quietOnly;
    els.quietToggle.setAttribute('aria-pressed', String(state.quietOnly));
    renderCurrentView();
  });

  renderShipSelect();
  renderRungs();
  renderLegend();
  renderCurrentView();
  renderDetail(null);
  renderShortlist();
})();
