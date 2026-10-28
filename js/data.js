const BRAND = { site: 'Pick My Cabin' };

// The 21 cruise lines covered across the comparison and reference pages.
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
  { id: 'carnival', name: 'Carnival Cruise Line' },
  { id: 'virgin-voyages', name: 'Virgin Voyages' },
  { id: 'azamara', name: 'Azamara' },
  { id: 'seabourn', name: 'Seabourn' },
  { id: 'marella', name: 'Marella Cruises' },
  { id: 'fred-olsen', name: 'Fred Olsen Cruise Lines' },
  { id: 'saga', name: 'Saga Cruises' },
  { id: 'ambassador', name: 'Ambassador Cruise Line' },
];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// IDs are just the slugified ship name, used to match a typed name to a
// known ship for the deck plan search — except where names are generic
// enough to collide (e.g. Oceania's single-word ships), which get the
// line as a prefix for uniqueness.
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
  ...shipList('carnival', [
    'Carnival Elation',
    'Carnival Paradise',
    'Carnival Sunshine',
    'Carnival Sunrise',
    'Carnival Radiance',
    'Carnival Spirit',
    'Carnival Pride',
    'Carnival Legend',
    'Carnival Miracle',
    'Carnival Conquest',
    'Carnival Glory',
    'Carnival Valor',
    'Carnival Liberty',
    'Carnival Freedom',
    'Carnival Splendor',
    'Carnival Dream',
    'Carnival Magic',
    'Carnival Breeze',
    'Carnival Vista',
    'Carnival Horizon',
    'Carnival Panorama',
    'Carnival Venezia',
    'Carnival Firenze',
    'Mardi Gras',
    'Carnival Celebration',
    'Carnival Jubilee',
    'Carnival Luminosa',
    'Carnival Adventure',
    'Carnival Encounter',
  ]),
  ...shipList('virgin-voyages', ['Scarlet Lady', 'Valiant Lady', 'Resilient Lady', 'Brilliant Lady']),
  ...shipList('azamara', ['Azamara Journey', 'Azamara Quest', 'Azamara Pursuit', 'Azamara Onward']),
  ...shipList('seabourn', ['Seabourn Quest', 'Seabourn Encore', 'Seabourn Ovation', 'Seabourn Venture', 'Seabourn Pursuit']),
  ...shipList('marella', ['Marella Voyager', 'Marella Explorer', 'Marella Explorer 2', 'Marella Discovery', 'Marella Discovery 2']),
  ...shipList('fred-olsen', ['Balmoral', 'Bolette', 'Borealis']),
  ...shipList('saga', ['Spirit of Discovery', 'Spirit of Adventure']),
  ...shipList('ambassador', ['Ambience', 'Ambition', 'Renaissance']),
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
  carnival: {
    about: [
      'Carnival is the largest mainstream, value-focused cruise line in the US market — the original "Fun Ship" brand, built around high-energy entertainment, casual dress, waterparks, casinos and nightlife rather than formality. It targets first-time cruisers and budget-conscious repeat cruisers with broad affordability and an upbeat, all-American atmosphere.',
      'Cabins run Interior through Ocean View and Balcony, with themed specialty cabins layered across those categories — Family Harbor (near a family lounge), Havana (access to an adults-leaning pool/bar enclave) and Cloud 9 Spa (spa-tier finishes and access) — before topping out in named suites on the newest ships.',
    ],
    grades: [
      { name: 'Interior', tier: 'Standard', price: '$', summary: 'Windowless inside cabin, no view.', includes: 'Base fare only — full access to dining and entertainment.' },
      { name: 'Ocean View', tier: 'Standard', price: '$$', summary: 'A window or porthole, no balcony.', includes: 'Base fare, plus a view.' },
      { name: 'Havana', tier: 'Havana', price: '$$$', summary: 'Standard-size cabin with Havana décor, interior/oceanview/balcony options.', includes: 'Access to the adults-leaning Havana pool and bar enclave.' },
      { name: 'Balcony', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Base fare, plus private outdoor space.' },
      { name: 'Cloud 9 Spa', tier: 'Spa', price: '$$$', summary: 'Interior/oceanview/balcony cabin with spa-tier finishes.', includes: 'Complimentary access to the Cloud 9 Spa thermal suite.' },
      { name: 'Suite', tier: 'Suite', price: '$$$$', summary: 'Separate sitting area and a bigger balcony.', includes: 'Priority embarkation and some suite-only perks.' },
      { name: 'Excel-Class Presidential/Grand Suite', tier: 'Top Suite', price: '$$$$$', summary: 'The largest suites, on the newest ships, with multiple rooms and a huge balcony.', includes: 'Priority everything and the most premium perks on the ship.' },
    ],
  },
  'virgin-voyages': {
    about: [
      'Virgin Voyages is an adults-only (18+) lifestyle-brand cruise line — a stylish, no-kids alternative to mainstream cruising, with no formal nights, no buffet, and a late-night entertainment focus. Since an October 2025 fare overhaul ("VoyageFair Choices"), what\'s included with a cabin now depends on the fare tier (Base, Essential or Premium) chosen at booking, rather than being uniform across the ship.',
      'Standard cabins — called "staterooms" — run Insider through Sea Terrace variants, topping out in suite-level "RockStar Quarters." WiFi tier and any bar-tab credit depend on the fare tier selected, not just the cabin grade.',
    ],
    grades: [
      { name: 'Insider', tier: 'Standard', price: '$', summary: 'Windowless interior stateroom.', includes: 'WiFi per the fare tier selected; no bar tab unless Premium fare.' },
      { name: 'Sea View', tier: 'Standard', price: '$$', summary: 'A porthole or window, no balcony.', includes: 'Same fare-tier-based perks as Insider.' },
      { name: 'Sea Terrace', tier: 'Standard', price: '$$$', summary: 'A private balcony ("terrace") — the most popular category.', includes: 'Same fare-tier-based perks as other staterooms.' },
      { name: 'XL/Central Sea Terrace', tier: 'Standard+', price: '$$$$', summary: 'A larger terrace stateroom, often amidship.', includes: 'Same fare-tier-based perks, with extra space.' },
      { name: 'RockStar Quarters', tier: 'Suite', price: '$$$$$', summary: 'A suite with more living space and a bigger balcony.', includes: 'Priority embarkation, Richard\'s Rooftop access, and a stocked in-room bar on arrival.' },
      { name: 'Mega RockStar Quarters', tier: 'Suite', price: '$$$$$$', summary: 'The largest suite category, multi-room layout.', includes: 'Everything in RockStar Quarters, plus a daily bar tab, daily Thermal Suite access and a dedicated concierge.' },
    ],
  },
  azamara: {
    about: [
      'Azamara is a boutique, destination-immersion line sailing small ships (up to around 700 guests) into ports larger ships can\'t reach, with longer stays and more overnights in port than mainstream lines. Drinks, gratuities and dining are included in every fare regardless of cabin grade.',
      'The cabin hierarchy is simple: four room types — Interior, Oceanview, Veranda and Veranda Plus — plus several suite categories. Moving up the ladder mainly buys space and suite-level service, not different access to drinks or dining, which are standard fleet-wide.',
    ],
    grades: [
      { name: 'Club Interior', tier: 'Stateroom', price: '$', summary: 'Windowless inside cabin, around 158 sq ft.', includes: 'Standard drinks, gratuities and dining for every guest, regardless of grade.' },
      { name: 'Club Oceanview', tier: 'Stateroom', price: '$$', summary: 'A window or porthole, around 143 sq ft.', includes: 'Same standard inclusions as Club Interior.' },
      { name: 'Club Veranda', tier: 'Stateroom', price: '$$$', summary: 'A private balcony, around 175 sq ft plus a 40 sq ft veranda.', includes: 'Same standard inclusions, plus a balcony.' },
      { name: 'Club Veranda Plus', tier: 'Stateroom', price: '$$$$', summary: 'Same stateroom size, with a notably larger veranda.', includes: 'Same standard inclusions as Club Veranda.' },
      { name: 'Club Ocean/Continent/Spa Suite', tier: 'Suite', price: '$$$$$', summary: 'Suite-level accommodation with more space (varies by ship).', includes: 'Concierge-level service and priority amenities on top of the standard inclusions.' },
      { name: 'World Owner\'s Suite', tier: 'Suite', price: '$$$$$$', summary: 'The largest, top-of-ship suite.', includes: 'The fullest suite butler service and priority treatment fleet-wide.' },
    ],
  },
  seabourn: {
    about: [
      'Seabourn is an ultra-luxury, all-suite ocean line (plus two small expedition ships) — every accommodation is a suite with a sitting area, and service is personalised and yacht-like, with premium drinks and gratuities included in the fare throughout.',
      'The suite hierarchy runs from compact Oceanview and Veranda suites up through Penthouse-tier and owner\'s-level suites. The main differences going up are space and a private veranda — and, from Penthouse Suite upward, complimentary faster "Stream" WiFi that lower suites must pay to add.',
    ],
    grades: [
      { name: 'Oceanview Suite', tier: 'Suite', price: '$$', summary: 'The smallest category, no veranda, with an ocean-view window.', includes: 'Standard drinks, gratuities and dining, plus "Surf" WiFi (1 device); faster "Stream" WiFi costs extra.' },
      { name: 'Veranda Suite', tier: 'Suite', price: '$$$', summary: 'Around 246–302 sq ft plus a private veranda.', includes: 'Same standard inclusions as Oceanview Suite; "Stream" WiFi still costs extra.' },
      { name: 'Penthouse Suite', tier: 'Suite', price: '$$$$', summary: 'Around 449–450 sq ft plus a veranda.', includes: 'Complimentary "Stream" WiFi (4 devices) at no extra charge.' },
      { name: 'Penthouse Spa Suite', tier: 'Suite', price: '$$$$', summary: 'Similar to Penthouse Suite, with direct access to The Spa.', includes: 'Complimentary Stream WiFi, plus spa-access perks.' },
      { name: 'Signature Suite', tier: 'Suite', price: '$$$$$', summary: 'Around 534–859 sq ft, with larger living and dining space.', includes: 'Complimentary Stream WiFi and enhanced butler service.' },
      { name: 'Wintergarden/Grand/Owner\'s Suite', tier: 'Top Suite', price: '$$$$$$', summary: 'The largest suites (950+ sq ft), some with a glass-enclosed solarium.', includes: 'Full butler service, Stream WiFi, and top-priority treatment fleet-wide.' },
    ],
  },
  marella: {
    about: [
      'Marella Cruises is the cruise arm of TUI, the UK\'s biggest package-holiday operator, and it sells cruising the way TUI sells a beach holiday: flights from UK regional airports, transfers, and an all-inclusive onboard drinks and dining package are bundled into one fare, with gratuities included too. It\'s aimed at British holidaymakers who want cruising to feel like a familiar package holiday rather than a US-style à la carte cruise.',
      'Cabins run Inside, Outside, Balcony and Suite, each with standard and larger "Deluxe" variants, plus dedicated Family cabins. Suites step up through Junior Suite, the ship-specific Voyager Suite, and the top Royal Suite.',
    ],
    grades: [
      { name: 'Inside Cabin', tier: 'Standard', price: '$', summary: 'Windowless cabin, 12–16m².', includes: 'Standard fare inclusions: flights, transfers, all-inclusive drinks and dining, and gratuities.' },
      { name: 'Outside Cabin', tier: 'Standard', price: '$$', summary: 'A porthole or picture window, 14–16m², no balcony.', includes: 'Same as Inside Cabin, plus a view.' },
      { name: 'Balcony Cabin', tier: 'Standard', price: '$$$', summary: 'A private furnished balcony, 13–16m².', includes: 'Same as Inside Cabin, plus a private balcony.' },
      { name: 'Family Cabin', tier: 'Specialty', price: '$$$', summary: 'A larger inside, outside or balcony cabin sleeping up to 7.', includes: 'Same fare inclusions, sized for families.' },
      { name: 'Junior Suite', tier: 'Suite', price: '$$$$', summary: 'Around 21m² with a separate sitting area and a sofa bed.', includes: 'Same fare inclusions, plus extra space.' },
      { name: 'Voyager Suite', tier: 'Suite', price: '$$$$$', summary: '49m², themed décor, sleeps 4.', includes: 'Same fare inclusions, with significantly more space.' },
      { name: 'Royal Suite', tier: 'Top Suite', price: '$$$$$$', summary: 'Up to 94m², king bed, separate living/dining area.', includes: 'Same fare inclusions, plus top-tier space and likely priority service.' },
    ],
  },
  'fred-olsen': {
    about: [
      'Fred Olsen is a UK-based cruise line, part of Norway\'s Olsen family shipping business for five generations. It deliberately avoids the mega-ship trend, running three smaller, intimately-sized ships that can reach less-visited ports larger ships can\'t — the line\'s own pitch is "smaller is better." Since 2026, gratuities and baseline drinks with lunch and dinner are included in every fare.',
      'Cabins run Inside, Ocean View and Balcony, plus Terrace cabins (promenade-deck cabins with reserved sunbeds and a drinks cooler), before stepping up through Junior, Premier and Marquee Suites.',
    ],
    grades: [
      { name: 'Inside Cabin', tier: 'Standard', price: '$', summary: 'Around 182 sq ft, no window.', includes: 'Standard fare inclusions (gratuities and baseline drinks with meals).' },
      { name: 'Ocean View Cabin', tier: 'Standard', price: '$$', summary: 'A porthole or picture window, around 214 sq ft.', includes: 'Same as Inside Cabin, plus a sea view.' },
      { name: 'Balcony Cabin', tier: 'Standard', price: '$$$', summary: 'A private balcony.', includes: 'Same as Inside Cabin, plus a private balcony.' },
      { name: 'Terrace Cabin', tier: 'Standard+', price: '$$$', summary: 'Direct access to the Promenade deck, with reserved sunbeds.', includes: 'Same fare inclusions, plus a drinks cooler and turndown service.' },
      { name: 'Junior Suite', tier: 'Suite', price: '$$$$', summary: 'Extra living space and a larger balcony.', includes: 'Suite-level space and amenities.' },
      { name: 'Premier/Marquee Suite', tier: 'Suite', price: '$$$$$', summary: 'The largest suites, with a separate living and sleeping area and an expansive balcony.', includes: 'Premium furnishings and priority service.' },
    ],
  },
  saga: {
    about: [
      'Saga is a British cruise line built exclusively for the over-50s, running two purpose-built "boutique" ships (2019 and 2021) with a classically British, small-ship feel. Every single cabin on both ships has a private balcony, and around 20% of cabins are dedicated single cabins with no single supplement on most categories. The fare is fully all-inclusive — drinks, WiFi, gratuities, one included excursion per port, chauffeur transfers and insurance — with no tipping expected onboard.',
      'Cabins run Standard, Superior and Deluxe balcony grades, plus suites — Mid Ship, Single, Aft and Forward — each adding more space and butler service.',
    ],
    grades: [
      { name: 'Standard Balcony', tier: 'Standard', price: '$', summary: '18–20.75m² with a private balcony as standard.', includes: 'The full all-inclusive fare: drinks, WiFi, gratuities and one excursion per port.' },
      { name: 'Superior Balcony', tier: 'Standard', price: '$$', summary: 'Around 20.5m², with a larger balcony.', includes: 'Same all-inclusive fare as Standard Balcony.' },
      { name: 'Deluxe Balcony', tier: 'Standard+', price: '$$$', summary: 'Around 25.5–25.9m², with a larger balcony and a walk-in wardrobe.', includes: 'Same all-inclusive fare, on a higher deck with more space.' },
      { name: 'Mid Ship Suite', tier: 'Suite', price: '$$$$', summary: '34.7m² with a separate lounge and a bathtub.', includes: 'Butler service, an espresso machine and champagne on arrival.' },
      { name: 'Aft Suite', tier: 'Suite', price: '$$$$$', summary: '41m² with a separate living room and a double balcony.', includes: 'Butler service, fresh flowers and a minibar.' },
      { name: 'Forward Suite', tier: 'Top Suite', price: '$$$$$$', summary: 'Up to 69.8m² — the largest suite.', includes: 'Butler service, a whirlpool tub, a wine fridge and in-cabin dining.' },
    ],
  },
  ambassador: {
    about: [
      'Ambassador markets itself as "Britain\'s authentic no-fly cruise line," sailing from regional UK ports on mid-sized, older ships that create a calmer, more traditional atmosphere than mega-ships. It\'s increasingly adults-focused, moving toward a fully adults-only programme from the 2027/28 season. Fares bundle full-board dining, afternoon tea, entertainment and port taxes.',
      'Cabins run Inside, Ocean View and Balcony, before stepping up to Suite and De-Luxe Suite — each roughly 17–52m², with the higher grades adding a separate lounge area rather than a distinctly branded service tier.',
    ],
    grades: [
      { name: 'Inside Cabin', tier: 'Standard', price: '$', summary: 'Around 17–18m², no window.', includes: 'Standard fare inclusions: full-board dining, afternoon tea and entertainment.' },
      { name: 'Ocean View Cabin', tier: 'Standard', price: '$$', summary: 'Around 18–19m² with a picture window or porthole.', includes: 'Same as Inside Cabin, plus a sea view.' },
      { name: 'Balcony Cabin', tier: 'Standard', price: '$$$', summary: 'Around 21–25m² with a private balcony.', includes: 'Same as Inside Cabin, plus a private balcony.' },
      { name: 'Suite', tier: 'Suite', price: '$$$$', summary: '38m² with a separate lounge and a private balcony.', includes: 'Suite-level space and design, with some added extras varying by ship.' },
      { name: 'De-Luxe Suite', tier: 'Suite', price: '$$$$$', summary: '52m² — the largest cabin category, with a separate lounge and balcony.', includes: 'The top suite perks and the most space on the ship.' },
    ],
  },
};

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
      {
        name: 'Signature Package',
        price: '~£60/person/day',
        includes: 'UK pricing. Bundles the Beverage Collection with Essential WiFi and a dining credit (~$50 on most voyages) — see the WiFi Plans page for the connectivity side.',
      },
      {
        name: 'Premium Signature Package',
        price: '~£70/person/day',
        includes: 'UK pricing. Bundles the Premium Beverage Collection with Premium WiFi and a larger dining credit (~$80 on most voyages).',
      },
    ],
    note: "Cunard's 15% bar service charge is built into the package price. The separate daily Hotel & Dining Service Charge (~$17–19/day) is not included. The Signature packages are new for 2026, available on selected voyages from March 2026, and typically save up to 30% versus buying drinks, WiFi and dining credit separately.",
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
      {
        name: 'All-Inclusive Classic',
        price: '£49/person/day (£45/day on 15+ night cruises)',
        includes: 'Bundles the Classic Drinks Package (drinks up to £8.50) with Essential WiFi and a dining credit (£20 on 5–9 nights, £40 on 10–14, £55 on 15+) — see the WiFi Plans page for the connectivity side.',
      },
      {
        name: 'All-Inclusive Deluxe',
        price: '£59/person/day (£55/day on 15+ night cruises)',
        includes: 'Bundles the Deluxe Drinks Package (premium spirits, cocktails and craft beers up to £9.50) with Ultimate WiFi and a larger dining credit (£30 on 5–9 nights, £60 on 10–14, £80 on 15+).',
      },
    ],
    note: "P&O has no separate service charge — gratuities are already built into the fare and drink prices, and tipping isn't expected onboard. The two All-Inclusive tiers are new for sailings of 5+ nights from March 2026; both adults sharing a cabin must buy the same tier, and kids under 17 in that cabin get the Refresh soft drinks package free when they do.",
  },
  carnival: {
    tiers: [
      {
        name: 'Cheers!',
        price: '$83.94/person/day pre-cruise ($89.94 onboard)',
        includes: 'Up to 15 alcoholic drinks per day, each priced $20 or less, plus unlimited soda, specialty coffee, bottled water, juice and milkshakes. Price includes the 20% service charge.',
      },
    ],
    note: 'If one 21+ guest in a cabin buys Cheers!, every other 21+ guest in that cabin must buy it too. Carnival is reportedly moving to dynamic, sailing-by-sailing pricing for Cheers! from December 1, 2026, so this flat rate may not hold for every sailing.',
  },
  'virgin-voyages': {
    tiers: [
      {
        name: 'Bar Tab (Premium fare)',
        price: '$15/Sailor/day credit, included with a Premium fare',
        includes: 'A daily prepaid drinks credit — not an unlimited package. Base and Essential fares get no bar tab; drinks are pay-as-you-go unless credit is purchased separately.',
      },
    ],
    note: "Virgin Voyages ended its old all-inclusive-leaning drinks model on October 7, 2025 (\"VoyageFair Choices\") — what's included now depends on the fare tier chosen at booking, not just the cabin. RockStar Quarters get a stocked in-room bar on arrival; Mega RockStar Quarters get a daily bar tab. Bookings made before Oct 7, 2025 keep their original drinks-included terms.",
  },
  azamara: {
    included: true,
    note: "Every fare includes selected sparkling wine, house wines, a few beers, around 15 cocktails and 9 standard spirits, soft drinks, mocktails, specialty coffee/tea and bottled water, with no daily limit — regardless of cabin grade. As of a September 2026 overhaul, the old standalone Premium/Ultimate beverage upgrades are now only sold bundled inside the paid 'Experience More' packages (from $59/person/day), which also add WiFi and an excursion credit.",
  },
  seabourn: {
    included: true,
    note: "Premium spirits, wines, beer and champagne are included throughout the ship and in-suite, with no daily limit and no separate day-rate package to buy. Only select ultra-premium/rare wines and spirits, plus ticketed tasting events, cost extra.",
  },
  marella: {
    tiers: [
      {
        name: 'Premium All Inclusive (upgrade)',
        price: '~£90–120/week (~£12–14/person/day), best price pre-booked',
        includes: 'Upgraded cocktails and mocktails, premium gins/rums/tequilas, a wider beer/wine/whisky/brandy selection and premium Lavazza coffee. Bottled wine is not included even on this tier.',
      },
    ],
    note: "Marella's standard All Inclusive package — selected draught beer/cider, wine and Prosecco by the glass, spirits, cocktails and soft drinks — is already bundled into every fare at no extra cost; the Premium tier above is an optional upgrade to better brands, not a from-scratch purchase.",
  },
  'fred-olsen': {
    tiers: [
      {
        name: 'Premium Drinks Package',
        price: '£44/person/day (1–5 nights) down to £32/day (70+ nights); +£4/day if bought onboard',
        includes: 'Up to 15 drinks/day — the full cocktail and mocktail range, soft drinks, all branded spirits/beer/cider, wine by the glass, sherry/port/vermouth and whisky/brandy, plus discounts on bottles (25% wine, 10% champagne/dessert wine).',
      },
    ],
    note: "Since 2026, baseline house beer, wine, spirits and draught soft drinks are included with lunch and dinner on the Freedom Fare (not on the cheaper Saver Fare) — the Premium package above is an optional upgrade to anytime, full-range drinking.",
  },
  saga: {
    included: true,
    note: "Fully included in every fare, with no package to buy — selected wines at lunch and dinner, premium branded spirits, cocktails, draught beer/lager, mocktails and all soft drinks, served throughout the day. Premium wines were added as a new inclusion for the 2027 season.",
  },
  ambassador: {
    tiers: [
      {
        name: 'Premium Drinks Package',
        price: '£49.95/person/night pre-cruise (£55.95 onboard)',
        includes: 'Premium spirits and wines, selected beers/ciders, eligible cocktails, specialty coffees/teas, soft drinks, juices, mocktails and water.',
      },
      {
        name: 'Classic Drinks Package',
        price: '£42.95/person/night pre-cruise (£47.95 onboard)',
        includes: 'House wines/spirits, beers/ciders, house cocktails, soft drinks/juices/mocktails/water, plus 50% off premium items.',
      },
      {
        name: 'Non-Alcoholic Package',
        price: '£20.95/person/night pre-cruise (£22.95 onboard)',
        includes: 'Soft drinks, juices, mocktails and water.',
      },
    ],
    note: 'Gratuities are included in the price of every package above. Without a package, drinks are pay-as-you-go and a separate daily service charge applies (see the Gratuities page).',
  },
};

