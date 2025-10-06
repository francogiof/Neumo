-- Estructura y registros iniciales para neumo.db replicando la tabla user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER PRIMARY KEY,
    stack_auth_id TEXT NOT NULL,
    role TEXT NOT NULL
);

-- Registros adaptados a los nuevos roles
INSERT INTO user_roles (user_id, stack_auth_id, role) VALUES
  (25, 'b1b83b4b-d241-45eb-9f15-3cee594b31eb', 'institucion'),
  (26, '792fd445-da33-4714-a105-0816e4253cb8', 'ciudadano'),
  (27, '804d02ee-9ad3-475c-8e8c-0ce253a2c75d', 'ciudadano'),
  (28, 'ba00fb12-32f6-4d26-b803-ccbe24d7eb4b', 'institucion');
