/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface CareerProps {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    currentAddress: string;
    idCard?: string;
    resume?: string;
    jobType: string;
    updatedAt: string;
}

const useCareer = () => {
    const [careers, setCareers] = useState<CareerProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalCareers = careers.length;

    useEffect(() => {
        setLoading(true);
        const getCareers = async () => {
            try {
                const response = await apiClient.get("/careers");
                setCareers(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch careers");
                setLoading(false);
            }
        };
        getCareers();
    }, []);

    const createCareer = async (career: FormData): Promise<CareerProps> => {
        setLoading(true);
        try {
            const response = await apiClient.post("/careers", career, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setCareers((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError("Failed to create career");
            setLoading(false);
            throw err;
        }
    };

    const deleteCareer = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/careers/${id}`);
            setCareers((prev) => prev.filter((career) => career.id !== id));
            setLoading(false);
        } catch (err) {
            setError("Failed to delete career");
            setLoading(false);
        }
    };

    return {
        totalCareers,
        careers,
        loading,
        error,
        setCareers,
        createCareer,
        deleteCareer,
    };
};

export default useCareer;
