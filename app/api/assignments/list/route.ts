import { NextRequest, NextResponse } from 'next/server';
import { listAssignmentsForCiudadano } from '@/lib/models/ciudadanoAssignments';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ciudadanoId = searchParams.get('ciudadanoId');
    if (!ciudadanoId) {
      return NextResponse.json({ error: 'Missing ciudadanoId' }, { status: 400 });
    }
    const assignments = listAssignmentsForCiudadano(Number(ciudadanoId));
    return NextResponse.json({ assignments });
  } catch (error) {
    console.log('[API/assignments/list] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
