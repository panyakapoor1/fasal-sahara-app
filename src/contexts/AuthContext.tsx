import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  aadhaarHash: string;
  name: string;
  phone: string;
  farmLocation: string;
  farmSize: number;
  primaryCrop: string;
  language: string;
}

interface AuthContextType {
  user: User | null;
  login: (aadhaarData: any) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('farmpredict_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (aadhaarData: any) => {
    // In production, this would handle the actual Aadhaar verification
    // For demo purposes, we create a mock user
    const mockUser: User = {
      id: 'user_' + Date.now(),
      aadhaarHash: 'hashed_' + aadhaarData.aadhaarNumber.slice(-4), // Only store hash
      name: aadhaarData.name || 'राम कुमार',
      phone: aadhaarData.phone || '+91-9876543210',
      farmLocation: aadhaarData.location || 'Village Rampur, UP',
      farmSize: aadhaarData.farmSize || 2.5,
      primaryCrop: aadhaarData.primaryCrop || 'wheat',
      language: aadhaarData.language || 'hi'
    };
    
    setUser(mockUser);
    localStorage.setItem('farmpredict_user', JSON.stringify(mockUser));
    
    // Log consent for audit trail (in production, send to backend)
    console.log('Consent logged:', {
      timestamp: new Date().toISOString(),
      aadhaarHash: mockUser.aadhaarHash,
      consentType: 'login_verification',
      ipAddress: 'masked_for_demo'
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmpredict_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('farmpredict_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};