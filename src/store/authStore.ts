import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock user for demonstration
const mockUser: User = {
  id: '1',
  email: 'analyst@ubs.com',
  name: 'João Silva',
  role: 'analyst',
  createdAt: new Date(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication
        if (email === 'analyst@ubs.com' && password === 'ubs123') {
          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
