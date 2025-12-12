import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useRealtimeSimulation } from './use-realtime-simulation';

export function useUser() {
    // Enable the real-time simulation listener
    useRealtimeSimulation();

    // 1. Fetch User Profile
    const profile = useQuery({
        queryKey: ['user', 'profile'],
        queryFn: api.user.get,
    });

    // 2. Fetch Balance (Separate to allow independent refresh)
    const balance = useQuery({
        queryKey: ['user', 'balance'],
        queryFn: api.user.balance,
        // Refetch often in demo mode or rely on invalidation? 
        // We rely on invalidation from useRealtimeSimulation
    });

    // 3. Fetch Transactions
    const transactions = useQuery({
        queryKey: ['user', 'transactions'],
        queryFn: api.user.transactions,
    });

    return {
        user: profile.data,
        balance: balance.data, // This might return a number if the API returns a number directly, or { balance: number }
        transactions: transactions.data,
        isLoading: profile.isLoading || balance.isLoading,
        isError: profile.isError || balance.isError,
    };
}
