import mongoose from "mongoose";

const bindSchema = new mongoose.Schema({
    owner: String,
    signer: String,
    privateKey: String,
    emailId: String,
    timestamp: Number,
}, { timestamps: false });

export const BindSchema = mongoose.model('BindSchema', bindSchema);