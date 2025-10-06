import db from '../db';

export type CiudadanoInstitucion = {
  id: number;
  ciudadanoStackAuthId: string;
  institucionStackAuthId: string;
};

export function initCiudadanoInstitucionTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS ciudadano_institucion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ciudadanoStackAuthId TEXT NOT NULL,
    institucionStackAuthId TEXT NOT NULL
  )`).run();
}

export function linkCiudadanoToInstitucion(ciudadanoStackAuthId: string, institucionStackAuthId: string) {
  initCiudadanoInstitucionTable();
  db.prepare(`INSERT INTO ciudadano_institucion (ciudadanoStackAuthId, institucionStackAuthId) VALUES (?, ?)`)
    .run(ciudadanoStackAuthId, institucionStackAuthId);
}

export function getCiudadanosForInstitucion(institucionStackAuthId: string): CiudadanoInstitucion[] {
  initCiudadanoInstitucionTable();
  return db.prepare('SELECT * FROM ciudadano_institucion WHERE institucionStackAuthId = ?')
    .all(institucionStackAuthId) as CiudadanoInstitucion[];
}
