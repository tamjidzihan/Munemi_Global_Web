const mongoose = require("mongoose");

const appointmentBookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },  // Fixed typo: changed 'require' to 'required'
    appointmentOffice: {
        type: String,
        required: true,
        enum: ["Bangladesh"]
    },
    message: { type: String }
}, { timestamps: true });

const AppointmentBookingModel = mongoose.model("AppointmentBooking", appointmentBookingSchema);

module.exports = {
    AppointmentBookingModel
};