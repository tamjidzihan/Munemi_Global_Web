/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface UniversityProps {
    id: string;
    name: string;
    logo: string;
    country: string;
}

const useUniversity = () => {
    const [universities, setUniversities] = useState<UniversityProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalUniversities = universities.length;

    // Fetch all universities
    useEffect(() => {
        setLoading(true);
        const fetchUniversities = async () => {
            try {
                const response = await apiClient.get("/university");
                setUniversities(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch universities");
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    // Create university
    const createUniversity = async (formData: FormData): Promise<UniversityProps> => {
        setLoading(true);
        try {
            const response = await apiClient.post("/university", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUniversities(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            setError("Failed to create university");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update university
    const updateUniversity = async (id: string, formData: FormData): Promise<UniversityProps> => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/university/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUniversities(prev =>
                prev.map(u => u.id === id ? response.data : u)
            );
            return response.data;
        } catch (err) {
            setError("Failed to update university");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete university
    const deleteUniversity = async (id: string): Promise<void> => {
        setLoading(true);
        try {
            await apiClient.delete(`/university/${id}`);
            setUniversities(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            setError("Failed to delete university");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        universities,
        loading,
        error,
        totalUniversities,
        createUniversity,
        updateUniversity,
        deleteUniversity
    };
};

export default useUniversity;