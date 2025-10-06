import { NextRequest, NextResponse } from 'next/server';
import { updateCiudadanoProfile } from '@/lib/models/updateCiudadano';
import { createCiudadanoProfile } from '@/lib/models/ciudadano';

export async function POST(req: NextRequest) {
  try {
    const { userId, profile } = await req.json();
    if (!userId || !profile) {
      return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }
    // Ensure ciudadano row exists
    createCiudadanoProfile(Number(userId));
    // Serialize object/array fields to JSON strings
    const serializableProfile = { ...profile };
    ['education', 'personal_projects', 'cv_experience'].forEach((key) => {
      if (serializableProfile[key] && typeof serializableProfile[key] !== 'string') {
        serializableProfile[key] = JSON.stringify(serializableProfile[key]);
      }
    });
    const updated = updateCiudadanoProfile(Number(userId), serializableProfile);
    return NextResponse.json({ updated });
  } catch (error) {
    console.log('[API/ciudadano/update] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
