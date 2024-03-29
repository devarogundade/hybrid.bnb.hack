import { walletConnect } from '@wagmi/connectors';
import { bscTestnet } from '@wagmi/core/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi';

export const projectId = 'c8af093fb15a6a3b6e325460f68d1587';

const metadata = {
    name: 'Hybrid App',
    description: 'Hybrid App',
    url: 'https://hybrid-app.netlify.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [bscTestnet];

export const config = defaultWagmiConfig({
    // @ts-ignore
    chains, projectId, metadata, connectors: [walletConnect({
        projectId: projectId
    })]
});