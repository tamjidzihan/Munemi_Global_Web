import { AppointmentBookingModel } from "../db/AppointmentBookingModel.";

export const getAppointmentBookings = () => AppointmentBookingModel.find()
export const findAppointmentBookingByid = (id: string) => AppointmentBookingModel.findById(id)
export const createAppointmentBooking = (valuse: Record<string, any>) => new AppointmentBookingModel(valuse).save().then((appointment) => appointment.toObject());
export const updateAppointmentBooking = (id: string, valuse: Record<string, any>) => AppointmentBookingModel.findByIdAndUpdate(id, valuse)
export const deleteAppointmentBookingById = (id: string) => AppointmentBookingModel.findByIdAndDelete({ _id: id });