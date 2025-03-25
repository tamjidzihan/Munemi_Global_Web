const AppointmentBooking = require('../models/AppointmentBookingModel')


const getAppointmentBooking = () => AppointmentBooking.findAll();
const findAppointmentBooking = (id) => AppointmentBooking.findByPk(id)
const createAppointmentBooking = (values) => AppointmentBooking.create(values);
const updateAppointmentBooking = (id, values) => AppointmentBooking.update(values, { where: { id }, returning: true });
const deleteAppointmentBooking = (id) => AppointmentBooking.destroy({ where: { id } })

module.export = {
    getAppointmentBooking,
    findAppointmentBooking,
    createAppointmentBooking,
    updateAppointmentBooking,
    deleteAppointmentBooking
}