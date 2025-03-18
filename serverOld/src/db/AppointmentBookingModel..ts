import mongoose from "mongoose";

const appointmentBookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, require: true },
    appointmentOffice: { type: String, required: true, enum: ["Bangladesh"] },
    message: { type: String }
}, { timestamps: true })


export const AppointmentBookingModel = mongoose.model("AppointmentBooking", appointmentBookingSchema)