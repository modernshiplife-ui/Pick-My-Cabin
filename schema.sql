CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  ship_id TEXT NOT NULL,
  cabin TEXT NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('up', 'down')),
  tags TEXT NOT NULL DEFAULT '[]',
  comment TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'Anonymous',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_ship ON reviews(ship_id);
