import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import Cookies from 'js-cookie';
// Define the shape of the context

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface UserDetails {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
interface AuthContextType {
  user: UserDetails | undefined;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  getCurrentLoginUser: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetails>();

  const login = async (username: string, password: string) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(true);
        Cookies.set('accessToken', data.accessToken, { expires: 1 / 24 });
        Cookies.set('refreshToken', data.refreshToken, { expires: 1 / 24 });
        getCurrentLoginUser();
      })
      .catch((error) => {
        throw error;
      });
  };

  // Register method
  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
      } else {
        throw new Error(data.error || 'Registration failed.');
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  const getCurrentLoginUser = async () => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        setUser(data);
      } else {
        setIsAuthenticated(false);
        setUser(undefined);
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      login,
      register,
      user,
      getCurrentLoginUser,
    }),
    [
      isAuthenticated,
      setIsAuthenticated,
      login,
      register,
      user,
      getCurrentLoginUser,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