// General reference only — package names, inclusions and prices change often
// and vary by ship, sailing length and promotion. Always confirm current
// details directly with the line before booking.
const WIFI_PLANS = {
  cunard: {
    tiers: [
      {
        name: 'Essential Internet Plan',
        price: '~$18–22/day',
        includes: 'Browsing, email and messaging.',
      },
      {
        name: 'Premium Internet Plan',
        price: '~$24–30/day',
        includes: 'Adds streaming-capable speed for video and calls.',
      },
      {
        name: 'Signature Package',
        price: '~£60/person/day',
        includes: 'UK pricing. Bundles Essential WiFi with the Beverage Collection drinks package and a dining credit — see the Drinks Packages page for the beverage side.',
      },
      {
        name: 'Premium Signature Package',
        price: '~£70/person/day',
        includes: 'UK pricing. Bundles Premium WiFi (streaming and video calls) with the Premium Beverage Collection and a larger dining credit.',
      },
    ],
    note: 'World Club loyalty tiers get an internet credit toward a package (Gold $45, Platinum $80, Diamond $135 per person) rather than free WiFi outright. Booking for the full voyage in advance is cheaper than day rates. The Signature packages are new for 2026, available on selected voyages from March 2026.',
  },
  'royal-caribbean': {
    tiers: [
      {
        name: 'VOOM Surf',
        price: 'Lower-cost, browsing-only tier',
        includes: 'Email, messaging and web browsing — no streaming.',
      },
      {
        name: 'VOOM Surf + Stream',
        price: '~$20–29/device/day',
        includes: 'Adds streaming, video calls and social media on top of Surf.',
      },
    ],
    note: 'Sold per device, up to 4 per account. Star Class and Sky Suite guests get complimentary Surf + Stream, one device per person. Pre-booking is meaningfully cheaper than buying onboard.',
  },
  celebrity: {
    tiers: [
      {
        name: 'Basic WiFi',
        price: 'Bundled free with Always Included fares',
        includes: 'Email and light browsing — streaming and social media are blocked.',
      },
      {
        name: 'Premium WiFi',
        price: '~$27–35/device/day',
        includes: 'Streaming, video calls and social media, powered by Starlink.',
      },
    ],
    note: 'Basic WiFi is bundled into the "Always Included" fare alongside the Classic Drinks Package and gratuities — the same bundle covered on the Drinks Packages page. It\'s generally no longer sold as a standalone purchase.',
  },
  princess: {
    tiers: [
      {
        name: 'MedallionNet Classic',
        price: '~$25/device/day standalone',
        includes: 'Standard-speed WiFi, one device.',
      },
      {
        name: 'MedallionNet Max',
        price: 'Included with Princess Premier',
        includes: 'Higher-bandwidth WiFi for up to 4 devices per guest — not sold as a standalone purchase.',
      },
    ],
    note: 'Follows the same Princess Plus / Princess Premier bundles as the Drinks Packages page: Plus includes MedallionNet Classic (1 device), Premier upgrades to MedallionNet Max (4 devices).',
  },
  msc: {
    tiers: [
      {
        name: 'Browse',
        price: '~$16/person/day',
        includes: 'Email, browsing, messaging and social scrolling.',
      },
      {
        name: 'Browse & Stream',
        price: '~$21/person/day',
        includes: 'Adds video calls, streaming and social posting.',
      },
    ],
    note: 'Usually sold as a full-voyage package rather than daily, and pricing swings with promotions. Voyagers Club Blue Diamond members get one free Browse package per cruise; all members get a small discount.',
  },
  'holland-america': {
    tiers: [
      {
        name: 'Surf',
        price: '~$18–31/day',
        includes: 'Basic browsing, email and messaging.',
      },
      {
        name: 'Premium',
        price: '~$24–36/day',
        includes: 'Adds calling and video calling — still no streaming.',
      },
    ],
    note: 'Surf WiFi (1 device per guest) is included free with the "Have It All" fare bundle — the same bundle covered on the Drinks Packages page. A separate "Stream" tier also exists for full streaming; confirm current details directly with HAL.',
  },
  regent: {
    included: true,
    note: "Regent's all-inclusive fare covers unlimited Starlink WiFi — one login per suite as standard, up to 4 for Concierge Suite and above. No package to buy.",
  },
  silversea: {
    included: true,
    note: "Silversea's all-inclusive fare covers unlimited WiFi for every suite, with a faster \"Premium\" tier for higher suite categories at no extra cost. No package to buy.",
  },
  oceania: {
    tiers: [
      {
        name: 'Extra logins',
        price: '~$25/device/day',
        includes: 'Additional simultaneous logins beyond the two included as standard.',
      },
      {
        name: 'Premium streaming upgrade',
        price: '~$15–20/day',
        includes: 'Adds streaming speed on top of the included connection.',
      },
    ],
    note: 'Unlimited WiFi (2 logins per stateroom as standard) is already included free in every fare under Oceania\'s "Your World Included" pricing — these are optional paid upgrades on top of that, not a package required to get online.',
  },
  ncl: {
    tiers: [
      {
        name: 'Voyage Wi-Fi Pass',
        price: '$29.99/day',
        includes: 'Browsing, email and messaging.',
      },
      {
        name: 'Streaming Voyage Wi-Fi Pass',
        price: '$39.99/day',
        includes: 'Adds audio/video streaming and VPN access.',
      },
    ],
    note: "Free at Sea (NCL's bundled perks, covered on the Drinks Packages page) includes WiFi minutes rather than unlimited access — 75, 150 or 300 minutes per person depending on cruise length — and those minutes don't support streaming.",
  },
  disney: {
    tiers: [
      {
        name: 'Internet Package',
        price: '$30/device/day',
        includes: 'Unlimited data for browsing, social media, email and short-form video.',
      },
      {
        name: 'Internet + Streaming Package',
        price: '$49/device/day',
        includes: 'Adds full video and music streaming (Disney+, Hulu, Spotify and similar) at a faster speed.',
      },
    ],
    note: 'Priced per device rather than per person or cabin, with up to 4 devices per purchase. A 20% discount applies for buying the full voyage in advance.',
  },
  viking: {
    included: true,
    note: 'WiFi is free and unlimited for every guest, with no tiers or streaming restrictions — Viking markets this as a deliberate point of difference from other lines.',
  },
  'po-cruises': {
    tiers: [
      {
        name: 'Essential Wi-Fi',
        price: '~£14–20/day',
        includes: 'Browsing, email, social media and messaging.',
      },
      {
        name: 'Ultimate Wi-Fi',
        price: '~£20–30/day',
        includes: 'Adds streaming and voice/video calls, plus free access to The Times online.',
      },
      {
        name: 'All-Inclusive Classic',
        price: '£49/person/day (£45/day on 15+ night cruises)',
        includes: 'Bundles Essential WiFi with the Classic Drinks Package and a dining credit — see the Drinks Packages page for the beverage side.',
      },
      {
        name: 'All-Inclusive Deluxe',
        price: '£59/person/day (£55/day on 15+ night cruises)',
        includes: 'Bundles Ultimate WiFi with the Deluxe Drinks Package and a larger dining credit.',
      },
    ],
    note: 'Length-of-cruise purchase is meaningfully cheaper than paying day by day for the standalone plans. The two All-Inclusive tiers are new for sailings of 5+ nights from March 2026; both adults sharing a cabin must buy the same tier.',
  },
  carnival: {
    tiers: [
      { name: 'Social', price: '$20.40/day', includes: 'Social media and airline apps only.' },
      { name: 'Value', price: '$23.80/day', includes: 'Adds email and general web browsing.' },
      { name: 'Premium', price: '$25.50/day', includes: 'Fastest connection (up to 3x Value speed) — supports streaming video/music and video calls.' },
      { name: 'Premium Multi-Device', price: 'From $90/day pre-cruise (~$120/day onboard)', includes: 'Premium speed across up to 4 devices at once.' },
    ],
    note: 'Prices are per person/day, cheaper pre-cruise than onboard. Carnival is reportedly moving to dynamic, sailing-by-sailing pricing from December 1, 2026, so flat rates may not hold for every sailing.',
  },
  'virgin-voyages': {
    tiers: [
      { name: 'Basic WiFi (Base fare)', price: 'Included with a Base fare', includes: '1 device, throttled speed.' },
      { name: 'Classic WiFi (Essential fare)', price: 'Included with an Essential fare', includes: '1 device, standard browsing speed.' },
      { name: 'Premium WiFi (Premium fare)', price: 'Included with a Premium fare', includes: '2 devices, faster speed.' },
    ],
    note: "WiFi tier is tied to the fare chosen at booking (Base/Essential/Premium), not sold as a separate add-on. RockStar Quarters get Classic WiFi and Mega RockStar Quarters get upgraded 'Work from Sea' WiFi (2 devices) regardless of fare. Bookings made before October 7, 2025 kept Classic WiFi regardless of fare tier.",
  },
  azamara: {
    tiers: [
      { name: 'Essentials bundle', price: '$59/person/day', includes: 'Starlink Plus WiFi (1 device), bundled with a Premium beverage upgrade and a $25/day excursion credit.' },
      { name: 'Enjoyment bundle', price: '$79/person/day', includes: 'Starlink Plus WiFi (1 device), bundled with an Ultimate beverage upgrade, a $30/day excursion credit and specialty dining every 4 nights.' },
      { name: 'Indulgence bundle', price: '$99/person/day', includes: 'Starlink Plus WiFi (2 devices), bundled with an Ultimate beverage upgrade, unlimited specialty dining and a $35/day excursion credit.' },
    ],
    note: "As of a September 2026 overhaul, WiFi is only sold bundled inside these 'Experience More' packages (which also include drinks and excursion credit) rather than as a standalone purchase — we couldn't confirm whether a WiFi-only option still exists separately.",
  },
  seabourn: {
    tiers: [
      { name: '"Surf" package', price: 'Included for every guest', includes: '1 device — browsing, email and social media.' },
      { name: '"Stream" package', price: 'Free from Penthouse Suite upward; ~$20–30/person/day to upgrade from Oceanview/Veranda suites', includes: 'Up to 4 devices — video streaming, internet calling and VPN.' },
    ],
    note: 'Stream is also included free for Seabourn Club Diamond-and-above loyalty members regardless of suite. The exact Oceanview/Veranda upgrade price varies by source — confirm before quoting a client.',
  },
  marella: {
    tiers: [
      { name: 'Connect With Home', price: '£20', includes: '400MB data allowance.' },
      { name: 'Get Social', price: '£40', includes: '2,000MB data allowance.' },
      { name: 'Browsing & More', price: '£65', includes: '4,500MB data allowance.' },
      { name: 'Browsing & More Max', price: '£99', includes: '8,500MB data allowance.' },
    ],
    note: 'Sold as a data block for the whole cruise, not a daily rate — once the allowance is used up, another block must be purchased. Not included in the fare.',
  },
  'fred-olsen': {
    tiers: [
      { name: '1 day', price: '£12', includes: 'Ship-wide WiFi, single flat product (no speed tiers).' },
      { name: '7 days', price: '£63 (~£9/day)', includes: 'Same WiFi, cheaper per day the longer you buy.' },
      { name: '14+ days', price: '~£8/day (from £120 for 14 days)', includes: 'The cheapest per-day rate, for longer cruises.' },
    ],
    note: 'One WiFi product per device (switchable between devices) — there is no separate browsing-only vs streaming tier. Not included in the fare.',
  },
  saga: {
    included: true,
    note: 'Complimentary Starlink WiFi is included fleet-wide as part of the all-inclusive fare — no price, no data cap, and nothing to buy.',
  },
  ambassador: {
    tiers: [
      { name: 'Basic', price: '£8–10/day', includes: 'Email and messaging apps (WhatsApp, iMessage, Messenger) only.' },
      { name: 'Value', price: '£10–12/day', includes: 'Adds general browsing and social media (Facebook, Instagram).' },
      { name: 'Premium', price: '£15–17/day', includes: 'Adds video chat and SD (720p) streaming.' },
    ],
    note: 'Starlink-powered. Short-cruise data-cap options are also sold (1GB for £19.95, 5GB for £59.95); full-sailing packages have no stated data cap.',
  },
};

