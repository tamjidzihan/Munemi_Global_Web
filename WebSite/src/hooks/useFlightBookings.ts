/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface Booking {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    tripType: string;
    origin: string;
    destination: string;
    startDate: string;
    endDate?: string;
    travelers: number;
    createdAt: string;
    updatedAt: string;
}

const useFlightBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalBookings = bookings.length;

    // Fetch all bookings
    useEffect(() => {
        setLoading(true);
        const getBookings = async () => {
            try {
                const response = await apiClient.get('/bookings');
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch bookings');
                setLoading(false);
            }
        };
        getBookings();
    }, []);

    // Create a new booking
    const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/bookings', booking);
            setBookings(prev => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create booking');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing booking
    const updateBooking = async (id: string, updatedBooking: Partial<Booking>) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/bookings/${id}`, updatedBooking);
            const updatedBookings = bookings.map(booking =>
                booking.id === id ? { ...booking, ...response.data } : booking
            );
            setBookings(updatedBookings);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to update booking');
            setLoading(false);
            throw err;
        }
    };

    // Delete a booking
    const deleteBooking = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/bookings/${id}`);
            setBookings(prev => prev.filter(booking => booking.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete booking');
            setLoading(false);
            throw err;
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

export default useFlightBookings;