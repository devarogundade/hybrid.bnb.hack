import { getBalance, readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { abi as wrappedBnbAbi } from './wrapped-bnb-abi';
import { abi as simpleSwapAbi } from './simple-swap-abi';
import { config } from './config';

const wrappedBnbId: `0x${string}` = '0xfA1f8718658eB0aec9A9Fed5Cf9bBfEFc36347c2';
const simpleSwapId: `0x${string}` = '0x5eA8F84fB0fe4Ac908F1ed1a21814F72D39463bc';

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