import { Bind, UnBindConfirmation, UnBindRequest } from "../database/models";

const OK = 200;
const FAILED = 400;

export class MainController {
    async bindRequest(owner: string, telegramId: string, signedMessage: string) {
        const existingBind = await this.findBindWithAddress(owner);

        if (existingBind) {
            return {
                code: FAILED,
                message: "Bind Already Exists"
            };
        }

        const newBind: Bind = {
            owner: owner,
            telegramId: telegramId,
            timestamp: this.blockTimestamp()
        };

        const saved = await this.saveBinding(newBind, signedMessage);

        return {
            code: saved ? OK : FAILED,
            message: saved ? "Bind saved!" : "Failed operation."
        };
    }

    async unBindRequest(owner: string) {
        const existingBind = await this.findBindWithAddress(owner);

        if (!existingBind) {
            return {
                code: FAILED,
                message: "Bind Not Exists"
            };
        }

        const newRequest: UnBindRequest = {
            owner: owner
        };

        const sent = await this.sendUnBindRequest(newRequest);

        return {
            code: sent ? OK : FAILED,
            message: sent ? "Request saved!" : "Failed operation."
        };
    }

    async unBindConfirmationRequest(owner: string, code: string) {
        const existingConfirmation = await this.getUnBindConfirmation(owner);

        if (!existingConfirmation) {
            return {
                code: FAILED,
                message: "Confirmation Not Exists."
            };
        }

        if (existingConfirmation.expires && (existingConfirmation.expires >= this.blockTimestamp())) {
            return {
                code: FAILED,
                message: "Confirmation Expired."
            };
        }

        if (existingConfirmation.code != code) {
            return {
                code: FAILED,
                message: "Invalid Confirmation Code."
            };
        }

        await this.deleteUnBindConfirmation(owner);

        const delBind = await this.deleteBind(owner);

        return {
            code: delBind ? OK : FAILED,
            message: delBind ? "Bind deleted!" : "Failed operation."
        };
    }

    private async findBindWithAddress(owner: string): Promise<Bind | null> {

    }

    private async saveBinding(bind: Bind, signedMessage: string): Promise<boolean> {

    }

    private async sendUnBindRequest(request: UnBindRequest): Promise<boolean> {
        const newConfirmation: UnBindConfirmation = {
            owner: request.owner,
            code: this.generateCode(6)
        };
    }

    private async getUnBindConfirmation(owner: string): Promise<UnBindConfirmation> {

    }

    private async deleteUnBindConfirmation(owner: string): Promise<boolean> {

    }

    private async deleteBind(owner: string): Promise<boolean> {

    }

    private generateCode(length: number): string {
        return "0";
    }

    private blockTimestamp(): number {
        return Math.ceil(Date.now() / 100);
    }
}