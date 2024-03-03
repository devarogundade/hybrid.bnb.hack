import { getBalance, readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { abi as wrappedBnbAbi } from './wrapped-bnb-abi';
import { abi as simpleSwapAbi } from './simple-swap-abi';
import { config } from './config';

const wrappedBnbId: `0x${string}` = '0x89063ACC735dEF9Ec9706f5d5a69D4ADf4213158';
const simpleSwapId: `0x${string}` = '0x3b2190CFf9c0171C3e0464bBFe3D559Aa9827C3F';

export async function tryAllowance(address: `0x${string}`) {
    try {
        return await readContract(config, {
            abi: wrappedBnbAbi,
            address: wrappedBnbId,
            functionName: 'allowance',
            args: [address, simpleSwapId]
        });
    } catch (error) {
        console.log(error);

        return 0;
    }
}

export async function tryApprove(amount: string) {
    try {
        const result = await writeContract(config, {
            abi: wrappedBnbAbi,
            address: wrappedBnbId,
            functionName: 'approve',
            args: [simpleSwapId, BigInt(amount)]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function tryMint(amount: string) {
    try {
        const result = await writeContract(config, {
            abi: wrappedBnbAbi,
            address: wrappedBnbId,
            functionName: 'faucet',
            args: [BigInt(amount)]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function tryBuy(amount: string) {
    try {
        const result = await writeContract(config, {
            abi: simpleSwapAbi,
            address: simpleSwapId,
            functionName: 'buy',
            value: BigInt(amount)
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function trySell(amount: string) {
    try {
        const result = await writeContract(config, {
            abi: simpleSwapAbi,
            address: simpleSwapId,
            functionName: 'sell',
            args: [BigInt(amount)]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function tryNativeBalance(address: `0x${string}`) {
    try {
        const balanceInfo = await getBalance(config, {
            address: address
        });

        return balanceInfo.value;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export async function tryTokenBalance(address: `0x${string}`, tokenId?: string) {
    try {
        const balanceInfo = await getBalance(config, {
            address: address,
            token: wrappedBnbId
        });

        return balanceInfo.value;
    } catch (error) {
        console.log(error);
        return 0;
    }
}