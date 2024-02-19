export interface Approval {
    sequence: number;
    assetId: string;
    approvalId: string;
    owner: string;
    spender: string;
    value: string;
    status: Status;
}

export interface BindWallet {
    owner: string;
    signer: string;
}

export enum Status {
    ACCEPTED,
    REJECTED,
    PENDING,
    DEFAULT
}