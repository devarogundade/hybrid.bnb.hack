import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { abi as hybridAbi } from './hybrid-abi';
import { config } from './config';

const contractId: `0x${string}` = '0xd15E42aeF1E2Fb06233B31Ae7E40d3f92cfEa945';

export function isEOA(address: string | null): boolean {
    return (address != null && address != '0x0000000000000000000000000000000000000000');
}

export async function bindWallet(signer: `0x${string}`): Promise<string | null> {
    try {
        const result = await writeContract(config, {
            abi: hybridAbi,
            address: contractId,
            functionName: 'walletBind',
            args: [signer],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function signerOf(owner: `0x${string}`): Promise<string | null> {
    try {
        return await readContract(config, {
            abi: hybridAbi,
            address: contractId,
            functionName: 'signerOf',
            args: [owner]
        });
    } catch (error) {
        console.log(error);

        return null;
    }
}