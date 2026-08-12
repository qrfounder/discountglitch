import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "visitors.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS visitors (
    id TEXT PRIMARY KEY,
    ip TEXT,
    city TEXT,
    region TEXT,
    country TEXT,
    user_agent TEXT,
    device TEXT,
    browser TEXT,
    os TEXT,
    referrer TEXT,
    path TEXT,
    page_views INTEGER NOT NULL DEFAULT 0,
    cta_clicked INTEGER NOT NULL DEFAULT 0,
    email TEXT,
    age INTEGER,
    first_seen TEXT NOT NULL,
    last_seen TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen DESC);
  CREATE INDEX IF NOT EXISTS idx_visitors_cta ON visitors(cta_clicked);
`);

function ensureColumn(name, type) {
  const cols = db.prepare("PRAGMA table_info(visitors)").all();
  if (!cols.some((c) => c.name === name)) {
    db.exec(`ALTER TABLE visitors ADD COLUMN ${name} ${type}`);
  }
}

ensureColumn("email", "TEXT");
ensureColumn("age", "INTEGER");

export default db;
