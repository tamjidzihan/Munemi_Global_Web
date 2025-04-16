/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface FlightLocation {
    cityName?: string;
    airportCode: string;
    airportName: string;
    updatedAt?: string; // Optional field
    id?: string; // Optional field for existing locations
}

const useFlightLocations = () => {
    const [flightLocations, setFlightLocations] = useState<FlightLocation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalFlightLocations = flightLocations.length;

    // Fetch all flight locations
    useEffect(() => {
        setLoading(true);
        const getFlightLocations = async () => {
            try {
                const response = await apiClient.get('/flightLocation');
                setFlightLocations(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch flight locations');
                setLoading(false);
            }
        };
        getFlightLocations();
    }, []);

    // Create a new flight location
    const createFlightLocation = async (flightLocation: FlightLocation) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/flightLocation', flightLocation);
            setFlightLocations((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create flight location');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing flight location
    const updateFlightLocation = async (id: string, updatedFlightLocation: FlightLocation) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/flightLocation/${id}`, updatedFlightLocation);
            const updatedFlightLocations = flightLocations.map((location) =>
                location.id === id ? response.data : location
            );
            setFlightLocations(updatedFlightLocations);
            setLoading(false);
        } catch (err) {
            setError('Failed to update flight location');
            setLoading(false);
        }
    };

    // Delete a flight location
    const deleteFlightLocation = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/flightLocation/${id}`);
            setFlightLocations(flightLocations.filter((location) => location.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete flight location');
            setLoading(false);
        }
    };

    return {
        totalFlightLocations,
        flightLocations,
        loading,
        error,
        setFlightLocations,
        createFlightLocation,
        updateFlightLocation,
        deleteFlightLocation,
    };
};

export default useFlightLocations;