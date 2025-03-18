import mongoose from "mongoose";

const referSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    currentAddress: { type: String, required: true },
    idCard: { type: String },
}, { timestamps: true })

export const ReferModel = mongoose.model("Refer", referSchema)