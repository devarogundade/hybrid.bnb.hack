export enum ApprovalStatus {
    ACCEPTED,
    REJECTED,
    PENDING,
    DEFAULT
}

export enum AssetType {
    ERC36,
    ERC754
}

export interface EthAccount {
    address: string;
    privateKey: string;
}

export interface Bind {
    owner: string;
    signer: string;
    privateKey: string;
    emailId: string;
    timestamp: number;
}

export interface SignedMessage {
    messageHash?: string;
    v?: string;
    r?: string;
    s?: string;
}

export interface BindRequest {
    owner: string;
    emailId: string;
    deviceToken?: string;
}

export interface UnBindRequest {
    owner: string;
}

export interface UnBindConfirmation {
    owner: string;
    code: string;
    expires?: number;
}

export interface ApprovalRequest {
    approvalId: string;
    status: ApprovalStatus;
    spender: string;
    owner: string;
    value: string;
    assetType: AssetType;
    timestamp: number;
}

export interface ApprovalConfirmation {
    approvalId: string;
    code: string;
}