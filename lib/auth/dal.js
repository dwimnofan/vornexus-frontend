import 'server-only';
import { cache } from 'react';
import { getSession } from './session';
import { redirect } from 'next/navigation';

export const verifySession = cache(async () => {
  const token = await getSession();
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(process.env.API_URL + '/api/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const userData = await response.json();
    
    return {
      isAuth: true,
      user: userData.user,
      token: token,
    };
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
});

export const getUser = cache(async () => {
  const session = await verifySession();
  
  if (!session) {
    return null;
  }

  try {
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
});

export const requireAuth = cache(async () => {
  const session = await verifySession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
});

export const checkUserRole = cache(async (requiredRole) => {
  const session = await verifySession();
  
  if (!session) {
    return false;
  }
  
  return session.user.role === requiredRole;
}); 