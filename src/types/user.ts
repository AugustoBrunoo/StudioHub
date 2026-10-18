export type UserRole = 'admin' | 'studio_manager' | 'creator' | 'client';

export type UserStatus = 'active' | 'pending' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  phone?: string;
  studioName?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}
