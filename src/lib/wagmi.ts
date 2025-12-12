
import { http, createConfig } from 'wagmi'
import { mainnet, polygon, celo } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Ideally this should be in .env
const projectId = '3fcc6bba6f1d54ca1b280ee52d5ce648' // Public testing ID, acceptable for MVP

export const config = createConfig({
    chains: [mainnet, polygon, celo],
    connectors: [
        injected(),
        walletConnect({ projectId }),
    ],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [celo.id]: http(),
    },
})
