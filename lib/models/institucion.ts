import db from '../db';

// Institución table model and helpers
export function initInstitucionTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS institucion_table (
    institucion_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    department TEXT,
    notes TEXT
  )`).run();
}

export function getInstitucionByUserId(userId: number) {
  initInstitucionTable();
  return db.prepare('SELECT * FROM institucion_table WHERE user_id = ?').get(userId);
}

export function createInstitucionProfile(userId: number) {
  initInstitucionTable();
  // Only create if not exists
  const exists = getInstitucionByUserId(userId);
  if (exists) return exists;
  db.prepare(`INSERT INTO institucion_table (user_id) VALUES (?)`).run(userId);
  return getInstitucionByUserId(userId);
}
