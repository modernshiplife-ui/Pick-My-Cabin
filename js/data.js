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

const SHIPS = [
  { id: 'queen-mary-2', lineId: 'cunard', name: 'Queen Mary 2' },
  { id: 'queen-victoria', lineId: 'cunard', name: 'Queen Victoria' },
  { id: 'queen-elizabeth', lineId: 'cunard', name: 'Queen Elizabeth' },
  { id: 'queen-anne', lineId: 'cunard', name: 'Queen Anne' },
  { id: 'icon-of-the-seas', lineId: 'royal-caribbean', name: 'Icon of the Seas' },
  { id: 'wonder-of-the-seas', lineId: 'royal-caribbean', name: 'Wonder of the Seas' },
  { id: 'symphony-of-the-seas', lineId: 'royal-caribbean', name: 'Symphony of the Seas' },
  { id: 'celebrity-beyond', lineId: 'celebrity', name: 'Celebrity Beyond' },
  { id: 'celebrity-edge', lineId: 'celebrity', name: 'Celebrity Edge' },
  { id: 'sun-princess', lineId: 'princess', name: 'Sun Princess' },
  { id: 'discovery-princess', lineId: 'princess', name: 'Discovery Princess' },
  { id: 'msc-world-europa', lineId: 'msc', name: 'MSC World Europa' },
  { id: 'msc-seascape', lineId: 'msc', name: 'MSC Seascape' },
  { id: 'rotterdam', lineId: 'holland-america', name: 'Rotterdam' },
  { id: 'nieuw-statendam', lineId: 'holland-america', name: 'Nieuw Statendam' },
  { id: 'seven-seas-grandeur', lineId: 'regent', name: 'Seven Seas Grandeur' },
  { id: 'seven-seas-splendor', lineId: 'regent', name: 'Seven Seas Splendor' },
  { id: 'seven-seas-explorer', lineId: 'regent', name: 'Seven Seas Explorer' },
  { id: 'silver-nova', lineId: 'silversea', name: 'Silver Nova' },
  { id: 'silver-ray', lineId: 'silversea', name: 'Silver Ray' },
  { id: 'silver-moon', lineId: 'silversea', name: 'Silver Moon' },
  { id: 'oceania-vista', lineId: 'oceania', name: 'Vista' },
  { id: 'oceania-allura', lineId: 'oceania', name: 'Allura' },
  { id: 'oceania-marina', lineId: 'oceania', name: 'Marina' },
  { id: 'norwegian-prima', lineId: 'ncl', name: 'Norwegian Prima' },
  { id: 'norwegian-viva', lineId: 'ncl', name: 'Norwegian Viva' },
  { id: 'norwegian-aqua', lineId: 'ncl', name: 'Norwegian Aqua' },
  { id: 'disney-wish', lineId: 'disney', name: 'Disney Wish' },
  { id: 'disney-treasure', lineId: 'disney', name: 'Disney Treasure' },
  { id: 'disney-fantasy', lineId: 'disney', name: 'Disney Fantasy' },
  { id: 'viking-saturn', lineId: 'viking', name: 'Viking Saturn' },
  { id: 'viking-neptune', lineId: 'viking', name: 'Viking Neptune' },
  { id: 'viking-vela', lineId: 'viking', name: 'Viking Vela' },
  { id: 'iona', lineId: 'po-cruises', name: 'Iona' },
  { id: 'arvia', lineId: 'po-cruises', name: 'Arvia' },
  { id: 'britannia', lineId: 'po-cruises', name: 'Britannia' },
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

