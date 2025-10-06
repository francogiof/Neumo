import db from '../db';

// Scores table model and helpers
export function initScoresTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS scores_table (
    score_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ciudadano_id INTEGER NOT NULL,
    initial_screening_score INTEGER,
    technical_score INTEGER,
    behavioral_score INTEGER,
    project_score INTEGER,
    matching_percentage INTEGER
  )`).run();
}

export function getScoresForCiudadano(ciudadanoId: number) {
  initScoresTable();
  const scores = db.prepare('SELECT * FROM scores_table WHERE ciudadano_id = ?').get(ciudadanoId);
  console.log(`[Scores] Get scores for ciudadano ${ciudadanoId}:`, scores);
  return scores;
}

export function updateScoresForCiudadano(ciudadanoId: number, updates: Partial<{ initial_screening_score: number; technical_score: number; behavioral_score: number; project_score: number; matching_percentage: number; }>) {
  initScoresTable();
  const setClauses = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updates);
  if (setClauses.length > 0) {
    db.prepare(`UPDATE scores_table SET ${setClauses} WHERE ciudadano_id = ?`).run(...values, ciudadanoId);
  }
  const updated = db.prepare('SELECT * FROM scores_table WHERE ciudadano_id = ?').get(ciudadanoId);
  console.log(`[Scores] Updated scores for ciudadano ${ciudadanoId}:`, updated);
  return updated;
}
