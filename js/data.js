// Deterministic pseudo-random generator so the deck plan is stable across reloads.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BRAND = { site: 'Pick My Cabin' };

// NOTE: Cabin-level data below is illustrative placeholder data generated for
// layout/UX purposes only — it is not sourced from Cunard and should not be
// used for real bookings until replaced with a licensed deck-plan feed.
const CATEGORIES = {
  interior: { label: 'Interior', short: 'IN', color: '#6E6A63', text: '#EFE9DD' },
  oceanview: { label: 'Oceanview', short: 'OV', color: '#B8964F', text: '#0B0B0C' },
  balcony: { label: 'Balcony', short: 'BA', color: '#A6192E', text: '#EFE9DD' },
  suite: { label: 'Suite', short: 'SU', color: '#E8C766', text: '#0B0B0C' },
};

// Category weight per deck (index 0 = lowest deck shown, N-1 = top deck).
function weightsForDeck(index, total) {
  const t = index / (total - 1); // 0 low .. 1 high
  return {
    interior: Math.max(0, 0.6 - t * 0.65),
    oceanview: 0.35 - Math.abs(t - 0.4) * 0.2,
    balcony: 0.05 + t * 0.55,
    suite: Math.max(0, t - 0.55) * 1.1,
  };
}

function normalize(weights) {
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  const out = {};
  Object.entries(weights).forEach(([k, v]) => (out[k] = v / sum));
  return out;
}

function pickCategory(rng, weights) {
  const roll = rng();
  let acc = 0;
  for (const key of Object.keys(weights)) {
    acc += weights[key];
    if (roll <= acc) return key;
  }
  return 'interior';
}

// pos: 0 = stern, 1 = bow. Distance from midship (0.5) and from stern engine
// noise (near 0) both erode the quiet score.
function quietScore(pos) {
  const midshipPenalty = Math.abs(pos - 0.5) * 1.5;
  const sternPenalty = pos < 0.18 ? (0.18 - pos) * 2.2 : 0;
  const score = 1 - midshipPenalty - sternPenalty;
  return Math.max(0, Math.min(1, score));
}

function buildDeck(seedBase, deckNumber, deckIndex, totalDecks, cabinsPerSide) {
  const weights = normalize(weightsForDeck(deckIndex, totalDecks));
  const rng = mulberry32(seedBase + deckNumber * 7919 + 13);
  const cabins = [];

  ['port', 'starboard'].forEach((side) => {
    for (let i = 0; i < cabinsPerSide; i++) {
      const pos = i / (cabinsPerSide - 1); // 0 stern .. 1 bow
      const category = pickCategory(rng, weights);
      const sizeJitter = 0.9 + rng() * 0.25;
      const quiet = quietScore(pos);
      const cabinNumber = `${deckNumber}${side === 'port' ? '0' : '5'}${String(i + 1).padStart(2, '0')}`;

      cabins.push({
        id: cabinNumber,
        deck: deckNumber,
        side,
        pos,
        category,
        sqft: Math.round(
          (category === 'suite' ? 340 : category === 'balcony' ? 210 : category === 'oceanview' ? 175 : 160) *
            sizeJitter
        ),
        occupancy: category === 'suite' ? 4 : 2,
        quiet,
        elevatorWalk: pos > 0.4 && pos < 0.6 ? 'Near' : pos > 0.25 && pos < 0.75 ? 'Mid' : 'Far',
      });
    }
  });

  return { number: deckNumber, index: deckIndex, cabins };
}

function buildShip(seedBase, id, name, decksSpec) {
  const decks = decksSpec.map((spec, i) =>
    buildDeck(seedBase, spec.number, i, decksSpec.length, spec.cabinsPerSide)
  );
  return { id, name, decks };
}

// General published ship specifications (tonnage, length, passenger counts,
// etc.) — publicly available facts, sourced independently of any Cunard
// deck-plan diagrams. Not cabin-level data.
const SHIP_INFO = {
  qm2: {
    tagline: 'The last true ocean liner',
    entered: '2004',
    tonnage: '149,215 GT',
    length: '345 m (1,132 ft)',
    passengers: '2,695',
    decks: '14 passenger decks, 18 total',
    builder: 'Chantiers de l’Atlantique, France',
  },
  qv: {
    tagline: 'The smallest ship in the fleet',
    entered: '2007',
    tonnage: '90,049 GT',
    length: '294 m (964 ft)',
    passengers: '2,081',
    decks: '12 passenger decks, 16 total',
    builder: 'Fincantieri, Italy',
  },
  qe: {
    tagline: 'Art Deco-inspired sister ship to Queen Victoria',
    entered: '2010',
    tonnage: '90,901 GT',
    length: '294 m (965 ft)',
    passengers: '2,092',
    decks: '12 passenger decks, 16 total',
    builder: 'Fincantieri, Italy',
  },
  qa: {
    tagline: 'The newest ship in the fleet',
    entered: '2024',
    tonnage: '114,188 GT',
    length: '323 m (1,058 ft)',
    passengers: 'Up to 3,000',
    decks: '13 passenger decks',
    builder: 'Fincantieri, Italy',
  },
};

const SHIPS = [
  buildShip(101, 'qm2', 'Queen Mary 2', [
    { number: 6, cabinsPerSide: 24 },
    { number: 7, cabinsPerSide: 24 },
    { number: 8, cabinsPerSide: 22 },
    { number: 9, cabinsPerSide: 20 },
    { number: 10, cabinsPerSide: 18 },
    { number: 11, cabinsPerSide: 14 },
  ]),
  buildShip(202, 'qv', 'Queen Victoria', [
    { number: 5, cabinsPerSide: 20 },
    { number: 6, cabinsPerSide: 20 },
    { number: 7, cabinsPerSide: 18 },
    { number: 8, cabinsPerSide: 16 },
    { number: 9, cabinsPerSide: 12 },
  ]),
  buildShip(303, 'qe', 'Queen Elizabeth', [
    { number: 5, cabinsPerSide: 20 },
    { number: 6, cabinsPerSide: 20 },
    { number: 7, cabinsPerSide: 18 },
    { number: 8, cabinsPerSide: 16 },
    { number: 9, cabinsPerSide: 12 },
  ]),
  buildShip(404, 'qa', 'Queen Anne', [
    { number: 6, cabinsPerSide: 22 },
    { number: 7, cabinsPerSide: 22 },
    { number: 8, cabinsPerSide: 20 },
    { number: 9, cabinsPerSide: 18 },
    { number: 10, cabinsPerSide: 14 },
  ]),
];
