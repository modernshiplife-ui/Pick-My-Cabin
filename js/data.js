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

// Example reviews so the layout has something to show before real ones
// come in. Clearly marked as examples in the UI — not real traveller data.
const DEMO_REVIEWS = [
  {
    id: 'demo-1',
    shipId: 'queen-mary-2',
    cabin: '8156',
    rating: 'up',
    tags: ['Quiet', 'Great view'],
    comment: 'Really quiet at night and the view over the wake was incredible.',
    author: 'M. Ellis',
    when: 'March 2026',
    demo: true,
  },
  {
    id: 'demo-2',
    shipId: 'queen-victoria',
    cabin: '5023',
    rating: 'down',
    tags: ['Noisy', 'Close to lifts'],
    comment: 'Right by the lift lobby — heard doors banging most nights.',
    author: 'R. Okafor',
    when: 'January 2026',
    demo: true,
  },
  {
    id: 'demo-3',
    shipId: 'icon-of-the-seas',
    cabin: '12507',
    rating: 'up',
    tags: ['Spacious', 'Great view'],
    comment: 'Huge balcony, would book this exact cabin again.',
    author: 'T. Nakamura',
    when: 'February 2026',
    demo: true,
  },
  {
    id: 'demo-4',
    shipId: 'msc-world-europa',
    cabin: '9078',
    rating: 'down',
    tags: ['Obstructed view'],
    comment: 'A lifeboat blocked most of the balcony view — wish we’d known beforehand.',
    author: 'Anonymous',
    when: 'April 2026',
    demo: true,
  },
  {
    id: 'demo-5',
    shipId: 'celebrity-beyond',
    cabin: '7102',
    rating: 'up',
    tags: ['Quiet', 'Good storage'],
    comment: 'Plenty of wardrobe space and dead quiet — best cabin we’ve had.',
    author: 'S. Kowalski',
    when: 'December 2025',
    demo: true,
  },
  {
    id: 'demo-6',
    shipId: 'sun-princess',
    cabin: '4210',
    rating: 'up',
    tags: ['Great view'],
    comment: 'Sunrise side, coffee on the balcony every morning. No complaints.',
    author: 'Anonymous',
    when: 'May 2026',
    demo: true,
  },
];
