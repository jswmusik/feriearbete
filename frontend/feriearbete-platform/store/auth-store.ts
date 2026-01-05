import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'youth' | 'admin' | 'employer' | 'guardian';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  personnummer?: string; // For youth/guardian
  companyName?: string; // For employer
  
  // Youth specific data (Mocking a DB relationship)
  savedJobIds?: string[];
  appliedJobIds?: string[]; 
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  toggleSavedJob: (jobId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      toggleSavedJob: (jobId) => set((state) => {
        if (!state.user) return state;
        
        const currentSaved = state.user.savedJobIds || [];
        const isSaved = currentSaved.includes(jobId);
        
        const newSaved = isSaved 
          ? currentSaved.filter(id => id !== jobId)
          : [...currentSaved, jobId];
          
        return {
          user: { ...state.user, savedJobIds: newSaved }
        };
      }),
    }),
    {
      name: 'feriearbete-auth', // key in localStorage
    }
  )
);