// General reference only — rates increase periodically and vary by cabin
// category and sailing. Always confirm current details directly with the
// line before booking.
const GRATUITIES = {
  cunard: {
    tiers: [
      {
        name: 'Britannia & Britannia Club',
        price: '$17.00/person/day',
        includes: 'Standard and Club cabins.',
      },
      {
        name: 'Grill Suites',
        price: '$19.00/person/day',
        includes: 'Princess Grill and Queens Grill suites.',
      },
    ],
    note: 'Automatically added to the onboard account and adjustable at Guest Services if needed. A separate 15% service charge applies to individual bar and wine purchases — package prices on the Drinks Packages page already include it.',
  },
  'royal-caribbean': {
    tiers: [
      {
        name: 'Standard cabins',
        price: '~$18–18.50/person/day',
        includes: 'Interior through Balcony cabins.',
      },
      {
        name: 'Suites',
        price: '$21.00/person/day',
        includes: 'Junior Suites and above.',
      },
    ],
    note: 'Automatically added to the SeaPass account unless prepaid, and adjustable at Guest Services. A separate 18–20% service charge applies to drinks and the Deluxe Beverage Package — see the Drinks Packages page.',
  },
  celebrity: {
    tiers: [
      {
        name: 'Inside / Oceanview / Veranda',
        price: '$19.50/person/day',
        includes: 'Standard cabin categories.',
      },
      {
        name: 'Concierge / AquaClass',
        price: '$20.50/person/day',
        includes: 'Elevated cabin categories below suite level.',
      },
      {
        name: 'The Retreat suites',
        price: '$24.50/person/day',
        includes: 'Suite-class accommodation.',
      },
    ],
    note: 'Rate increased in late July 2026. Automatically added and adjustable at Guest Services. A separate 20% service charge applies to bar drinks, beverage packages, mini-bar and spa, and 18% on specialty dining — see the Drinks Packages page.',
  },
  princess: {
    tiers: [
      {
        name: 'Standard staterooms',
        price: '$18/person/day',
        includes: 'Interior, Oceanview and Balcony.',
      },
      {
        name: 'Mini Suites / Cabanas / Reserve Collection',
        price: '$19/person/day',
        includes: '',
      },
      {
        name: 'Suites',
        price: '$20/person/day',
        includes: '',
      },
    ],
    note: 'Called "Crew Appreciation." Automatically added and adjustable at Guest Services. A separate 20% service charge applies to bar purchases, spa and the Plus/Premier beverage packages — see the Drinks Packages page.',
  },
  msc: {
    tiers: [
      {
        name: 'Standard staterooms',
        price: '$17.00/person/night',
        includes: 'Caribbean and Alaska sailings; Mediterranean/N. Europe sailings bill roughly €12/night.',
      },
      {
        name: 'MSC Yacht Club',
        price: '$23.00/person/night',
        includes: '',
      },
    ],
    note: 'Called the "Hotel Service Charge." Automatically added and typically adjustable at Guest Services. Children under 2 are exempt. Separate from beverage package pricing — see the Drinks Packages page.',
  },
  'holland-america': {
    tiers: [
      {
        name: 'Standard cabins',
        price: '$18.00/person/day',
        includes: '',
      },
      {
        name: 'Suites',
        price: '$20.00/person/day',
        includes: '',
      },
    ],
    note: 'Called "Crew Appreciation." Automatically added and adjustable at Guest Services. A separate 20% service charge applies to beverages, specialty dining cover charges and à la carte items — see the Drinks Packages page.',
  },
  regent: {
    included: true,
    note: "All standard gratuities are pre-paid and bundled into the fare, consistent with Regent's all-inclusive model.",
  },
  silversea: {
    included: true,
    note: 'Gratuities are included in the fare. The one carve-out is spa and salon services, which carry their own ~18% service charge.',
  },
  oceania: {
    included: true,
    note: 'Gratuities became fully included in the fare from January 1, 2025 under Oceania\'s "Your World Included" pricing — a change from its previous per-day charge, and a repackaging of the older "Simply MORE" bundle rather than a straightforward addition on top of it.',
  },
  ncl: {
    tiers: [
      {
        name: 'Studio / Inside / Oceanview / Balcony / Club Balcony Suite',
        price: '$20.00/person/day',
        includes: 'Applies to guests age 3 and up.',
      },
      {
        name: 'Suites / The Haven',
        price: '$25.00/person/day',
        includes: '',
      },
    ],
    note: 'Can be prepaid (fully refundable) or paid onboard; adjustable at Guest Services in person. Separate from the gratuity already built into Free at Sea drink package pricing (~$28.50–32/person/day) and the 20% service charge on individual drinks — see the Drinks Packages page.',
  },
  disney: {
    tiers: [
      {
        name: 'Standard staterooms',
        price: '$16.00/person/night',
        includes: 'Applies to all guests, including children and infants.',
      },
      {
        name: 'Concierge staterooms and suites',
        price: '$27.25/person/night',
        includes: '',
      },
    ],
    note: 'Disney describes these as optional — automatically added if not prepaid, but fully adjustable or refundable at Guest Services. A separate 15% service charge applies to bar tabs and drinks purchases.',
  },
  viking: {
    tiers: [
      {
        name: 'All guests',
        price: '$20.00/person/day',
        includes: 'Called a "hotel and dining charge" rather than a gratuity.',
      },
    ],
    note: "Not included in the base fare, despite Viking's broader all-inclusive reputation — a common point of confusion. Automatically added but described as discretionary/adjustable, and can be prepaid. A separate 15% gratuity applies to bar and beverage purchases.",
  },
  'po-cruises': {
    included: true,
    note: "P&O removed onboard gratuity charges in 2019 and folded service into the fare — guests aren't expected to tip separately. Spa treatments carry their own separate 10% service charge.",
  },
  carnival: {
    tiers: [
      { name: 'Standard staterooms', price: '$17.00/person/day', includes: "Carnival's automatic 'Sail & Sign' daily service charge." },
      { name: 'Suites', price: '$19.00/person/day', includes: 'The higher rate applied to all suite categories.' },
    ],
    note: 'Not included in the fare — automatically added to the onboard account unless prepaid, and can only be adjusted onboard. A separate 20% service charge applies to bar tabs and drinks packages. Rates effective since April 2, 2026.',
  },
  'virgin-voyages': {
    tiers: [
      { name: 'All guests', price: '~$20/Sailor/day prepaid (10% discount) or $22/day paid onboard', includes: "Shown as a separate line item at checkout, called a 'gratuity' charge." },
    ],
    note: 'No longer included by default — this changed with the October 7, 2025 fare restructure ("VoyageFair Choices"). Bookings made before that date keep gratuities bundled into the original fare. A separate 20% automatic service charge applies to individual bar and spa purchases.',
  },
  azamara: {
    included: true,
    note: 'Included in every fare — no daily service charge is added to guest accounts. Additional tipping is allowed but not expected.',
  },
  seabourn: {
    included: true,
    note: "Included in the fare — Seabourn states tipping is \"neither required nor expected,\" and no daily service charge is added.",
  },
  marella: {
    included: true,
    note: "Included in every fare — TUI's own policy states tips and service charges are built into the price, and guests aren't expected to tip unless they want to.",
  },
  'fred-olsen': {
    included: true,
    note: 'Included in both the Freedom Fare and Saver Fare for cruises departing from January 2026 onward — this is a recent policy change, so some third-party sources may still quote an old ~£5/person/day charge. Confirm current wording at the time of booking.',
  },
  saga: {
    included: true,
    note: 'Fully included in the fare — Saga runs a no-tipping-onboard policy. Only local guides/drivers on shore excursions are tipped at the guest\'s discretion, and that is not included.',
  },
  ambassador: {
    tiers: [
      { name: 'Cruises up to 14 nights', price: '£7/person/night', includes: "Ambassador's automatic daily service charge, adjustable at reception." },
      { name: 'Cruises of 15+ nights', price: '£6/person/night', includes: 'The lower per-night rate for longer sailings.' },
    ],
    note: 'Not included in the base fare. If a drinks package is purchased instead, gratuities are bundled into that package price and cannot be removed separately — see the Drinks Packages page.',
  },
};

