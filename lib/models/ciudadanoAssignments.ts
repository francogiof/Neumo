import db from '../db';

// Ciudadano Assignments table model and helpers
export function initCiudadanoAssignmentsTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS ciudadano_assignments_table (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    requirement_id INTEGER NOT NULL,
    ciudadano_id INTEGER NOT NULL,
    assigned_by INTEGER NOT NULL,
    assigned_at TEXT NOT NULL,
    status TEXT NOT NULL
  )`).run();
}

export function assignRequirementToCiudadano(requirementId: number, ciudadanoId: number, assignedBy: number, assignmentType: 'real' | 'simulation' = 'real') {
  initCiudadanoAssignmentsTable();
  // Only assign if not already assigned
  const exists = db.prepare('SELECT * FROM ciudadano_assignments_table WHERE requirement_id = ? AND ciudadano_id = ?').get(requirementId, ciudadanoId);
  if (exists) {
    console.log(`[Assignment] Requirement ${requirementId} already assigned to ciudadano ${ciudadanoId}`);
    return exists;
  }
  const assignedAt = new Date().toISOString();
  db.prepare(`INSERT INTO ciudadano_assignments_table (requirement_id, ciudadano_id, assigned_by, assigned_at, status) VALUES (?, ?, ?, ?, ?)`)
    .run(requirementId, ciudadanoId, assignedBy, assignedAt, assignmentType === 'simulation' ? 'simulated' : 'assigned');
  console.log(`[Assignment] Assigned requirement ${requirementId} to ciudadano ${ciudadanoId} by user ${assignedBy} at ${assignedAt} (type: ${assignmentType})`);
  return db.prepare('SELECT * FROM ciudadano_assignments_table WHERE requirement_id = ? AND ciudadano_id = ?').get(requirementId, ciudadanoId);
}

export function listAssignmentsForCiudadano(ciudadanoId: number) {
  initCiudadanoAssignmentsTable();
  const assignments = db.prepare('SELECT * FROM ciudadano_assignments_table WHERE ciudadano_id = ?').all(ciudadanoId);
  console.log(`[Assignment] Listing assignments for ciudadano ${ciudadanoId}:`, assignments);
  return assignments;
}
