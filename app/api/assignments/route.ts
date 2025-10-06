import { NextRequest, NextResponse } from 'next/server';
import { assignRequirementToCiudadano } from '@/lib/models/ciudadanoAssignments';

export async function POST(req: NextRequest) {
  try {
    const { requirementId, ciudadanoId, assignedBy, assignmentType } = await req.json();
    if (!requirementId || !ciudadanoId || !assignedBy) {
      return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }
    const assignment = assignRequirementToCiudadano(requirementId, ciudadanoId, assignedBy, assignmentType || 'real');
    return NextResponse.json({ assignment });
  } catch (error) {
    console.log('[API/assignments] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
