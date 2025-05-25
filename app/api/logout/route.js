import { NextResponse } from 'next/server';
import { deleteSessionResponse } from '@/lib/auth/session';

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: 'Logged out successfully', success: true },
      { status: 200 }
    );

    return deleteSessionResponse(response);

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 