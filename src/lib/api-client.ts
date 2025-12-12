import { mockService } from '@/services/mock-service';

// Simple configuration for API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

type ApiFunction<T> = () => Promise<T>;

/**
 * reliableFetch wraps an API call with a fallback to the MockService.
 * suitable for read-only or critical demo paths where we MUST show something.
 */
export async function reliableFetch<T>(
    endpoint: string,
    options: RequestInit = {},
    mockFallback: ApiFunction<T>
): Promise<T> {
    // If explicitly in "Demo Mode" (could be an env var or just default behavior for this task)
    // we might want to try fetch first, but fallback aggresively.

    try {
        // 1. Try Real Backend
        // Short timeout to assume offline quickly
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout for demo speed

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`[SafeFetch] Real API ${endpoint} failed (${response.status}), switching to mock.`);
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // 2. Fallback to Mock
        console.log(`[SafeFetch] Connection failed or timed out for ${endpoint}. Serving Mock Data.`, error);
        return await mockFallback();
    }
}

// Typed wrappers for specific domain calls
export const api = {
    user: {
        get: () => reliableFetch('/user/profile', {}, mockService.getUser.bind(mockService)),
        balance: () => reliableFetch('/user/balance', {}, mockService.getBalance.bind(mockService)),
        transactions: () => reliableFetch('/user/transactions', {}, mockService.getTransactions.bind(mockService)),
        addFunds: (amount: number) => reliableFetch('/user/funds', {
            method: 'POST',
            body: JSON.stringify({ amount })
        }, () => mockService.addFunds(amount)),
    },
    hospital: {
        verify: (token: string) => reliableFetch(`/hospital/verify`, {
            method: 'POST',
            body: JSON.stringify({ token })
        }, () => mockService.verifyCoverage(token)),

        submitClaim: (data: { diagnosis: string; cost: number }) => reliableFetch('/hospital/claims', {
            method: 'POST',
            body: JSON.stringify(data)
        }, () => mockService.submitClaim(data))
    }
};
