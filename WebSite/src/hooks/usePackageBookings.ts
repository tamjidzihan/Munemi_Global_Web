/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface PackageBooking {
    id?: string;
    packageId: string;
    fullName: string;
    email: string;
    mobile: string;
    title: string;
}

const usePackageBookings = () => {
    const [packageBookings, setPackageBookings] = useState<PackageBooking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalPackageBookings = packageBookings.length;

    // Fetch all package bookings
    useEffect(() => {
        setLoading(true);
        const getAllBookings = async () => {
            try {
                const response = await apiClient.get('/packagebooking');
                setPackageBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch package bookings');
                setLoading(false);
            }
        };
        getAllBookings();
    }, []);

    // Create a new package booking
    const createBooking = async (booking: PackageBooking) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/packagebooking', booking);
            setPackageBookings((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create package booking');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing package booking
    const updateBooking = async (id: string, updatedBooking: PackageBooking) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/packagebooking/${id}`, updatedBooking);
            const updatedBookings = packageBookings.map((booking) =>
                booking.id === id ? response.data : booking
            );
            setPackageBookings(updatedBookings);
            setLoading(false);
        } catch (err) {
            setError('Failed to update package booking');
            setLoading(false);
        }
    };

    // Delete a package booking
    const deleteBooking = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/packagebooking/${id}`);
            setPackageBookings(packageBookings.filter((booking) => booking.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete package booking');
            setLoading(false);
        }
    };

    return {
        totalPackageBookings,
        packageBookings,
        loading,
        error,
        setPackageBookings,
        createBooking,
        updateBooking,
        deleteBooking,
    };
};

export default usePackageBookings;