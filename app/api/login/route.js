import { NextResponse } from 'next/server';
import { createSessionResponse } from '@/lib/auth/session';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Log environment and request details
    console.log('API_URL:', process.env.API_URL);
    console.log('Making request to:', process.env.API_URL + '/api/login');

    // Forward the request to the backend
    const backendResponse = await fetch(process.env.API_URL + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log('Backend response status:', backendResponse.status);
    console.log('Backend response ok:', backendResponse.ok);

    const data = await backendResponse.json();
    console.log('Backend response data:', data);

    // If the backend request failed, return the error
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || data.non_field_errors?.[0] || 'Login failed' },
        { status: backendResponse.status }
      );
    }

    // Create response with secure session cookie
    const response = NextResponse.json(
      { 
        message: data.message,
        user: data.user,
        success: true
      }, 
      { status: 200 }
    );

    // Set secure HTTP-only cookie with the token
    return createSessionResponse(response, data.token);

  } catch (error) {
    console.error('Login API error:', error);
    console.error('Error details:', {
      message: error.message,
      cause: error.cause,
      stack: error.stack
    });
    
    // Check if it's a network error
    if (error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Unable to connect to authentication server. Please try again later.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
