const BRAND = { site: 'Pick My Cabin' };

// Cruise lines and ships are a starter directory to search/browse — not tied
// to any single line, and meant to grow. "Can't find your ship" adds new
// entries the same way real reviews do.
const LINES = [
  { id: 'cunard', name: 'Cunard' },
  { id: 'royal-caribbean', name: 'Royal Caribbean' },
  { id: 'celebrity', name: 'Celebrity Cruises' },
  { id: 'princess', name: 'Princess Cruises' },
  { id: 'msc', name: 'MSC Cruises' },
  { id: 'holland-america', name: 'Holland America Line' },
  { id: 'regent', name: 'Regent Seven Seas Cruises' },
  { id: 'silversea', name: 'Silversea' },
  { id: 'oceania', name: 'Oceania Cruises' },
  { id: 'ncl', name: 'Norwegian Cruise Line' },
  { id: 'disney', name: 'Disney Cruise Line' },
  { id: 'viking', name: 'Viking Ocean Cruises' },
  { id: 'po-cruises', name: 'P&O Cruises' },
];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// IDs are just the slugified ship name (matches the original hand-written
// ids, so existing reviews keep pointing at the right ship) — except where
// names are generic enough to collide (e.g. Oceania's single-word ships),
// which get the line as a prefix for uniqueness.
function shipList(lineId, names, { prefixed = false } = {}) {
  return names.map((name) => ({
    id: prefixed ? `${lineId}-${slugify(name)}` : slugify(name),
    lineId,
    name,
  }));
}

const SHIPS = [
  ...shipList('cunard', ['Queen Mary 2', 'Queen Victoria', 'Queen Elizabeth', 'Queen Anne']),
  ...shipList('royal-caribbean', [
    'Icon of the Seas',
    'Star of the Seas',
    'Utopia of the Seas',
    'Wonder of the Seas',
    'Symphony of the Seas',
    'Harmony of the Seas',
    'Oasis of the Seas',
    'Allure of the Seas',
    'Odyssey of the Seas',
    'Spectrum of the Seas',
    'Anthem of the Seas',
    'Ovation of the Seas',
    'Quantum of the Seas',
    'Freedom of the Seas',
    'Liberty of the Seas',
    'Independence of the Seas',
    'Navigator of the Seas',
    'Mariner of the Seas',
    'Voyager of the Seas',
    'Explorer of the Seas',
    'Adventure of the Seas',
    'Radiance of the Seas',
    'Brilliance of the Seas',
    'Serenade of the Seas',
    'Jewel of the Seas',
    'Vision of the Seas',
    'Grandeur of the Seas',
    'Enchantment of the Seas',
  ]),
  ...shipList('celebrity', [
    'Celebrity Xcel',
    'Celebrity Beyond',
    'Celebrity Apex',
    'Celebrity Edge',
    'Celebrity Ascent',
    'Celebrity Silhouette',
    'Celebrity Reflection',
    'Celebrity Eclipse',
    'Celebrity Equinox',
    'Celebrity Solstice',
    'Celebrity Summit',
    'Celebrity Constellation',
    'Celebrity Infinity',
    'Celebrity Millennium',
  ]),
  ...shipList('princess', [
    'Star Princess',
    'Sun Princess',
    'Discovery Princess',
    'Enchanted Princess',
    'Sky Princess',
    'Majestic Princess',
    'Regal Princess',
    'Royal Princess',
    'Emerald Princess',
    'Caribbean Princess',
    'Crown Princess',
    'Ruby Princess',
    'Diamond Princess',
    'Sapphire Princess',
    'Island Princess',
    'Coral Princess',
  ]),
  ...shipList('msc', [
    'MSC World America',
    'MSC World Europa',
    'MSC Euribia',
    'MSC Seascape',
    'MSC Seashore',
    'MSC Grandiosa',
    'MSC Virtuosa',
    'MSC Bellissima',
    'MSC Meraviglia',
    'MSC Preziosa',
    'MSC Divina',
    'MSC Fantasia',
    'MSC Splendida',
    'MSC Magnifica',
    'MSC Musica',
    'MSC Orchestra',
    'MSC Poesia',
    'MSC Armonia',
    'MSC Lirica',
    'MSC Opera',
  ]),
  ...shipList('holland-america', [
    'Rotterdam',
    'Nieuw Statendam',
    'Koningsdam',
    'Nieuw Amsterdam',
    'Eurodam',
    'Oosterdam',
    'Westerdam',
    'Zuiderdam',
    'Noordam',
    'Volendam',
    'Zaandam',
  ]),
  ...shipList('regent', [
    'Seven Seas Grandeur',
    'Seven Seas Splendor',
    'Seven Seas Explorer',
    'Seven Seas Voyager',
    'Seven Seas Mariner',
    'Seven Seas Navigator',
  ]),
  ...shipList('silversea', [
    'Silver Nova',
    'Silver Ray',
    'Silver Moon',
    'Silver Dawn',
    'Silver Muse',
    'Silver Spirit',
    'Silver Whisper',
    'Silver Shadow',
    'Silver Wind',
    'Silver Cloud',
    'Silver Origin',
    'Silver Endeavour',
  ]),
  ...shipList('oceania', ['Vista', 'Allura', 'Marina', 'Riviera', 'Sirena', 'Regatta', 'Insignia', 'Nautica'], {
    prefixed: true,
  }),
  ...shipList('ncl', [
    'Norwegian Aqua',
    'Norwegian Prima',
    'Norwegian Viva',
    'Norwegian Encore',
    'Norwegian Bliss',
    'Norwegian Joy',
    'Norwegian Escape',
    'Norwegian Getaway',
    'Norwegian Breakaway',
    'Norwegian Epic',
    'Norwegian Jade',
    'Norwegian Gem',
    'Norwegian Pearl',
    'Norwegian Star',
    'Norwegian Sun',
    'Norwegian Sky',
    'Norwegian Spirit',
    'Pride of America',
  ]),
  ...shipList('disney', [
    'Disney Destiny',
    'Disney Treasure',
    'Disney Wish',
    'Disney Fantasy',
    'Disney Dream',
    'Disney Magic',
    'Disney Wonder',
  ]),
  ...shipList('viking', [
    'Viking Vela',
    'Viking Saturn',
    'Viking Neptune',
    'Viking Mars',
    'Viking Jupiter',
    'Viking Venus',
    'Viking Orion',
    'Viking Sky',
    'Viking Sea',
    'Viking Star',
  ]),
  ...shipList('po-cruises', ['Iona', 'Arvia', 'Britannia', 'Azura', 'Ventura', 'Aurora', 'Arcadia']),
];

