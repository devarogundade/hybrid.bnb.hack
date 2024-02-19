import axios from 'axios';
import { Status } from './../types';
import type { Approval } from "@/types";

const endPoint = 'https://api.thegraph.com/subgraphs/name/devarogundade/hybrid';

export async function allApprovals(owner: string): Promise<Approval[]> {
    const response = await axios.post(`${endPoint}`,
        {
            query: `approvalRequests(where: {owner: "${owner}"}, orderBy: blockTimestamp, orderDirection: desc) {
                id
                approvalId
                assetId
                owner
            }`
        }
    );

    return response.data.data.approvalRequests;
}

export async function getApproval(approvalId: string): Promise<Approval | null> {
    const response = await axios.post(`${endPoint}`,
        {
            query: `approvalRequest(id: ${approvalId}) {
                id
                approvalId
                assetId
                owner
            }`
        }
    );

    return response.data.data.approvalRequest;
}

export async function allApprovalsOf(owner: string, status: Status): Promise<Approval[]> {
    const response = await axios.post(`${endPoint}`,
        {
            query: `approvalRequests(where: {owner: "${owner}", status: ${status}}, orderBy: blockTimestamp, orderDirection: desc) {
            id
            approvalId
            assetId
            owner
        }`
        }
    );

    return response.data.data.approvalRequests;
};
