/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface Booking {
    id?: string;
    fullName: string;
    email: string;
    mobile: string;
    tripType: string;
    origin: string;
    destination: string;
    startDate: string;
    endDate?: string;
    adult: number;
    children?: number;
    infants?: number;
}

const useBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalBookings = bookings.length;

    // Fetch all bookings
    useEffect(() => {
        setLoading(true);
        const getAllBookings = async () => {
            try {
                const response = await apiClient.get('/bookings');
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch bookings');
                setLoading(false);
            }
        };
        getAllBookings();
    }, []);

    // Create a new booking
    const createBooking = async (booking: Booking) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/bookings', booking);
            setBookings((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create booking');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing booking
    const updateBooking = async (id: string, updatedBooking: Booking) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/bookings/${id}`, updatedBooking);
            const updatedBookings = bookings.map((booking) =>
                booking.id === id ? response.data : booking
            );
            setBookings(updatedBookings);
            setLoading(false);
        } catch (err) {
            setError('Failed to update booking');
            setLoading(false);
        }
    };

    // Delete a booking
    const deleteBooking = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/bookings/${id}`);
            setBookings(bookings.filter((booking) => booking.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete booking');
            setLoading(false);
        }
    };

    return {
        totalBookings,
        bookings,
        loading,
        error,
        setBookings,
        createBooking,
        updateBooking,
        deleteBooking,
    };
};

export default useBookings;