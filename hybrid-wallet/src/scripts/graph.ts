import axios from 'axios';
import { Status } from './../types';
import type { Approval } from "@/types";

const endPoint = 'https://api.thegraph.com/subgraphs/name/devarogundade/hybrid';

export async function allApprovals(owner: string): Promise<Approval[]> {
    const response = await axios.post(endPoint,
        {
            query: `{
                approvalRequesteds(where: {owner: "${owner}"}, orderBy: blockTimestamp, orderDirection: desc) {
                    id
                    approvalId
                    assetId
                    owner
                    spender
                    value
                }
            }`
        }
    );

    return response.data.data.approvalRequesteds;
}

export async function getApproval(approvalId: string): Promise<Approval | null> {
    const response = await axios.post(endPoint,
        {
            query: `{
                approvalRequested(id: ${approvalId}) {
                    id
                    approvalId
                    assetId
                    owner
                    spender
                    value
                }
            }`
        }
    );

    return response.data.data.approvalRequested;
}

export async function allApprovalsOf(owner: string, status: Status): Promise<Approval[]> {
    const response = await axios.post(endPoint,
        {
            query: `{
                approvalRequesteds(where: {owner: "${owner}", status: ${status}}, orderBy: blockTimestamp, orderDirection: desc) {
                    id
                    approvalId
                    assetId
                    owner
                    spender
                    value
                }
            }`
        }
    );

    return response.data.data.approvalRequesteds;
}
