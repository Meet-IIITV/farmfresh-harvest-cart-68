
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'customer' | 'farmer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Customer',
    email: 'customer@example.com',
    role: 'customer'
  },
  {
    id: '2',
    name: 'Jane Farmer',
    email: 'farmer@example.com',
    role: 'farmer'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('farmFreshUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, you would make an API call to verify credentials
    const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('farmFreshUser', JSON.stringify(foundUser));
      
      // Redirect based on role
      if (role === 'farmer') {
        navigate('/farmers');
      } else {
        navigate('/');
      }
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, you would make an API call to create a new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role
    };
    
    // Add to mock users array
    MOCK_USERS.push(newUser);
    
    // Set as current user
    setUser(newUser);
    localStorage.setItem('farmFreshUser', JSON.stringify(newUser));
    
    // Redirect based on role
    if (role === 'farmer') {
      navigate('/farmers');
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmFreshUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
