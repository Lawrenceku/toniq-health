import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const STORAGE_KEYS = {
    CLAIM_PAID: 'toniq_demo_claim_paid',
    CREDIT_SCORE: 'toniq_demo_credit_score',
    BALANCE: 'toniq_demo_wallet_balance',
};

export const useRealtimeSimulation = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_KEYS.CLAIM_PAID) {
                console.log('Realtime Simulation: Claim Paid Event Detected!');

                // Invalidate queries to force a re-fetch (which enters the MockService layer)
                // The MockService will read the *new* values from localStorage
                queryClient.invalidateQueries({ queryKey: ['user', 'balance'] });
                queryClient.invalidateQueries({ queryKey: ['user', 'transactions'] });
                queryClient.invalidateQueries({ queryKey: ['user', 'creditScore'] });
            }
        };

        // Standard storage event (works for other tabs)
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [queryClient]);
};
