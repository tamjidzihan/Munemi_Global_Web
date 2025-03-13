/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClint from '../services/apiClient';

export interface Appointment {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    appointmentOffice: string;
    message?: string;
    updatedAt: string;
    _id: string;
}

const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalAppointments = appointments.length;
    // Fetch all appointments
    useEffect(() => {
        setLoading(true);
        const getAppointments = async () => {
            try {
                const response = await apiClint.get('/appointments');
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch appointments');
                setLoading(false);
            }
        }
        getAppointments()
    }, [])


    // Create a new appointment
    const createAppointment = async (appointment: Appointment) => {
        setLoading(true);
        try {
            const response = await apiClint.post('/appointments', appointment);
            setAppointments((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create appointment');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing appointment
    const updateAppointment = async (id: string, updatedAppointment: Appointment) => {
        setLoading(true);
        try {
            const response = await apiClint.patch(`/appointments/${id}`, updatedAppointment);
            const updatedAppointments = appointments.map((appointment) =>
                appointment._id === id ? response.data : appointment
            );
            setAppointments(updatedAppointments);
            setLoading(false);
        } catch (err) {
            setError('Failed to update appointment');
            setLoading(false);
        }
    };

    // Delete an appointment
    const deleteAppointment = async (id: string) => {
        setLoading(true);
        try {
            await apiClint.delete(`/appointments/${id}`);
            setAppointments(appointments.filter((appointment) => appointment._id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete appointment');
            setLoading(false);
        }
    };

    return {
        totalAppointments,
        appointments,
        loading,
        error,
        setAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
    };
};

export default useAppointments;
