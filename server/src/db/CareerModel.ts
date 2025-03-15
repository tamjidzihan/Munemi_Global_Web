import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    currentAddress: { type: String, required: true },
    idCard: {
        publicId: { type: String },
        imageUrl: { type: String }
    },
    resume: { type: String, required: true },
    jobType: { type: String, required: true, enum: ["Full Time", "Part Time ", "Casual", "Intership"] },
}, { timestamps: true })

export const CareerModel = mongoose.model("Career", CareerSchema)