import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    API_URL: process.env.API_URL || 'NOT_SET',
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
} 