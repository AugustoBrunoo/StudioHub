import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole, AuthState } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const mockUsersByRole: Record<UserRole, User> = {
  admin: {
    id: 'usr_admin_1',
    name: 'Augusto Bruno (Admin)',
    email: 'admin@studiohub.com',
    role: 'admin',
    status: 'active',
    studioName: 'StudioHub Global HQ',
    createdAt: '2024-01-15',
  },
  studio_manager: {
    id: 'usr_manager_1',
    name: 'Mariana Silva (Gestora)',
    email: 'mariana@soundstudio.com',
    role: 'studio_manager',
    status: 'active',
    studioName: 'Acoustic Sound Labs',
    createdAt: '2024-02-10',
  },
  creator: {
    id: 'usr_creator_1',
    name: 'Lucas Ferreira (Produtor)',
    email: 'lucas@beatmaker.io',
    role: 'creator',
    status: 'active',
    studioName: 'BeatLab Pro',
    createdAt: '2024-03-01',
  },
  client: {
    id: 'usr_client_1',
    name: 'Camila Rocha (Cliente)',
    email: 'camila@empresa.com.br',
    role: 'client',
    status: 'active',
    createdAt: '2024-04-20',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'studiohub_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : mockUsersByRole.admin;
    } catch {
      return mockUsersByRole.admin;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>('mock-jwt-token-active');

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, role: UserRole = 'creator') => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 400));
    const selectedUser = {
      ...mockUsersByRole[role],
      email: email || mockUsersByRole[role].email,
    };
    setUser(selectedUser);
    setToken('mock-jwt-token-active');
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const switchRole = (newRole: UserRole) => {
    const updatedUser = mockUsersByRole[newRole];
    setUser(updatedUser);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        token,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
