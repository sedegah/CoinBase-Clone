import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  getProfile,
  loginRequest,
  registerRequest,
  refreshTokenRequest
} from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  token: 'crypto_app_token',
  refresh: 'crypto_app_refresh',
  user: 'crypto_app_user'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isTokenExpired = (tokenValue) => {
    if (!tokenValue) return true;

    try {
      const decoded = jwtDecode(tokenValue);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = localStorage.getItem(STORAGE_KEYS.token);
      const storedUser = localStorage.getItem(STORAGE_KEYS.user);

      if (storedToken && !isTokenExpired(storedToken)) {
        setToken(storedToken);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          try {
            const profileResponse = await getProfile(storedToken);
            if (profileResponse?.success) {
              setUser(profileResponse.user);
              localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profileResponse.user));
            }
          } catch (error) {
            console.error('Unable to refresh profile:', error);
          }
        }
      } else {
        localStorage.removeItem(STORAGE_KEYS.token);
        localStorage.removeItem(STORAGE_KEYS.user);
        localStorage.removeItem(STORAGE_KEYS.refresh);
      }

      setIsLoading(false);
    };

    loadAuth();
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await loginRequest(email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.user));
      localStorage.setItem(STORAGE_KEYS.token, response.token);
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.refresh, response.refreshToken);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    try {
      const response = await registerRequest(name, email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.user));
      localStorage.setItem(STORAGE_KEYS.token, response.token);
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.refresh, response.refreshToken);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.refresh);
  };

  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem(STORAGE_KEYS.refresh);
    if (!refreshTokenValue) {
      logout();
      return { success: false, error: 'No refresh token available' };
    }

    try {
      const response = await refreshTokenRequest(refreshTokenValue);
      setToken(response.token);
      localStorage.setItem(STORAGE_KEYS.token, response.token);
      return { success: true };
    } catch (error) {
      logout();
      return { success: false, error: error.message || 'Token refresh failed' };
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
    isAuthenticated: !!token && !isTokenExpired(token)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
