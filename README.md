# Toniq-Health MVP

Affordable blockchain health insurance for Nigeria. Built with Next.js 15, Wagmi, and Shadcn/UI.

## Features
- **Instant Onboarding**: Login with Phone + World ID Verification (Mock).
- **Flexible Payments**: Pay with Monnify (Fiat/USSD) or Crypto (USDT/cUSD).
- **Play-to-Earn**: Earn $HEALTH tokens by taking health quizzes and uploading checkups.
- **Loans**: Access low-interest loans based on your On-chain Credit Score.
- **DAO**: Vote on catastrophic claims and manage the community treasury.

## Quick Start
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Open**: [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)
This repo is ready for one-click deployment to Vercel.
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Set Environment Variables (Optional for MVP Mocks):
    - `NEXT_PUBLIC_WALLET_CONNECT_ID`
    - `MONNIFY_API_KEY`

## Deployment (Mobile - Expo)
To wrap this for Android:
1.  Use Capacitor or Expo with `react-native-webview`.
2.  Point the WebView to your Vercel URL.
3.  Build using EAS Build.

## Localization
- Toggle between English, Hausa, Yoruba, and Igbo in the dashboard header.

## Mock Data Info
- **World ID**: Click "Verify" in onboarding to simulate success.
- **Payments**: Click "Transfer" or "Card" to simulate 2s processing.
- **AI Claims**: Amounts > ₦50,000 are auto-flagged for Admin review.

## Architecture
- `src/features`: Feature-based modular architecture.
- `src/store`: Global Zustand state.
- `src/lib/wagmi.ts`: Web3 configuration (Polygon/Celo support).
