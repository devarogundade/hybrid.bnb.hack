import axios from 'axios';
import { Status } from './../types';
import type { Approval } from "@/types";

const endPoint = 'https://api.thegraph.com/subgraphs/name/devarogundade/hybrid';

export async function allApprovals(owner: string): Promise<Approval[]> {
    try {
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
                        blockTimestamp
                    }
                }`
            }
        );

        return response.data.data.approvalRequesteds;
    } catch (error) {
        return [];
    }
}

export async function getApproval(approvalId: string): Promise<Approval | null> {
    try {
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
                        blockTimestamp
                    }
                }`
            }
        );

        return response.data.data.approvalRequested;
    } catch (error) {
        return null;
    }
}

export async function allApprovalsOf(owner: string, status: Status): Promise<Approval[]> {
    try {
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
                        blockTimestamp
                    }
                }`
            }
        );

        return response.data.data.approvalRequesteds;
    } catch (error) {
        return [];
    }
}
