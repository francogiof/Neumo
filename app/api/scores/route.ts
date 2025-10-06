import { NextRequest, NextResponse } from 'next/server';
import { getScoresForCiudadano, updateScoresForCiudadano } from '@/lib/models/scores';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ciudadanoId = searchParams.get('ciudadanoId');
    if (!ciudadanoId) {
      return NextResponse.json({ error: 'Missing ciudadanoId' }, { status: 400 });
    }
    const scores = getScoresForCiudadano(Number(ciudadanoId));
    return NextResponse.json({ scores });
  } catch (error) {
    console.log('[API/scores] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ciudadanoId, updates } = await req.json();
    if (!ciudadanoId || !updates) {
      return NextResponse.json({ error: 'Missing input' }, { status: 400 });
    }
    const updated = updateScoresForCiudadano(Number(ciudadanoId), updates);
    return NextResponse.json({ updated });
  } catch (error) {
    console.log('[API/scores] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
