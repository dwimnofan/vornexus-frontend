// Client-side authentication utilities
export const auth = {
  // Login function
  login: async (email, password) => {
    console.log('Auth.js: Making login request...');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Auth.js: Response received:', response.status, response.ok);
    const data = await response.json();
    console.log('Auth.js: Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    console.log('Auth.js: Login successful, returning data');
    return data;
  },

  // Register function
  register: async (name, email, password) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  },

  // Logout function
  logout: async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Logout failed');
    }

    // Redirect to login page
    window.location.href = '/login';
    return data;
  },

  // Check authentication status (for client components)
  checkAuth: async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        const data = await response.json();
        return { isAuthenticated: true, user: data.user };
      }
      
      return { isAuthenticated: false, user: null };
    } catch (error) {
      console.error('Auth check failed:', error);
      return { isAuthenticated: false, user: null };
    }
  },

  // Make authenticated requests
  makeAuthenticatedRequest: async (url, options = {}) => {
    const defaultOptions = {
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    // If unauthorized, redirect to login
    if (response.status === 401) {
      window.location.href = '/login';
      return null;
    }

    return response;
  },
}; 