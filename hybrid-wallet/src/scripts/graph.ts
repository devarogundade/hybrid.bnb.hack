import { Status } from './../types';
import type { Approval, BindWallet } from "@/types";

class GraphEnpoint {

    async bindWalletOf(owner: string): Promise<BindWallet | null> {



        return null;
    }

    async allApprovals(owner: string): Promise<Approval[]> {



        return [];
    }

    async getApproval(approvalId: string): Promise<Approval | null> {



        return null;
    }

    async allApprovalsOf(owner: string, status: Status): Promise<Approval[]> {



        return [];
    }

}