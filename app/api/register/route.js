import { NextResponse } from 'next/server';
import { createSessionResponse } from '@/lib/auth/session';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Log environment and request details
    console.log('Registration API_URL:', process.env.API_URL);
    console.log('Making registration request to:', process.env.API_URL + '/api/register');

    // Forward the request to the backend
    const backendResponse = await fetch(process.env.API_URL + '/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    console.log('Registration backend response status:', backendResponse.status);
    console.log('Registration backend response ok:', backendResponse.ok);

    const data = await backendResponse.json();
    console.log('Registration backend response data:', data);

    // If the backend request failed, return the error
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || data.non_field_errors?.[0] || 'Registration failed' },
        { status: backendResponse.status }
      );
    }

    // Create response with secure session cookie
    const response = NextResponse.json(
      { 
        message: data.message,
        user: data.user || { name, email },
        success: true
      }, 
      { status: 201 }
    );

    // Set secure HTTP-only cookie with the token
    return createSessionResponse(response, data.token);

  } catch (error) {
    console.error('Register API error:', error);
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