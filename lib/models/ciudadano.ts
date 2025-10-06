import db from '../db';

// Ciudadano table model and helpers
export function initCiudadanoTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS ciudadano_table (
    ciudadano_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    name TEXT,
    age INTEGER,
    cv_path TEXT,
    linkedin TEXT,
    github TEXT,
    experience_years INTEGER,
    education TEXT,
    personal_projects TEXT,
    introduction TEXT,
    cv_experience TEXT
  )`).run();
}

export function getCiudadanoByUserId(userId: number) {
  initCiudadanoTable();
  return db.prepare('SELECT * FROM ciudadano_table WHERE user_id = ?').get(userId);
}

export function createCiudadanoProfile(userId: number) {
  initCiudadanoTable();
  // Only create if not exists
  const exists = getCiudadanoByUserId(userId);
  if (exists) return exists;
  db.prepare(`INSERT INTO ciudadano_table (user_id) VALUES (?)`).run(userId);
  return getCiudadanoByUserId(userId);
}
