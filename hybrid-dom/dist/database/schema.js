"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bindSchema = new mongoose_1.default.Schema({
    owner: String,
    signer: String,
    privateKey: String,
    emailId: String,
    timestamp: Number,
}, { timestamps: false });
exports.BindSchema = mongoose_1.default.model('BindSchema', bindSchema);
