const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://coinbase-clone-9ssk.onrender.com';

const AUTH_BASE = `${API_BASE_URL}/api/auth`;

async function request(path, body, options = {}) {
  const response = await fetch(
    `${AUTH_BASE}${path.startsWith('/') ? path : '/' + path}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json().catch(() => ({
    error: 'Invalid JSON response'
  }));

  if (!response.ok) {
    throw new Error(data.error || 'Authentication request failed');
  }

  return data;
}

export function loginRequest(email, password) {
  return request('/login', { email, password });
}

export function registerRequest(name, email, password) {
  return request('/register', { name, email, password });
}

export function refreshTokenRequest(refreshToken) {
  return request('/refresh', { refreshToken });
}

export async function getProfile(token) {
  const response = await fetch(`${AUTH_BASE}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json().catch(() => ({
    error: 'Invalid JSON response'
  }));

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch profile');
  }

  return data;
}