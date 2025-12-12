import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserPlan = 'basic' | 'standard' | 'premium';

export interface User {
    id: string;
    phoneNumber: string;
    name?: string;
    walletAddress?: string;
    worldIdVerified?: boolean;
    plan?: UserPlan;
    familyMembers?: string[]; // IDs of family members
    insuranceCreditScore?: number;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User) => void;
    updateUser: (updates: Partial<User>) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            login: (userData) => set({ user: userData, isAuthenticated: true }),
            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'toniq-auth-storage',
        }
    )
);
