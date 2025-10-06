import { getUserRole } from './userRole';
import { createCiudadanoProfile } from './ciudadano';
import { createInstitucionProfile } from './institucion';

/**
 * Ensures that a ciudadano or institucion profile exists for the user, based on their role.
 * Idempotent: will not create duplicate profiles.
 * @param userId - The numeric user_id (from user_roles/ciudadano_table/institucion_table)
 * @param stackAuthId - The Stack Auth ID (from user_roles)
 * @returns The created or existing profile, or null if no action taken
 */
export function autoCreateProfileForRole(userId: number, stackAuthId: string) {
  const userRole = getUserRole(stackAuthId);
  if (!userRole) return null;
  if (userRole.role === 'ciudadano') {
    return createCiudadanoProfile(userId);
  } else if (userRole.role === 'institucion') {
    return createInstitucionProfile(userId);
  }
  return null;
}
