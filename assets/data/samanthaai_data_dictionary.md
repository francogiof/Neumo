# SamanthaAI — Data Dictionary

Este documento define la estructura y lógica de la base de datos que impulsa la plataforma científica de predicción y alertas de calidad de aire en Arequipa, Perú, con roles de ciudadano e institución.

---

## Tabla: `user_roles`
**Propósito:** Mapeo central de identidad y autenticación usando StackAuth.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `user_id` | INT PK | ID interno único asignado a cada usuario. |
| `stack_auth_id` | VARCHAR | ID externo usado por StackAuth para login. |
| `role` | ENUM('ciudadano', 'institucion') | Determina el dashboard y permisos del usuario. |

**Lógica:**
- Tras el login, se crea una entrada en `ciudadano_table` o `institucion_table` según el rol.

---

## Tabla: `ciudadano_table`
**Propósito:** Contiene todos los datos relevantes del ciudadano para predicción y alertas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `ciudadano_id` | INT PK | Identificador único de ciudadano. |
| `user_id` | INT FK | Referencia a `user_roles.user_id`. |
| `nombre`, `edad`, `ubicacion`, `contacto` | Various | Información básica del ciudadano. |
| `historial_alertas`, `preferencias` | TEXT | Datos adicionales para personalización. |

---

## Tabla: `institucion_table`
**Propósito:** Contiene los datos de las instituciones que gestionan alertas y reportes.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `institucion_id` | INT PK | Identificador único de institución. |
| `user_id` | INT FK | Referencia a `user_roles.user_id`. |
| `nombre`, `ubicacion`, `contacto` | Various | Información básica de la institución. |
| `tipo`, `notas` | TEXT | Información contextual de la institución. |

---

## Tabla: `ciudadano_status_table`
**Propósito:** Rastrea el estado del proceso para cada ciudadano en cada predicción/alerta.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `status_id`, `ciudadano_id`, `requirement_id`, `current_step`, `status` |

---

## Relación ciudadano-institución
**Propósito:** Relaciona ciudadanos con instituciones para gestión colaborativa de alertas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id`, `ciudadanoStackAuthId`, `institucionStackAuthId` |

---

## Ejemplo de migración de tablas y campos
- Todos los campos y tablas que antes usaban `candidate` o `team_leader` ahora usan `ciudadano` e `institucion`.
- Los endpoints y lógica de frontend/backend han sido adaptados para reflejar estos cambios.

---

## Notas
- El sistema ahora está orientado a la predicción y monitoreo científico de calidad de aire, con roles de ciudadano e institución.
- Se recomienda revisar los scripts SQL y CSV para asegurar la migración completa de los nombres de campos y tablas.

