const { AppointmentBookingModel } = require("../db/AppointmentBookingModel.");

const getAppointmentBookings = () => AppointmentBookingModel.find();
const findAppointmentBookingById = (id) => AppointmentBookingModel.findById(id);
const createAppointmentBooking = (values) =>
    new AppointmentBookingModel(values).save().then((appointment) => appointment.toObject());
const updateAppointmentBooking = (id, values) =>
    AppointmentBookingModel.findByIdAndUpdate(id, values, { new: true });
const deleteAppointmentBookingById = (id) => AppointmentBookingModel.findByIdAndDelete(id);

module.exports = {
    getAppointmentBookings,
    findAppointmentBookingById,
    createAppointmentBooking,
    updateAppointmentBooking,
    deleteAppointmentBookingById
};