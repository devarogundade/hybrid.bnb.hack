import { getToken, readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { abi as hybridAbi } from './hybrid-abi';
import { abi as hybridTokenAbi } from './hybrid-token-abi';
import { config } from './config';

const contractId: `0x${string}` = '0xf3D893bD37fEA163F43A4D84144DC84Ea5b71f1F';

export function isEOA(address: string | null): boolean {
    return (address != null && address != '0x0000000000000000000000000000000000000000');
}

export function splitSignedHash(hex: string) {
    console.log(hex);
    const json: string = Buffer.from(hex, 'hex').toString('utf-8');

    const object = JSON.parse(json);

    return {
        messageHash: object.messageHash,
        v: object.v,
        r: object.r,
        s: object.s
    };
}

export function getTokens() {
    const json = localStorage.getItem('assets') || JSON.stringify([]);
    return JSON.parse(json);
}

export function saveToken(tokenInfo: any) {
    let json = localStorage.getItem('assets');

    if (json) {
        const assets = JSON.parse(json);
        assets.push(tokenInfo);
        json = JSON.stringify(assets);
    } else {
        json = JSON.stringify([tokenInfo]);
    }

    localStorage.setItem('assets', json);
}

export async function upgradeAsset(token: `0x${string}`) {
    try {
        const result = await writeContract(config, {
            abi: hybridTokenAbi,
            address: token,
            functionName: 'upgradeAsset'
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function readToken(token: `0x${string}`) {
    try {
        const info = await getToken(config, { address: token });
        return { address: token, name: info.name, symbol: info.symbol };
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function optIn(token: `0x${string}`) {
    try {
        const result = await writeContract(config, {
            abi: hybridTokenAbi,
            address: token,
            functionName: 'optIn'
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function approve(token: `0x${string}`, spender: `0x${string}`, amount: bigint) {
    try {
        const result = await writeContract(config, {
            abi: hybridTokenAbi,
            address: token,
            functionName: 'approve',
            args: [spender, amount],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
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

export async function unBindWallet(
    messageHash: `0x${string}`,
    v: number,
    r: `0x${string}`,
    s: `0x${string}`,
    owner: `0x${string}`
): Promise<string | null> {
    try {
        const result = await writeContract(config, {
            abi: hybridAbi,
            address: contractId,
            functionName: 'onWalletUnBind',
            args: [messageHash, v, r, s, owner],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function downgradeAsset(
    messageHash: `0x${string}`,
    v: number,
    r: `0x${string}`,
    s: `0x${string}`,
    token: `0x${string}`
): Promise<string | null> {
    try {
        const result = await writeContract(config, {
            abi: hybridTokenAbi,
            address: token,
            functionName: 'submitDowngradeProof',
            args: [messageHash, v, r, s],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function submitApprovalProof(
    approvalId: `0x${string}`,
    messageHash: `0x${string}`,
    v: number,
    r: `0x${string}`,
    s: `0x${string}`,
    token: `0x${string}`
): Promise<string | null> {
    try {
        const result = await writeContract(config, {
            abi: hybridTokenAbi,
            address: token,
            functionName: 'submitApprovalProof',
            args: [approvalId, messageHash, v, r, s],
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