// A dated snapshot, not a live feed — sales change constantly and often
// expire or get replaced within days or weeks. Shows both US and UK
// promotions since most lines run separate campaigns per market. Update
// asOfDate whenever this is refreshed, and always confirm the current offer
// directly with the line or a travel agent before booking.
const PROMOTIONS = {
  asOfDate: 'October 26, 2026',
  lines: {
    cunard: {
      us: {
        name: 'Fall Savings Event',
        includes: 'Up to 35% off fares with a reduced refundable deposit. Grill Suite bookings get the Hotel Charge included (~$19/person/day value). 3rd & 4th guests sail free in Inside, Oceanview and Balcony staterooms on select Queen Mary 2 and Queen Anne voyages, plus 10% off White Star Luggage Service (code CUN10).',
        window: 'Book Sept 10 – Dec 7, 2026, for voyages sailing Feb 2027 – Jan 2029.',
        restrictions: 'US/DC/Canada/Bermuda/Puerto Rico/Mexico residents; 21+; new bookings only; select voyages.',
        sourceUrl: 'https://www.cunard.com/en-us/cruise-deals/fall-savings-event',
      },
      uk: {
        name: 'Cruise Deals',
        includes: 'Flights from £199pp (incl. transfers & luggage) on selected 2027 Mediterranean voyages to meet Queen Elizabeth, plus extra onboard credit on 2027/2028 voyages booked on the Cunard Fare, and reduced 3rd/4th guest fares fleet-wide.',
        window: 'Book by 9 November 2026.',
        restrictions: 'Selected voyages only; full terms not itemized on the landing page.',
        sourceUrl: 'https://www.cunard.com/en-gb/cruise-deals',
      },
    },
    'royal-caribbean': {
      us: {
        name: 'Instant Savings',
        includes: 'Up to $800 off cruise fares, plus up to $100 off short getaways (sailings through April 2027). 3rd & 4th guests sail free on select sailings; a related offer gives 60% off the 2nd guest plus kids (12 & under) sail free.',
        window: 'Live now; the kids-sail-free tier runs Oct 6 – Nov 2, 2026 for sailings on/after Oct 7, 2026. No single fixed end date found for the overall sale.',
        restrictions: 'US/Canada/Puerto Rico/select Caribbean residents; new bookings; select sailings 3+ nights; Thanksgiving sailings excluded from kids-sail-free.',
        sourceUrl: 'https://www.royalcaribbean.com/cruise-deals',
      },
      uk: {
        name: 'Instant Savings',
        includes: 'Up to £640 off per stateroom (tiered by cabin class and sailing length) on 2027 Europe sailings departing on/after Oct 9, 2026, plus up to £75–£110 off short cruises.',
        window: 'Live now as a rolling sale — exact end date not shown on the page.',
        restrictions: 'Not combinable with Crown & Anchor Society discounts; combinable with OBC, Next Cruise, military/senior/resident discounts and promo codes.',
        sourceUrl: 'https://www.royalcaribbean.com/gbr/en/cruise-deals',
      },
    },
    celebrity: {
      us: {
        name: 'Fall Sale',
        includes: "75% off the 2nd guest's fare, plus up to $800 additional per stateroom and a $100 bonus on select Europe sailings (tiered $150–$800 by cabin class and sailing length). Additional guests sail free on select sailings.",
        window: 'Live now — framed as limited-time with a countdown timer, no fixed end date shown.',
        restrictions: 'Select sailings 3+ nights worldwide; excludes Galapagos and Celebrity River Cruises.',
        sourceUrl: 'https://www.celebritycruises.com/cruise-deals/special-offers',
      },
      uk: {
        name: 'Autumn Sale',
        includes: 'Up to 35% off 1st & 2nd guest fares, plus up to £550 additional per room and up to £200 off Europe flights on select 2027 sailings (tiered £100–£550 by cabin class).',
        window: 'Live now — countdown-timer driven, no fixed end date shown.',
        restrictions: 'Must book in GBP/EUR via UK/Irish channels; 3rd/4th guests at reduced, not free, rates on select sailings.',
        sourceUrl: 'https://www.celebritycruises.com/gb/cruise-deals/special-offers',
      },
    },
    princess: {
      us: {
        name: 'Fall Savings Sale',
        includes: 'Up to 45% off fares, up to $450 instant savings per stateroom (reportedly an extra $200 boost for balconies), $99 deposits, and free 3rd & 4th guests on select sailings.',
        window: 'Oct 13 – Nov 5, 2026.',
        restrictions: 'Select sailings/categories; discount applies to Launch Fare only, excludes required fees and government taxes.',
        sourceUrl: 'https://www.princess.com/cruise-deals-promotions/limited-time-offer',
      },
      uk: {
        name: 'Spooky Savings This Halloween',
        includes: 'Up to £250pp off flights, plus up to $500 per room onboard spend on cruises sailing from Southampton (onboard-spend figures shown in USD, not converted to GBP, on the UK site).',
        window: 'Book by 2 November 2026.',
        restrictions: 'Not itemized on the landing page beyond "select sailings."',
        sourceUrl: 'https://www.princess.com/en-uk/cruise-deals-promotions',
      },
    },
    msc: {
      us: {
        name: 'Up to 35% Off Cruises + Kids Sail Free',
        includes: '1st & 2nd guest fares up to 35% off; kids 17 and under sail free as 3rd/4th guest (taxes/fees still apply). Voyagers Club Classic+ members can stack the standard 5% club discount.',
        window: "This specific dated instance runs Oct 20 – Oct 26, 2026 (today) — MSC renews this offer under the same name/URL on a near-continuous weekly basis, so it's very likely to continue under new dates, but that isn't confirmed past today.",
        restrictions: 'US residents only; new bookings; not combinable with other promotions or group bookings; MSC Yacht Club excluded.',
        sourceUrl: 'https://www.msccruisesusa.com/cruise-deals/up-to-35-off-plus-kids-sail-free',
      },
      uk: {
        notFound: true,
        checkUrl: 'https://www.msccruises.co.uk/deals',
      },
    },
    'holland-america': {
      us: {
        name: 'Have It All Early Booking Bonus™',
        includes: '$99pp deposit on select 2027 Europe, Alaska or Canada & New England sailings, bundled with up to $300 shore excursion credit, three nights specialty dining, the Elite Beverage Package (up to 15 drinks/day, up to $16 each), Premium WiFi and prepaid Crew Appreciation — cited as 60%+ savings vs. buying separately.',
        window: 'Ends November 2, 2026 (reservation deadline for 2027 sailings).',
        restrictions: 'Select Europe/Alaska/Canada & New England itineraries, 2027 departures only.',
        sourceUrl: 'https://www.hollandamerica.com/en/us/cruise-deals/have-it-all-early-booking-bonus',
      },
      uk: {
        name: 'Have It All Early Booking Bonus™',
        includes: 'Same package as the US version (same Nov 2 deadline, same perks), with the deposit localized to £99pp — but the onboard credit and shore excursion credit are still shown as "up to US$300" each, not converted to GBP.',
        window: 'Ends Monday, 2 November 2026.',
        restrictions: 'Same as US — select 2027 Europe/Alaska/Canada & New England sailings.',
        sourceUrl: 'https://www.hollandamerica.com/en/us/cruise-deals',
      },
    },
    regent: {
      us: {
        notFound: true,
        checkUrl: 'https://www.rssc.com/specials',
      },
      uk: {
        name: 'The 2027 Europe Edition',
        includes: 'Free 2-category suite upgrade plus up to 25% off select 2027 European sailings and suite categories, fleet-wide.',
        window: 'Reportedly ends October 31, 2026, though that exact date could not be confirmed directly on the page itself.',
        restrictions: 'Select voyages/suite categories only; full terms not extractable.',
        sourceUrl: 'https://www.rssc.com/specials',
      },
    },
    silversea: {
      us: {
        name: 'Extra Savings — Two Weeks Only',
        includes: 'Extra savings of approximately $5,000–$6,000 per suite (exact figure varies by source; not independently confirmed on a US-rendered page) on select suites worldwide, with reduced deposits from 15%.',
        window: 'Reserve by November 2, 2026.',
        restrictions: 'Select voyages worldwide; ceiling varies by suite category.',
        sourceUrl: 'https://www.silversea.com/best-luxury-cruise-deals.html',
      },
      uk: {
        name: 'Extra Savings — Two Weeks Only',
        includes: 'Extra savings of up to £4,800 on select suites worldwide, with reduced deposits from 15%. Separately: a Venetian Society referral credit (£350 per suite referred, up to £1,400 per booking), 25% off single supplements on select voyages, and an additional 5% off for Venetian Society members.',
        window: 'Reserve by November 2, 2026.',
        restrictions: 'Select voyages worldwide; suite-category dependent.',
        sourceUrl: 'https://www.silversea.com/offers.html',
      },
    },
    oceania: {
      us: {
        name: 'Exceptional Savings',
        includes: 'Up to 50% off select cruises, plus the standing "Your World Included®" bundle (specialty dining, gratuities, WiFi and a choice of a drinks package or shore excursion credit, included as standard). A related "Caribbean Winter Escape" tile adds a $250 shipboard credit.',
        window: 'No explicit end date shown on the offer tiles.',
        restrictions: 'Suite/itinerary dependent.',
        sourceUrl: 'https://www.oceaniacruises.com/special-offers',
      },
      uk: { sameAsUs: true },
    },
    ncl: {
      us: {
        name: 'Free at Sea™',
        includes: "Unlimited open bar (premium spirits, ~$28.50/pp/day value), 20% off wine/champagne bottles, specialty dining (1–4 meals by voyage length), 150 minutes of WiFi per stateroom, and a $50-per-port shore excursion credit (first guest only). NCL cites this as worth over $2,000 in savings. Available fleetwide for sailings from Feb 1, 2026.",
        window: 'Standing/evergreen package, not a dated sale — no fixed expiration.',
        restrictions: 'Beverage package excluded on sailings under 5 nights and charter sailings; shore excursion credit is first guest only.',
        sourceUrl: 'https://www.ncl.com/cruise-deals/free-at-sea',
      },
      uk: { sameAsUs: true },
    },
    disney: {
      us: {
        notFound: true,
        checkUrl: 'https://disneycruise.disney.go.com/special-offers/',
      },
      uk: {
        notFound: true,
        checkUrl: 'https://www.disneyholidays.co.uk/disney-cruise-line/disney-deals/',
      },
    },
    viking: {
      us: {
        name: 'Viking Fall Sale',
        includes: 'Free roundtrip airfare from select US gateways (incl. transfers and air taxes) plus a $25 deposit, across River, Ocean, Expedition and World Cruise categories. The World Cruise tier adds free Business Class airfare, shore excursion credit, shipboard credit and a complimentary Silver Spirits beverage package, with a reduced 10% deposit.',
        window: 'Bookings made Oct 1 – 31, 2026.',
        restrictions: 'Air offer is roundtrip only, from select US gateways.',
        sourceUrl: 'https://www.vikingcruises.com/oceans/promotions.html',
      },
      uk: {
        name: 'October Offer — Free Drinks Package',
        includes: 'A complimentary beverage package added free on 2027–2029 sailings. Applied automatically online; phone bookings should quote "October offer."',
        window: 'Bookings made Oct 1 – 31, 2026.',
        restrictions: 'Excludes Egypt itineraries.',
        sourceUrl: 'https://www.vikingcruises.co.uk/oceans/promotions.html',
      },
    },
    'po-cruises': {
      uk: {
        name: 'On-Board Spending Money On Us',
        includes: 'Up to £350 onboard spending money per cabin on new Select Price bookings (e.g. 2 adults sharing a Balcony cabin, 14-night cruise departing after April 2027 — amount varies by cabin grade/duration/date). Applies to the first two guests in the cabin only.',
        window: 'Bookings made 4 March – 17 December 2026, for sailings departing 6 March 2026 – 30 March 2028.',
        restrictions: 'Excludes Inside cabins under 7 nights, Inside cabins on World Cruises/Classic Southern Hemisphere Journeys/Exotic fly-cruises, Early Saver fares and other promotional prices.',
        sourceUrl: 'https://www.pocruises.com/deals/on-board-spending-money-on-us',
      },
      // No `us` entry — P&O has no meaningful US market presence.
    },
    carnival: {
      us: {
        name: 'Get Ahead & Save / Kids Sail Free',
        includes: 'Up to 40% off cruise rates with a reduced deposit from $50pp, a free room-location upgrade and up to $50 onboard credit per stateroom (Get Ahead & Save); separately, free fare for a 3rd/4th guest plus up to $250 onboard credit and $49 deposits (Kids Sail Free).',
        window: 'Stated end date Oct 26, 2026 — this is today, so it may have already rolled over to a new offer. Re-check before quoting.',
        restrictions: 'Get Ahead & Save covers sailings through April 2029; Kids Sail Free covers sailings through December 2027.',
        sourceUrl: 'https://www.carnival.com/cruise-deals',
      },
      uk: {
        notFound: true,
        checkUrl: 'https://www.carnival.co.uk/cruise-deals.aspx',
      },
    },
    'virgin-voyages': {
      us: {
        name: 'Instant Savings + 70% Off 2nd Sailor',
        includes: 'Up to $1,000 instant savings (varies by cabin/voyage length) plus 70% off a second Sailor.',
        window: 'Bookings Sept 1 – Nov 2, 2026, for sail dates Sept 2026 – Oct 2028.',
        restrictions: '',
        sourceUrl: 'https://www.virginvoyages.com/cruise-deals',
      },
      uk: {
        name: 'Instant Savings + 70% Off 2nd Sailor',
        includes: 'Same offer as the US, shown in GBP: up to £750 instant savings plus 70% off a second Sailor.',
        window: 'Bookings Sept 1 – Nov 2, 2026, for sail dates Sept 2026 – Oct 2028.',
        restrictions: '',
        sourceUrl: 'https://www.virginvoyages.com/cruise-deals',
      },
    },
    azamara: {
      us: {
        name: 'Make More of Every Journey',
        includes: 'Up to $750 onboard credit per stateroom, tiered by cabin type and cruise length.',
        window: 'Bookings Oct 1 – Dec 4, 2026, for sailings departing Nov 7, 2026 onward.',
        restrictions: '',
        sourceUrl: 'https://www.azamara.com/deals',
      },
      uk: {
        notFound: true,
        checkUrl: 'https://www.azamara.com/deals',
      },
    },
    seabourn: {
      us: {
        name: 'Explore Beyond Event',
        includes: 'Up to $2,000 shipboard credit per suite (Oceanview/Veranda get $500/suite; Penthouse-and-above get $2,000/suite).',
        window: 'Bookings Sept 23 – Nov 16, 2026, for sailings across 2026–2029.',
        restrictions: '',
        sourceUrl: 'https://www.seabourn.com',
      },
      uk: { sameAsUs: true },
    },
    marella: {
      uk: {
        name: 'Low Deposit Offer',
        includes: '£125pp first-stage deposit on new bookings. A separate rolling "Cruise of the Week" mechanic also takes an extra £100 off a different sailing each week.',
        window: 'For sailings departing 1 November 2026 – 30 April 2027.',
        restrictions: '',
        sourceUrl: 'https://www.tui.co.uk/cruise/deals',
      },
      // No `us` entry — Marella has no US market.
    },
    'fred-olsen': {
      uk: {
        name: 'Freedom Fare Price Promise',
        includes: 'If your Freedom Fare price drops after booking, Fred Olsen upgrades your cabin or gives onboard credit instead.',
        window: 'Live until 4 November 2026.',
        restrictions: 'Tied to newly-released sailings.',
        sourceUrl: 'https://www.fredolsencruises.com',
      },
      // No `us` entry — Fred Olsen has no US market.
    },
    saga: {
      uk: {
        name: 'Save With Our Special Offers',
        includes: 'Up to 30% off selected 2026/27 sailings (some marketing cites up to 35% on specific grades/dates).',
        window: 'No fixed end date published — described as "limited time" and "limited availability."',
        restrictions: '',
        sourceUrl: 'https://travel.saga.co.uk/cruises/ocean/ocean-cruise-deals.aspx',
      },
      // No `us` entry — Saga Ocean Cruises has no US market.
    },
    ambassador: {
      uk: {
        name: 'Up to £800 Onboard Credit',
        includes: 'Onboard credit for new bookings on Ambience or Ambition, amount varying by duration and cabin (some sailings reported up to £1,000); solo travellers get 50%. Usable on spa, excursions and specialty dining, not the casino.',
        window: 'Reported as 30 July – 23 November 2026 — reconfirm the live dates before quoting, as this page rotates frequently.',
        restrictions: '',
        sourceUrl: 'https://www.ambassadorcruiseline.com/deals/up-to-800-onboard-credit/',
      },
      // No `us` entry — Ambassador has no US market.
    },
  },
};

