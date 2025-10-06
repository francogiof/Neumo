import { NextRequest, NextResponse } from 'next/server';
import { getCiudadanosForInstitucion } from '@/lib/models/ciudadanoInstitucion';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institucionStackAuthId = searchParams.get('institucionStackAuthId');
    if (!institucionStackAuthId) {
      return NextResponse.json({ error: 'Missing institucionStackAuthId' }, { status: 400 });
    }
    const ciudadanos = getCiudadanosForInstitucion(institucionStackAuthId);
    return NextResponse.json({ ciudadanos });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
