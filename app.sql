-- PostgreSQL schema for Neumo (converted from SQLite)
-- Run this on a new RDS PostgreSQL database to create tables.

-- Note: adjust OWNER / SCHEMA as needed for your RDS instance.

-- Users (ciudadano / institucion)
CREATE TABLE usuario_ciudadano (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fecha_registro TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE usuario_institucion (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  tipo_institucion TEXT,
  fecha_registro TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL
);

INSERT INTO roles (nombre) VALUES ('ciudadano'), ('institucion') ON CONFLICT DO NOTHING;

-- Company table
CREATE TABLE IF NOT EXISTS company_table (
  company_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  website TEXT,
  location TEXT
);

-- Requirements / Candidates (minimal columns inferred)
CREATE TABLE IF NOT EXISTS requirements_table (
  requirement_id TEXT PRIMARY KEY,
  role_name TEXT NOT NULL,
  responsibilities TEXT,
  required_skills TEXT,
  experience_required_years INTEGER,
  company_id TEXT,
  creator_user_id TEXT
);

CREATE TABLE IF NOT EXISTS candidate_table (
  candidate_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  experience_years INTEGER,
  education TEXT,
  personal_projects TEXT,
  introduction TEXT,
  cv_experience TEXT,
  user_id TEXT
);

-- Screening questions / answers
CREATE TABLE IF NOT EXISTS screening_questions_table (
  screening_question_id TEXT PRIMARY KEY,
  requirement_id TEXT NOT NULL,
  question TEXT NOT NULL,
  type TEXT NOT NULL,
  CONSTRAINT fk_screening_requirement FOREIGN KEY (requirement_id) REFERENCES requirements_table(requirement_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS screening_answers_table (
  answer_id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  screening_question_id TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  score TEXT,
  feedback TEXT,
  CONSTRAINT fk_screening_answer_candidate FOREIGN KEY (candidate_id) REFERENCES candidate_table(candidate_id) ON DELETE CASCADE,
  CONSTRAINT fk_screening_answer_question FOREIGN KEY (screening_question_id) REFERENCES screening_questions_table(screening_question_id) ON DELETE CASCADE
);

-- Behavioral
CREATE TABLE IF NOT EXISTS behavioral_questions_table (
  behavioral_question_id TEXT PRIMARY KEY,
  requirement_id TEXT NOT NULL,
  question TEXT NOT NULL,
  CONSTRAINT fk_behavioral_requirement FOREIGN KEY (requirement_id) REFERENCES requirements_table(requirement_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS behavioral_answers_table (
  answer_id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  behavioral_question_id TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  score TEXT,
  feedback TEXT,
  CONSTRAINT fk_behavioral_answer_candidate FOREIGN KEY (candidate_id) REFERENCES candidate_table(candidate_id) ON DELETE CASCADE,
  CONSTRAINT fk_behavioral_answer_question FOREIGN KEY (behavioral_question_id) REFERENCES behavioral_questions_table(behavioral_question_id) ON DELETE CASCADE
);

-- Technical
CREATE TABLE IF NOT EXISTS technical_questions_table (
  technical_question_id TEXT PRIMARY KEY,
  requirement_id TEXT NOT NULL,
  question TEXT NOT NULL,
  ideal_answer TEXT NOT NULL,
  CONSTRAINT fk_technical_requirement FOREIGN KEY (requirement_id) REFERENCES requirements_table(requirement_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS technical_answers_table (
  answer_id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  technical_question_id TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  score TEXT,
  feedback TEXT,
  CONSTRAINT fk_technical_answer_candidate FOREIGN KEY (candidate_id) REFERENCES candidate_table(candidate_id) ON DELETE CASCADE,
  CONSTRAINT fk_technical_answer_question FOREIGN KEY (technical_question_id) REFERENCES technical_questions_table(technical_question_id) ON DELETE CASCADE
);

-- Context requirements
CREATE TABLE IF NOT EXISTS context_requirements_table (
  context_id TEXT PRIMARY KEY,
  requirement_id TEXT NOT NULL,
  salary_range TEXT,
  contract_type TEXT,
  start_date DATE,
  schedule TEXT,
  extra_notes TEXT,
  exclusion_criteria TEXT,
  CONSTRAINT fk_context_requirement FOREIGN KEY (requirement_id) REFERENCES requirements_table(requirement_id) ON DELETE CASCADE
);

-- Candidate status
CREATE TABLE IF NOT EXISTS candidate_status_table (
  status_id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  requirement_id TEXT NOT NULL,
  current_step TEXT NOT NULL,
  status TEXT NOT NULL,
  CONSTRAINT fk_candidate_status_candidate FOREIGN KEY (candidate_id) REFERENCES candidate_table(candidate_id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate_status_requirement FOREIGN KEY (requirement_id) REFERENCES requirements_table(requirement_id) ON DELETE CASCADE
);

-- Screening interview steps
CREATE TABLE IF NOT EXISTS screening_interview_steps (
  step_id TEXT PRIMARY KEY,
  requirement_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  type TEXT NOT NULL,
  focus TEXT,
  includes TEXT,
  text TEXT NOT NULL,
  notes TEXT,
  fallback_if_missing TEXT,
  CONSTRAINT fk_steps_requirement FOREIGN KEY (requirement_id) REFERENCES requirements_table(requirement_id) ON DELETE CASCADE,
  CONSTRAINT fk_steps_candidate FOREIGN KEY (candidate_id) REFERENCES candidate_table(candidate_id) ON DELETE CASCADE
);

-- Simple data seed examples (optional)
-- INSERT INTO roles (nombre) VALUES ('ciudadano'), ('institucion');

-- End of schema
