import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import  {KeycloakProfile } from 'keycloak-js';
import keycloak from '../auth/useAuth';

interface AuthContextType {
    authenticated: boolean;
    user: KeycloakProfile | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    accountManagement: () => Promise<void>;
    register: () => Promise<void>;
  }
  
  // Define initial context state
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  // Define props for AuthProvider
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<KeycloakProfile | null>(null);
  
    useEffect(() => {
      keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        setAuthenticated(authenticated);
        if (authenticated) {
          keycloak.loadUserProfile().then(profile => {
            setUser(profile);
          });
        }
      });
    }, []);
  
    const login = () => keycloak.login();
    const logout = () => keycloak.logout();
    const accountManagement = () => keycloak.accountManagement();
    const register = () => keycloak.register();
  
    return (
      <AuthContext.Provider value={{ authenticated, user, login, logout, accountManagement, register }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };