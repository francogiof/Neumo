import { NextRequest, NextResponse } from 'next/server';
import { submitProject, listSubmissionsForCiudadano, updateSubmissionScore, canSubmitProject } from '@/lib/models/userProjectSubmission';

export async function POST(req: NextRequest) {
  try {
    const { ciudadanoId, requirementId, submissionLink } = await req.json();
    if (!ciudadanoId || !requirementId || !submissionLink) {
      return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }
    // Step progression: Only allow if ciudadano puede enviar
    if (!canSubmitProject(ciudadanoId)) {
      return NextResponse.json({ error: 'No puede enviar proyecto aún' }, { status: 403 });
    }
    const submission = submitProject(ciudadanoId, requirementId, submissionLink);
    return NextResponse.json({ submission });
  } catch (error) {
    console.log('[API/project-submission] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ciudadanoId = searchParams.get('ciudadanoId');
    if (!ciudadanoId) {
      return NextResponse.json({ error: 'Missing ciudadanoId' }, { status: 400 });
    }
    const submissions = listSubmissionsForCiudadano(Number(ciudadanoId));
    return NextResponse.json({ submissions });
  } catch (error) {
    console.log('[API/project-submission] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
