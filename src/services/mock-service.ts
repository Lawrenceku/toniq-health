import { User } from '@/store/useAuthStore';

// --- Mock Data Constants ---

export const MOCK_USER: User = {
    id: 'user_chioma_123',
    phoneNumber: '+2348012345678',
    name: 'Chioma',
    walletAddress: '0x1234...5678',
    worldIdVerified: true,
    plan: 'premium',
    insuranceCreditScore: 680,
};

export const MOCK_TRANSACTIONS = [
    { id: 'tx_1', title: 'Paid Premium', amount: -1000, date: '2023-10-25', status: 'success' },
    { id: 'tx_2', title: 'Malaria Treatment', amount: -15000, date: '2023-10-20', status: 'success', covered: true },
    { id: 'tx_3', title: 'Rebate Received', amount: 250, date: '2023-10-15', status: 'success' },
];

export const MOCK_LOAN_STATUS = {
    cardA: 'Active',
    cardB: 'Locked',
};

// --- Storage Keys ---
const STORAGE_KEYS = {
    CLAIM_PAID: 'toniq_demo_claim_paid',
    CREDIT_SCORE: 'toniq_demo_credit_score',
    BALANCE: 'toniq_demo_wallet_balance',
};

// --- Mock Service Class ---

class MockService {
    private simulateDelay(ms: number = 500) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // User Data
    async getUser(): Promise<User> {
        await this.simulateDelay();
        // Check if we have dynamic updates in local storage (for demo continuity)
        const storedScore = localStorage.getItem(STORAGE_KEYS.CREDIT_SCORE);
        const score = storedScore ? parseInt(storedScore) : MOCK_USER.insuranceCreditScore;

        return { ...MOCK_USER, insuranceCreditScore: score };
    }

    async getTransactions() {
        await this.simulateDelay();
        return MOCK_TRANSACTIONS;
    }

    async getBalance() {
        await this.simulateDelay();
        const storedBalance = localStorage.getItem(STORAGE_KEYS.BALANCE);
        return storedBalance ? parseInt(storedBalance) : 45000;
    }

    async addFunds(amount: number) {
        await this.simulateDelay(1000);
        const current = await this.getBalance();
        const newBalance = current + amount;
        localStorage.setItem(STORAGE_KEYS.BALANCE, newBalance.toString());
        return { success: true, newBalance };
    }

    // Hospital Portal Flows
    async verifyCoverage(qrToken: string) {
        await this.simulateDelay(2000); // Simulate network/zkp proof
        return { verified: true, plan: 'Active Coverage' };
    }

    async submitClaim(claimDetails: { diagnosis: string; cost: number }) {
        // 1. AI Analyzing
        await this.simulateDelay(2000);

        // 2. Smart Contract Trigger
        // In a real app we'd wait for tx hash, here we just wait
        await this.simulateDelay(2000);

        // 3. Trigger Cross-App Effects
        this.triggerClaimPaidEffect(claimDetails.cost);

        return { success: true, paymentId: 'pay_xyz_789', status: 'FUNDS RECEIVED' };
    }

    // Cross-Tab Communication Helper
    private triggerClaimPaidEffect(amount: number) {
        // 1. Update shared balance
        const currentBalance = 45000; // Mock starting balance logic
        const storedBalance = localStorage.getItem(STORAGE_KEYS.BALANCE);
        const base = storedBalance ? parseInt(storedBalance) : currentBalance;
        localStorage.setItem(STORAGE_KEYS.BALANCE, (base + amount).toString());

        // 2. Update shared Credit Score (680 -> 690)
        localStorage.setItem(STORAGE_KEYS.CREDIT_SCORE, '690');

        // 3. Dispatch Event for other tabs
        // We set a 'timestamp' to ensure the event is unique and triggers 'storage' listeners
        localStorage.setItem(STORAGE_KEYS.CLAIM_PAID, Date.now().toString());
    }

    // Reset Demo State
    resetDemo() {
        localStorage.removeItem(STORAGE_KEYS.CLAIM_PAID);
        localStorage.removeItem(STORAGE_KEYS.CREDIT_SCORE);
        localStorage.removeItem(STORAGE_KEYS.BALANCE);
    }
}

export const mockService = new MockService();
