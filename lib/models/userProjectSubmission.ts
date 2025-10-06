import db from '../db';
import { getScoresForCandidate } from '@/lib/models/scores';

// User Project Submission table model y helpers
export function initUserProjectSubmissionTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS user_project_submission_table (
    submission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ciudadano_id INTEGER NOT NULL,
    requirement_id INTEGER NOT NULL,
    submission_link TEXT,
    evaluation_score INTEGER,
    evaluator_feedback TEXT,
    submitted_at TEXT
  )`).run();
}

export function submitProject(ciudadanoId: number, requirementId: number, submissionLink: string) {
  initUserProjectSubmissionTable();
  // Solo una submission por ciudadano/requerimiento
  const exists = db.prepare('SELECT * FROM user_project_submission_table WHERE ciudadano_id = ? AND requirement_id = ?').get(ciudadanoId, requirementId);
  if (exists) {
    console.log(`[ProjectSubmission] Ciudadano ${ciudadanoId} ya envió para el requerimiento ${requirementId}`);
    return exists;
  }
  const submittedAt = new Date().toISOString();
  db.prepare(`INSERT INTO user_project_submission_table (ciudadano_id, requirement_id, submission_link, submitted_at) VALUES (?, ?, ?, ?)`)
    .run(ciudadanoId, requirementId, submissionLink, submittedAt);
  const inserted = db.prepare('SELECT * FROM user_project_submission_table WHERE ciudadano_id = ? AND requirement_id = ?').get(ciudadanoId, requirementId);
  console.log(`[ProjectSubmission] Ciudadano ${ciudadanoId} envió proyecto para requerimiento ${requirementId}:`, inserted);
  return inserted;
}

export function listSubmissionsForCiudadano(ciudadanoId: number) {
  initUserProjectSubmissionTable();
  const submissions = db.prepare('SELECT * FROM user_project_submission_table WHERE ciudadano_id = ?').all(ciudadanoId);
  console.log(`[ProjectSubmission] Listando submissions para ciudadano ${ciudadanoId}:`, submissions);
  return submissions;
}

export function updateSubmissionScore(submissionId: number, score: number, feedback: string) {
  initUserProjectSubmissionTable();
  db.prepare('UPDATE user_project_submission_table SET evaluation_score = ?, evaluator_feedback = ? WHERE submission_id = ?')
    .run(score, feedback, submissionId);
  const updated = db.prepare('SELECT * FROM user_project_submission_table WHERE submission_id = ?').get(submissionId);
  console.log(`[ProjectSubmission] Updated score/feedback for submission ${submissionId}:`, updated);
  return updated;
}

export function canSubmitProject(ciudadanoId: number, minScore: number = 60) {
  // Check if ciudadano's technical and behavioral scores are above threshold
  const scores: any = getScoresForCandidate(ciudadanoId);
  if (!scores) {
    console.log(`[Progression] No scores found for ciudadano ${ciudadanoId}`);
    return false;
  }
  const technical = scores.technical_score || 0;
  const behavioral = scores.behavioral_score || 0;
  const passed = technical >= minScore && behavioral >= minScore;
  console.log(`[Progression] Ciudadano ${ciudadanoId} can submit project:`, passed, scores);
  return passed;
}
