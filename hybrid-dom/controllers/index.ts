import { Bind, EthAccount, SignedMessage, UnBindConfirmation, UnBindRequest } from "../database/models";
import { BindSchema } from "../database/schema";
import Web3 from 'web3';
import { createTransport } from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

const OK = 200;
const FAILED = 400;

interface Response {
    data?: any;
    code: number;
    message?: string;
}

export class MainController {
    async bindRequest(owner: string, emailId: string): Promise<Response> {
        const existingBind = await this.findBindWithAddress(owner);

        if (existingBind) {
            return {
                code: FAILED,
                message: "Bind Already Exists"
            };
        }

        const signingAccount: EthAccount = this.newEthAccount();

        const newBind: Bind = {
            owner: owner,
            signer: signingAccount.address,
            privateKey: signingAccount.privateKey,
            emailId: emailId,
            timestamp: this.blockTimestamp()
        };

        const saved = await this.saveBinding(newBind);

        return {
            code: saved ? OK : FAILED,
            message: saved ? "Bind saved!" : "Failed operation.",
            data: newBind.signer
        };
    }

    async onDeleteBind(owner: string): Promise<Response> {
        try {
            await BindSchema.deleteOne({ owner });
            return {
                data: true,
                code: OK
            };
        } catch (error) {
            console.log(error);
            return {
                data: false,
                code: FAILED
            };
        }
    }

    async getBinding(owner: string): Promise<Response> {
        try {
            const bind = await this.findBindWithAddress(owner);

            if (!bind) {
                return {
                    data: false,
                    code: FAILED,
                    message: "No binding found!"
                };
            }

            bind.privateKey = '*****';

            return {
                code: OK,
                data: bind
            };
        } catch (error) {
            console.log(error);
            return {
                data: false,
                code: FAILED
            };
        }
    }

    async newSignedMessage(owner: string, data: string): Promise<Response> {
        try {
            const bind = await this.findBindWithAddress(owner);

            if (!bind) return {
                code: FAILED,
                message: 'No Binding Found!'
            };

            const web3 = new Web3();

            const signedMessage = web3.eth.accounts.sign(`New Sign Message ${data} at ${this.blockTimestamp()}`, bind.privateKey);

            const preMailBody: SignedMessage = {
                messageHash: signedMessage.messageHash,
                v: signedMessage.v,
                r: signedMessage.r,
                s: signedMessage.s
            };

            const preMailBodyAsJsonHex = this.stringToHex(JSON.stringify(preMailBody));

            await this.sendMail(
                bind.emailId,
                `Your prove hash for ${data} is: ${preMailBodyAsJsonHex}`
            );

            return {
                data: true,
                code: OK
            };
        } catch (error) {
            console.log(error);
            return {
                data: false,
                code: FAILED
            };
        }
    }

    private async findBindWithAddress(owner: string): Promise<Bind | null> {
        try {
            const bind = await BindSchema.findOne({ owner });
            return bind as Bind;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    private async saveBinding(bind: Bind): Promise<boolean> {
        try {
            await BindSchema.findOneAndUpdate(
                { owner: bind.owner },
                { $set: bind },
                {
                    upsert: true,
                    returnNewDocument: true,
                    returnDocument: "after"
                });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private newEthAccount(): EthAccount {
        const web3 = new Web3();

        const account = web3.eth.accounts.create();

        return {
            privateKey: account.privateKey,
            address: account.address
        };
    }

    private blockTimestamp(): number {
        return Math.ceil(Date.now() / 100);
    }

    private stringToHex(data: string): string {
        return Buffer.from(data, 'utf-8').toString('hex');
    }

    private async sendMail(to: string, body: string) {
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to,
            subject: 'New Hybrid Signed Hash',
            text: body
        };

        transporter.sendMail(mailOptions, (error: Error | null, _: SMTPTransport.SentMessageInfo) => {
            if (error) {
                console.log(error);
            }
        });
    }
}