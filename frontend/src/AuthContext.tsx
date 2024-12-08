import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import api from './api/api';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api.get('profile/').then(() => {
      setIsAuthenticated(true);
    }).catch(() => {
      setIsAuthenticated(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
