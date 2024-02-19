"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const schema_1 = require("../database/schema");
const web3_1 = __importDefault(require("web3"));
const nodemailer_1 = require("nodemailer");
const OK = 200;
const FAILED = 400;
class MainController {
    bindRequest(owner, emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingBind = yield this.findBindWithAddress(owner);
            if (existingBind) {
                return {
                    code: FAILED,
                    message: "Bind Already Exists"
                };
            }
            const signingAccount = this.newEthAccount();
            const newBind = {
                owner: owner,
                signer: signingAccount.address,
                privateKey: signingAccount.privateKey,
                emailId: emailId,
                timestamp: this.blockTimestamp()
            };
            const saved = yield this.saveBinding(newBind);
            return {
                code: saved ? OK : FAILED,
                message: saved ? "Bind saved!" : "Failed operation.",
                data: newBind.signer
            };
        });
    }
    onDeleteBind(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema_1.BindSchema.deleteOne({ owner });
                return {
                    data: true,
                    code: OK
                };
            }
            catch (error) {
                console.log(error);
                return {
                    data: false,
                    code: FAILED
                };
            }
        });
    }
    getBinding(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bind = yield this.findBindWithAddress(owner);
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
            }
            catch (error) {
                console.log(error);
                return {
                    data: false,
                    code: FAILED
                };
            }
        });
    }
    newSignedMessage(owner, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bind = yield this.findBindWithAddress(owner);
                if (!bind)
                    return {
                        code: FAILED,
                        message: 'No Binding Found!'
                    };
                const web3 = new web3_1.default();
                const input = `New Sign Message ${data} at ${this.blockTimestamp()}`;
                const signedMessage = web3.eth.accounts.sign(input, bind.privateKey);
                console.log(input);
                console.log(signedMessage);
                const preMailBody = {
                    messageHash: signedMessage.messageHash,
                    v: signedMessage.v,
                    r: signedMessage.r,
                    s: signedMessage.s
                };
                const preMailBodyAsJsonHex = this.stringToHex(JSON.stringify(preMailBody));
                yield this.sendMail(bind.emailId, `Your prove hash for ${data} is: ${preMailBodyAsJsonHex}`);
                return {
                    data: true,
                    code: OK
                };
            }
            catch (error) {
                console.log(error);
                return {
                    data: false,
                    code: FAILED
                };
            }
        });
    }
    findBindWithAddress(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bind = yield schema_1.BindSchema.findOne({ owner });
                return bind;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    saveBinding(bind) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema_1.BindSchema.findOneAndUpdate({ owner: bind.owner }, { $set: bind }, {
                    upsert: true,
                    returnNewDocument: true,
                    returnDocument: "after"
                });
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    newEthAccount() {
        const web3 = new web3_1.default();
        const account = web3.eth.accounts.create();
        return {
            privateKey: account.privateKey,
            address: account.address
        };
    }
    blockTimestamp() {
        return Math.ceil(Date.now() / 100);
    }
    stringToHex(data) {
        return Buffer.from(data, 'utf-8').toString('hex');
    }
    sendMail(to, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, nodemailer_1.createTransport)({
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
            transporter.sendMail(mailOptions, (error, _) => {
                if (error) {
                    console.log(error);
                }
            });
        });
    }
}
exports.MainController = MainController;