const TAGS = [
  'Quiet',
  'Noisy',
  'Great view',
  'Obstructed view',
  'Spacious',
  'Small bathroom',
  'Close to lifts',
  'Long walk to lifts',
  'Balcony overlooked',
  'Good storage',
];

// In-depth, line-specific cabin grade guides. Original writing describing
// each line's real (publicly documented) category structure and generally
// known benefits — not sourced from any line's proprietary deck plans or
// marketing copy. Specifics can change between ships/sailings; each guide
// page carries a disclaimer to confirm current details before booking.
const LINE_GUIDES = {
  cunard: {
    about: [
      'Cunard is a British line with over 180 years of history, and it sails differently to most modern cruise lines — think formal nights, ballroom dancing and a proper afternoon tea, delivered under Cunard\'s long-standing "White Star Service" style of hospitality. Its fleet of four ships — Queen Mary 2, Queen Victoria, Queen Elizabeth and Queen Anne — sail worldwide, including Queen Mary 2\'s regular transatlantic crossings. Queen Mary 2 is, in fact, the only true ocean liner still in service today, built to cross open ocean rather than just hop between ports.',
      'Cabins split into two broad tiers. <strong>Britannia</strong> is the standard experience open to every guest, covering Inside, Oceanview and Balcony cabins. The <strong>Grills</strong> sit above that as Cunard\'s top tier, each with its own restaurant, lounge and outdoor deck. Britannia Club sits in between — a Balcony cabin with a service upgrade, without stepping all the way up to a Grill suite.',
    ],
    grades: [
      { name: 'Britannia Inside', tier: 'Britannia', price: '$', summary: 'No window, usually toward the ship\'s interior. The simplest, most affordable way to sail with Cunard.', includes: 'Full access to the Britannia Restaurant and every standard onboard venue — the same ship experience as every other Britannia guest.' },
      { name: 'Britannia Oceanview', tier: 'Britannia', price: '$$', summary: 'A real window or porthole, but no door to step outside. Natural light without the balcony price jump.', includes: 'Same as Britannia Inside, plus a view out to sea.' },
      { name: 'Britannia Balcony', tier: 'Britannia', price: '$$$', summary: 'A private balcony with outdoor seating — the most popular way to experience Cunard\'s classic ocean-liner style.', includes: 'Same Britannia-tier dining and service as Inside/Oceanview, plus private outdoor space.' },
      { name: 'Britannia Club Balcony', tier: 'Britannia Club', price: '$$$$', summary: 'A balcony cabin with an elevated service package on top — not a suite, but treated a step above standard Britannia.', includes: 'Priority embarkation and disembarkation, and reserved seating in a dedicated Britannia Club dining area with a more attentive service style.' },
      { name: 'Princess Grill Suite', tier: 'Grills', price: '$$$$$', summary: 'The entry point to Cunard\'s top accommodation tier — a true suite with a separate seating area.', includes: 'Dining in the exclusive Princess Grill restaurant, access to the Grills Lounge and the private Grills Terrace sun deck, priority boarding and disembarkation, and a noticeably higher staff-to-guest service ratio than Britannia.' },
      { name: 'Queens Grill Suite', tier: 'Grills', price: '$$$$$$', summary: 'Cunard\'s top tier — the largest suites on the ship, with the most personalised service Cunard offers.', includes: 'Dining in the most exclusive Queens Grill restaurant, the Queens Grill Lounge, access to the Grills Terrace, service that can extend to a butler on the largest suites, and top priority for embarkation, disembarkation and shore excursions.' },
    ],
  },
  'royal-caribbean': {
    about: [
      'Royal Caribbean is the world\'s biggest cruise line by ship size, home to the Oasis and Icon classes — the largest cruise ships ever built, with waterparks, ice rinks, zip lines and entire neighbourhoods of themed spaces onboard. It\'s a mainstream, activity-packed line aimed squarely at families and first-timers as much as seasoned cruisers.',
      'Standard cabins run from Interior through to Balcony. Above that, Junior Suites and Grand Suites add space and some priority perks, while <strong>Suite Class</strong> and the top-tier <strong>Star Class</strong> unlock Coastal Kitchen dining, a private Suite Neighbourhood with its own pool on the biggest ships, and — at Star Class — a dedicated Royal Genie who handles everything from dinner reservations to disembarkation.',
    ],
    grades: [
      { name: 'Interior', tier: 'Standard', price: '$', summary: 'No window. On the biggest ships, some interiors overlook indoor spaces like the Boardwalk or Royal Promenade instead of having no view at all.', includes: 'Full access to the ship\'s dining and entertainment, same as every other standard cabin.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Interior, plus a view out to sea.' },
      { name: 'Balcony', tier: 'Standard', price: '$$$', summary: 'A private balcony with outdoor seating.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Junior Suite', tier: 'Suite Class', price: '$$$$', summary: 'A step up in space with some suite-style touches, without the full Suite Class perks package.', includes: 'Extra room and often a larger bathroom, but standard dining venues.' },
      { name: 'Grand Suite', tier: 'Suite Class', price: '$$$$$', summary: 'A genuine suite with separate living space.', includes: 'Priority boarding, and on ships with Suite Class, access to the Coastal Kitchen restaurant and Suite Lounge.' },
      { name: 'Star Class', tier: 'Star Class', price: '$$$$$$', summary: 'The top tier — the biggest suites on the biggest ships.', includes: 'A dedicated Royal Genie concierge, priority everything, and (on Oasis and Icon class ships) access to a private Suite Neighbourhood with its own pool and sun deck.' },
    ],
  },
  celebrity: {
    about: [
      'Celebrity is a premium, design-forward line — modern ships, strong food and drink programmes, and a slightly more grown-up atmosphere than mainstream competitors. It\'s part of the same parent company as Royal Caribbean but aimed at a different crowd.',
      'Standard cabins go Inside through Veranda (Celebrity\'s name for a balcony cabin). <strong>Concierge Class</strong> adds priority perks to a Veranda cabin without a full suite upgrade, <strong>AquaClass</strong> is built around wellness with spa access included, and <strong>The Retreat</strong> — Celebrity\'s suite complex — gets its own restaurant, lounge and sun deck.',
    ],
    grades: [
      { name: 'Inside', tier: 'Standard', price: '$', summary: 'No window.', includes: 'Standard dining and entertainment access.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Inside, plus a view out to sea.' },
      { name: 'Veranda', tier: 'Standard', price: '$$$', summary: 'Celebrity\'s name for a standard balcony cabin.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Concierge Class', tier: 'Concierge', price: '$$$$', summary: 'A Veranda cabin with a priority perks package layered on top.', includes: 'Priority boarding, a dedicated concierge, and small extras like a welcome bottle of sparkling wine.' },
      { name: 'AquaClass', tier: 'AquaClass', price: '$$$$', summary: 'A wellness-focused cabin tier.', includes: 'Access to the Blu restaurant, a spa-adjacent cabin location, and included access to the Persian Garden thermal suite.' },
      { name: 'The Retreat', tier: 'The Retreat', price: '$$$$$', summary: 'Celebrity\'s suite complex, spanning several suite sizes from Sky Suite up to Penthouse Suite.', includes: 'Dining at the exclusive Luminae restaurant, access to the Retreat Lounge and Retreat Sundeck, and butler service on the largest suites.' },
    ],
  },
  princess: {
    about: [
      'Princess is a mainstream-premium line with roots in the "Love Boat" era, known for strong enrichment programming and its MedallionClass wearable — a keyless entry and ordering system used fleet-wide.',
      'Standard cabins go Interior through Balcony, with <strong>Mini-Suites</strong> adding space without a full suite price tag. Above that, standard <strong>Suites</strong> and the top-tier Signature Suites make up Princess\'s <strong>Suite Class</strong>, with priority perks and a dedicated lounge on select ships.',
    ],
    grades: [
      { name: 'Interior', tier: 'Standard', price: '$', summary: 'No window.', includes: 'Standard MedallionClass access, dining and entertainment.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Interior, plus a view out to sea.' },
      { name: 'Balcony', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Mini-Suite', tier: 'Standard+', price: '$$$$', summary: 'Extra living space and a bigger bathroom, without the full Suite Class package.', includes: 'Same standard dining, with more room to spread out.' },
      { name: 'Suite', tier: 'Suite Class', price: '$$$$$', summary: 'A genuine suite.', includes: 'Priority boarding and, on ships with Suite Class, access to a dedicated lounge.' },
      { name: 'Signature Suite', tier: 'Suite Class', price: '$$$$$$', summary: 'The largest, top-tier suites.', includes: 'The fullest Suite Class perks package, including priority service and the best locations on the ship.' },
    ],
  },
  msc: {
    about: [
      'MSC is a Swiss-Italian line and Europe\'s largest, expanding fast worldwide with big modern ships known for elaborate atriums and a distinctly European onboard style.',
      'MSC groups its cabins into four named "experiences" rather than the usual four cabin types: <strong>Bella</strong> (essential, budget-friendly), <strong>Fantastica</strong> (preferred locations and balconies), <strong>Aurea</strong> (wellness and priority perks), and the top-tier <strong>Yacht Club</strong> — a private ship-within-a-ship.',
    ],
    grades: [
      { name: 'Bella Interior', tier: 'Bella', price: '$', summary: 'The essential, most affordable MSC experience — often located toward the front or back of the ship.', includes: 'Full access to standard dining and entertainment.' },
      { name: 'Fantastica Balcony', tier: 'Fantastica', price: '$$$', summary: 'A preferred, more central cabin location, typically with a balcony.', includes: 'Same standard access, better positioned on the ship.' },
      { name: 'Aurea Balcony', tier: 'Aurea', price: '$$$$', summary: 'A wellness-focused tier.', includes: 'Priority boarding, access to the spa\'s thermal area, and a welcome bottle of sparkling wine.' },
      { name: 'Yacht Club Suite', tier: 'Yacht Club', price: '$$$$$$', summary: 'MSC\'s top tier — a private, gated complex with its own restaurant, lounge and sun deck.', includes: 'Butler service, a dedicated concierge, and exclusive access to the Yacht Club restaurant, lounge and pool area.' },
    ],
  },
  'holland-america': {
    about: [
      'Holland America is a more traditional, relaxed premium line with a strong culinary focus and generally longer, more immersive itineraries than the big mainstream lines.',
      'Standard cabins go Interior through Verandah, with <strong>Neptune Suites</strong> adding real suite space and priority perks. The top-tier <strong>Pinnacle Suite</strong> — usually just one or two per ship — gets the largest accommodation and a dedicated concierge.',
    ],
    grades: [
      { name: 'Interior', tier: 'Standard', price: '$', summary: 'No window.', includes: 'Full access to standard dining and entertainment.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Interior, plus a view out to sea.' },
      { name: 'Verandah', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Neptune Suite', tier: 'Suite', price: '$$$$$', summary: 'A genuine suite with separate living space.', includes: 'Priority boarding, access to the Neptune Lounge, and a dedicated concierge.' },
      { name: 'Pinnacle Suite', tier: 'Suite', price: '$$$$$$', summary: 'The largest suite on the ship, usually just one or two per sailing.', includes: 'The fullest perks package Holland America offers, including personalised concierge service.' },
    ],
  },
  regent: {
    about: [
      'Regent is an ultra-luxury, all-inclusive line — fares already include gratuities, most drinks, Wi-Fi, and shore excursions in every port. Ships are small, generally under 750 passengers.',
      'Every Regent cabin is a suite with its own private balcony — there\'s no interior or oceanview-only category. The grades below reflect size and location rather than a jump in what\'s included, since the all-inclusive fare and service level stay consistent across the ship.',
    ],
    grades: [
      { name: 'Deluxe Suite', tier: 'Entry suite', price: '$$$$', summary: 'The smallest, most affordable Regent suite — still with a private balcony.', includes: 'The full Regent all-inclusive fare: gratuities, most drinks, Wi-Fi and shore excursions.' },
      { name: 'Concierge Suite', tier: 'Suite', price: '$$$$', summary: 'A modest step up in size and location.', includes: 'Same all-inclusive fare, plus small concierge-level extras.' },
      { name: 'Penthouse Suite', tier: 'Suite', price: '$$$$$', summary: 'More space and a butler.', includes: 'Butler service alongside the standard all-inclusive fare.' },
      { name: 'Seven Seas Suite', tier: 'Suite', price: '$$$$$', summary: 'A larger suite with separate living space.', includes: 'Butler service and priority embarkation.' },
      { name: 'Master Suite', tier: 'Top suite', price: '$$$$$$', summary: 'The largest suite on the ship.', includes: 'The fullest butler and concierge service Regent offers, on top of the all-inclusive fare.' },
    ],
  },
  silversea: {
    about: [
      'Silversea is another ultra-luxury, all-inclusive line, with intimate ships and butler service included in every suite as standard — alongside expedition ships built for polar and adventure itineraries.',
      'Like Regent, every Silversea accommodation is a suite — there\'s no separate interior or oceanview category. Grades below reflect size, not what\'s included, since butler service and the all-inclusive fare are standard fleet-wide.',
    ],
    grades: [
      { name: 'Vista Suite', tier: 'Entry suite', price: '$$$$', summary: 'The smallest Silversea suite.', includes: 'Butler service and the full all-inclusive fare.' },
      { name: 'Veranda Suite', tier: 'Suite', price: '$$$$', summary: 'A private balcony added to the Vista-level suite.', includes: 'Same butler service and all-inclusive fare.' },
      { name: 'Silver Suite', tier: 'Suite', price: '$$$$$', summary: 'More living space, split into separate areas.', includes: 'Same butler service and all-inclusive fare, in a larger footprint.' },
      { name: 'Grand Suite', tier: 'Suite', price: '$$$$$', summary: 'A larger suite with a dedicated living room.', includes: 'Same all-inclusive fare, with more room to spread out.' },
      { name: 'Owner\'s Suite', tier: 'Top suite', price: '$$$$$$', summary: 'The largest, most exclusive suite Silversea offers.', includes: 'The fullest butler and concierge service available, on top of the standard all-inclusive fare.' },
    ],
  },
  oceania: {
    about: [
      'Oceania is an upscale, food-focused line with a country-club-casual atmosphere — no formal nights — on mid-size ships, owned by the same parent company as Regent and Norwegian.',
      'Standard cabins go Inside through Veranda Stateroom, with <strong>Concierge Level Veranda</strong> adding priority perks. Above that, Penthouse Suites lead up to the top-tier <strong>Owner\'s Suite</strong>, Oceania\'s largest accommodation.',
    ],
    grades: [
      { name: 'Inside', tier: 'Standard', price: '$', summary: 'No window.', includes: 'Full access to standard dining and entertainment.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Inside, plus a view out to sea.' },
      { name: 'Veranda Stateroom', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Concierge Level Veranda', tier: 'Concierge', price: '$$$$', summary: 'A Veranda cabin with a priority perks package.', includes: 'Priority boarding and small welcome extras.' },
      { name: 'Penthouse Suite', tier: 'Suite', price: '$$$$$', summary: 'A genuine suite with separate living space.', includes: 'Butler service and priority dining reservations.' },
      { name: 'Owner\'s Suite', tier: 'Top suite', price: '$$$$$$', summary: 'Oceania\'s largest, top-tier suite.', includes: 'The fullest butler and concierge service Oceania offers.' },
    ],
  },
  ncl: {
    about: [
      'Norwegian pioneered "Freestyle Cruising" — no fixed dining times or dress codes — and is known today for large, activity-packed ships and its standout suite complex, The Haven.',
      'Standard cabins go Inside through Balcony, with Club Balcony Suites adding space. The top tier is <strong>The Haven</strong> — a private, key-card-access complex with its own pool deck, restaurant and 24-hour butler service, spanning several suite sizes up to two-bedroom villas on the biggest ships.',
    ],
    grades: [
      { name: 'Inside', tier: 'Standard', price: '$', summary: 'No window.', includes: 'Full access to standard dining and entertainment.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Inside, plus a view out to sea.' },
      { name: 'Balcony', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Club Balcony Suite', tier: 'Standard+', price: '$$$$', summary: 'Extra space without stepping up to The Haven.', includes: 'Same standard dining, with more room.' },
      { name: 'Haven Deluxe Owner\'s Suite', tier: 'The Haven', price: '$$$$$$', summary: 'Entry point to The Haven complex.', includes: '24-hour butler service, a private pool deck and restaurant, and priority access fleet-wide.' },
      { name: 'Haven Two-Bedroom Villa', tier: 'The Haven', price: '$$$$$$', summary: 'The largest Haven accommodation, on ships that offer it.', includes: 'The fullest Haven perks package, ideal for families or groups.' },
    ],
  },
  disney: {
    about: [
      'Disney is a family-focused line built around Disney theming, characters and Broadway-calibre entertainment, balanced with adult-only areas for couples and childfree travellers.',
      'Standard cabins go Inside through Verandah, with <strong>Concierge</strong> staterooms and suites at the top — Disney\'s enclave with a dedicated lounge, concierge team and expanded perks.',
    ],
    grades: [
      { name: 'Inside', tier: 'Standard', price: '$', summary: 'No window. Some ships add a "virtual porthole" with a live outside view.', includes: 'Full access to Disney\'s entertainment and character experiences.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Inside, plus a view out to sea.' },
      { name: 'Verandah', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Concierge Stateroom', tier: 'Concierge', price: '$$$$$', summary: 'Entry point to Disney\'s concierge tier.', includes: 'Access to a private concierge lounge and priority character/event booking.' },
      { name: 'Concierge Suite', tier: 'Concierge', price: '$$$$$$', summary: 'The largest Disney accommodation.', includes: 'The fullest concierge perks package, including a dedicated concierge team and expanded suite space.' },
    ],
  },
  viking: {
    about: [
      'Viking Ocean is an adults-only (18+), destination-focused line with Scandinavian minimalist design — no kids, no casinos, no formal nights, and shore excursions included in every fare.',
      'Almost every Viking Ocean cabin has a veranda as standard — there\'s no interior-only category. Grades below reflect size, from the entry Veranda Stateroom up to the top-tier Owner\'s Suite.',
    ],
    grades: [
      { name: 'Veranda Stateroom', tier: 'Standard', price: '$$$', summary: 'Viking\'s entry cabin — a private veranda is standard, not an upgrade.', includes: 'One included shore excursion per port, and standard dining across the ship\'s restaurants.' },
      { name: 'Deluxe Veranda Stateroom', tier: 'Standard+', price: '$$$$', summary: 'A larger version of the standard veranda cabin.', includes: 'Same included excursions and dining, in a larger cabin.' },
      { name: 'Penthouse Veranda Stateroom', tier: 'Suite', price: '$$$$$', summary: 'More living space, split into separate areas.', includes: 'Same included excursions and dining, with more room to spread out.' },
      { name: 'Explorer Suite', tier: 'Suite', price: '$$$$$', summary: 'A larger suite with a wraparound veranda on many ships.', includes: 'Priority dining reservations alongside the standard included excursions.' },
      { name: 'Owner\'s Suite', tier: 'Top suite', price: '$$$$$$', summary: 'Viking\'s largest, top-tier suite.', includes: 'The fullest service and space Viking Ocean offers.' },
    ],
  },
  'po-cruises': {
    about: [
      'P&O is a traditional British line, also part of Carnival Corporation, with most sailings departing from Southampton. It\'s family-friendly and more relaxed than sister line Cunard, without Cunard\'s formal ocean-liner heritage.',
      'P&O\'s cabin structure is simpler than some other lines — Inside through Balcony as the standard tiers, with Suites at the top. It doesn\'t run a separate named suite enclave like Cunard\'s Grills or Norwegian\'s Haven — Suite guests get extra space and priority perks, but dine in the same main restaurants as everyone else.',
    ],
    grades: [
      { name: 'Inside', tier: 'Standard', price: '$', summary: 'No window.', includes: 'Full access to standard dining and entertainment.' },
      { name: 'Oceanview', tier: 'Standard', price: '$$', summary: 'A real window, no balcony.', includes: 'Same as Inside, plus a view out to sea.' },
      { name: 'Balcony', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same standard dining and service, plus private outdoor space.' },
      { name: 'Suite', tier: 'Suite', price: '$$$$$', summary: 'P&O\'s top tier — more space and priority perks, without a separate dedicated restaurant.', includes: 'Priority embarkation and disembarkation, and a larger cabin and bathroom.' },
    ],
  },
};

// General, typical regions each line sails — not a live sailing schedule or
// specific dates (we have no data feed for that; presenting fabricated dates
// would be far more misleading than useful). Reflects stable, well-known
// deployment patterns. Confirm exact itineraries with the line before booking.
const REGIONS = {
  caribbean: { name: 'Caribbean', flags: '🇧🇸🇯🇲🇧🇧' },
  mediterranean: { name: 'Mediterranean', flags: '🇮🇹🇬🇷🇪🇸' },
  'northern-europe': { name: 'Northern Europe & Baltic', flags: '🇳🇴🇸🇪🇩🇰' },
  alaska: { name: 'Alaska', flags: '🇺🇸' },
  transatlantic: { name: 'Transatlantic crossings', flags: '🇬🇧🇺🇸' },
  asia: { name: 'Asia', flags: '🇯🇵🇸🇬🇹🇭' },
  'australia-pacific': { name: 'Australia & South Pacific', flags: '🇦🇺🇳🇿' },
  'south-america': { name: 'South America', flags: '🇧🇷🇦🇷🇨🇱' },
  polar: { name: 'Antarctica & the Arctic', flags: '❄️' },
  'middle-east': { name: 'Middle East', flags: '🇦🇪🇴🇲' },
  africa: { name: 'Africa', flags: '🇿🇦🇲🇦' },
  world: { name: 'World cruises', flags: '🌍' },
};

const LINE_REGIONS = {
  cunard: ['transatlantic', 'caribbean', 'mediterranean', 'northern-europe', 'world'],
  'royal-caribbean': ['caribbean', 'mediterranean', 'alaska', 'asia'],
  celebrity: ['caribbean', 'mediterranean', 'alaska', 'south-america'],
  princess: ['caribbean', 'alaska', 'mediterranean', 'asia', 'australia-pacific', 'world'],
  msc: ['mediterranean', 'caribbean', 'northern-europe', 'africa', 'middle-east'],
  'holland-america': ['alaska', 'caribbean', 'mediterranean', 'asia', 'world'],
  regent: ['world', 'mediterranean', 'caribbean', 'asia', 'polar', 'northern-europe'],
  silversea: ['polar', 'mediterranean', 'caribbean', 'asia', 'world'],
  oceania: ['mediterranean', 'caribbean', 'asia', 'south-america', 'world'],
  ncl: ['caribbean', 'alaska', 'mediterranean'],
  disney: ['caribbean', 'alaska', 'mediterranean', 'northern-europe'],
  viking: ['northern-europe', 'mediterranean', 'asia', 'world', 'south-america'],
  'po-cruises': ['caribbean', 'mediterranean', 'northern-europe', 'world'],
};

// Only ships where a distinctive, well-known specialisation genuinely differs
// from the line's general pattern — not an attempt to cover all 161 ships
// individually, since we don't have confident per-ship knowledge for most.
const SHIP_REGION_OVERRIDES = {
  'queen-mary-2': ['transatlantic', 'caribbean', 'world'],
  'silver-endeavour': ['polar'],
};

function regionsForShip(ship) {
  return SHIP_REGION_OVERRIDES[ship.id] || LINE_REGIONS[ship.lineId] || [];
}

// "Find your cabin type" quiz — a lightweight, four-question matcher scoring
// toward the four universal cabin types. Result copy matches the Cabin
// Guide's own descriptions for consistency.
const CABIN_QUIZ = {
  questions: [
    {
      text: 'How much time do you think you’ll spend in your cabin?',
      options: [
        { label: 'Just to sleep — I’ll be out enjoying the ship', scores: { interior: 2, oceanview: 1 } },
        { label: 'Relaxing there during the day sounds nice too', scores: { oceanview: 2, balcony: 1 } },
        { label: 'I want it to feel like a proper retreat', scores: { balcony: 2, suite: 1 } },
      ],
    },
    {
      text: 'How do you feel about natural light and a view?',
      options: [
        { label: 'Don’t need it, I won’t notice', scores: { interior: 2 } },
        { label: 'I’d like a real window at least', scores: { oceanview: 2 } },
        { label: 'I want to step outside for fresh air', scores: { balcony: 2, suite: 1 } },
      ],
    },
    {
      text: 'What’s your budget priority?',
      options: [
        { label: 'Keep it as affordable as possible', scores: { interior: 2 } },
        { label: 'A good balance of value and comfort', scores: { oceanview: 1, balcony: 1 } },
        { label: 'Happy to pay more for the right cabin', scores: { balcony: 1, suite: 2 } },
      ],
    },
    {
      text: 'Who’s cruising?',
      options: [
        { label: 'Solo, or I just don’t need much space', scores: { interior: 1, oceanview: 1 } },
        { label: 'A couple wanting a bit of romance', scores: { balcony: 2 } },
        { label: 'Family or group wanting real space', scores: { suite: 2 } },
      ],
    },
  ],
  results: {
    interior: {
      name: 'Interior',
      price: '$',
      summary: 'No window — fully enclosed, usually toward the middle of the ship. Some newer ships add a screen showing a live outside view ("virtual balcony").',
      size: 'Typically 120–185 sq ft',
    },
    oceanview: {
      name: 'Oceanview',
      price: '$$',
      summary: 'A real window or porthole, but no door — you can’t step outside. Natural light without balcony prices.',
      size: 'Typically 150–200 sq ft',
    },
    balcony: {
      name: 'Balcony',
      price: '$$$',
      summary: 'A private outdoor space, usually with two chairs and a small table. The most popular category for a reason.',
      size: 'Typically 175–250 sq ft, plus balcony',
    },
    suite: {
      name: 'Suite',
      price: '$$$$',
      summary: 'Significantly more space, often a separate bedroom or lounge, and a bigger balcony. Worth reading the Cabin Guide’s line-by-line breakdown — a "suite" varies hugely by line.',
      size: 'Typically 300 sq ft and up',
    },
  },
};

// General reference only — package names, inclusions and prices change often
// and vary by ship, sailing length and promotion. Always confirm current
// details directly with the line before booking.
const DRINKS_PACKAGES = {
  cunard: {
    tiers: [
      {
        name: 'Beverage Collection',
        price: '~$63–95/person/day',
        includes: 'Drinks up to $13.50/serving, plus unlimited soda, juice, coffee and water. Capped at 15 alcoholic drinks per 24 hours.',
      },
      {
        name: 'Premium Beverage Collection',
        price: '~$77–108/person/day',
        includes: 'Same as the Beverage Collection, with the per-drink cap raised to $20.',
      },
    ],
    note: "Cunard's 15% bar service charge is built into the package price. The separate daily Hotel & Dining Service Charge (~$17–19/day) is not included.",
  },
  'royal-caribbean': {
    tiers: [
      {
        name: 'Deluxe Beverage Package',
        price: '~$70–110/person/day',
        includes: 'Beer, wine, cocktails and spirits up to $14/drink, plus specialty coffee, smoothies, juice and bottled water.',
      },
      {
        name: 'Refreshment Package',
        price: 'Non-alcoholic',
        includes: 'Specialty coffee, smoothies, juice and soda — no alcohol.',
      },
    ],
    note: 'An 18% gratuity is added at purchase. As of August 2025, every adult sharing a cabin must buy the package if one does — no exemptions.',
  },
  celebrity: {
    tiers: [
      {
        name: 'Classic Package',
        price: '~$89–109/person/day',
        includes: 'Standard beer, wine, cocktails and spirits up to a lower price cap, plus coffee and juice.',
      },
      {
        name: 'Premium Package',
        price: '~$109–149/person/day',
        includes: 'Wider selection and a higher per-drink cap than Classic.',
      },
    ],
    note: 'A 20% gratuity is added on top of the package price. All adults in a cabin must buy the same package.',
  },
  princess: {
    tiers: [
      {
        name: 'Princess Plus',
        price: '~$65–70/person/day',
        includes: 'Drinks up to $15/drink — bundled with Wi-Fi and other fare perks, not sold as a drinks-only package.',
      },
      {
        name: 'Princess Premier',
        price: '~$100–105/person/day',
        includes: 'Drinks up to $20/drink, unlimited specialty coffee/tea and up to 12 bottled waters a day, plus Wi-Fi and dining perks bundled in.',
      },
    ],
    note: '18% beverage gratuity is included in the price. Only the first two guests in a stateroom must both buy the package.',
  },
  msc: {
    tiers: [
      {
        name: 'Premium Extra',
        price: 'Roughly $50–105/person/day',
        includes: 'Broad range of alcoholic and non-alcoholic drinks, cocktails, wine, beer and spirits.',
      },
    ],
    note: 'Gratuity is included in the price, but MSC no longer publishes a fixed rate — pricing swings widely by promotion, so check your MyMSC account before booking. Everyone at the same table, including minors via a separate Minors Package, must buy matching packages.',
  },
  'holland-america': {
    tiers: [
      {
        name: 'Signature',
        price: '~$56/person/day',
        includes: 'Beer, spirits, cocktails and wine up to $12/drink. 15-drink daily limit.',
      },
      {
        name: 'Elite',
        price: '~$61/person/day',
        includes: 'Same as Signature, with the per-drink cap raised to $16.',
      },
    ],
    note: 'A 20% service charge is added on top of these prices. All adults in the same stateroom must buy the same package.',
  },
  regent: {
    included: true,
    note: "Regent's all-inclusive fare covers unlimited beverages — including top-shelf spirits, wine and beer — in every bar, lounge and restaurant. Gratuities are included too; no tipping expected.",
  },
  silversea: {
    included: true,
    note: "Silversea's all-inclusive fare covers wine, spirits, champagne, beer and a daily-restocked in-suite bar. Gratuities are included too; no tipping expected.",
  },
  oceania: {
    tiers: [
      {
        name: 'House Select',
        price: '~$40/person/day',
        includes: 'Wine, champagne and beer by the glass at lunch and dinner.',
      },
      {
        name: 'Prestige Select',
        price: '~$60–70/person/day',
        includes: 'Unlimited alcoholic and non-alcoholic drinks, any time, any venue.',
      },
    ],
    note: "Gratuity is included in both packages. Oceania's included-fare program (currently \"Your World Included\") has changed name and terms several times recently — confirm exactly what's bundled before booking.",
  },
  ncl: {
    tiers: [
      {
        name: 'Premium Beverage Package',
        price: '~$109/person/day before gratuity',
        includes: "Drinks up to $15/drink — often bundled into NCL's \"Free at Sea\" promotions.",
      },
      {
        name: 'Premium Plus',
        price: '+~$29/person/day upgrade',
        includes: 'Wider top-shelf selection above the Premium package.',
      },
    ],
    note: 'A 20% gratuity is added on top of the package price. Every qualifying guest in the stateroom must buy a matching package.',
  },
  disney: {
    noPackage: true,
    note: "Disney doesn't sell an unlimited drinks package. Soda, juice, coffee and tea are free and unlimited at drink stations and in the dining rooms — unusually generous compared to other lines — but alcohol is pay-as-you-go, with optional discounted wine and beer-mug bundles.",
  },
  viking: {
    tiers: [
      {
        name: 'Silver Spirits',
        price: '~$27/person/day',
        includes: 'Any drink up to $18 — wine, cocktails, spirits — any time, anywhere on the ship, plus event pairings and tasting discounts.',
      },
    ],
    note: 'House beer, wine and soft drinks are already included with lunch and dinner as standard, along with all-day coffee and tea — Silver Spirits is only for anytime, premium drinking. Both guests in a cabin must buy it, for the full cruise, non-refundable.',
  },
  'po-cruises': {
    tiers: [
      {
        name: 'Classic',
        price: '~£50–55/person/day',
        includes: 'Most alcoholic and soft drinks, cocktails up to about £8.50.',
      },
      {
        name: 'Deluxe',
        price: '~£60/person/day',
        includes: 'Same as Classic, plus premium/top-shelf brands.',
      },
    ],
    note: "P&O has no separate service charge — gratuities are already built into the fare and drink prices, and tipping isn't expected onboard.",
  },
};

