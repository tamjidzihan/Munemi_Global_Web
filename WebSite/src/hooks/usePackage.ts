/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface PackageImageProps {
    id: string;
    url: string;
    createdAt: string;
}

export interface PackageProps {
    id: string;
    title: string;
    type: string;
    destination: string;
    numberOftraveller?: number;
    price?: number;
    duration?: string;
    description: string;
    startDate: string;
    endDate: string;
    termsAndConditions?: string;
    images: PackageImageProps[];
    isActive: boolean;
    updatedAt: string;
}

const usePackage = () => {
    const [packages, setPackages] = useState<PackageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalPackages = packages.length;

    useEffect(() => {
        setLoading(true);
        const getPackages = async () => {
            try {
                const response = await apiClient.get('/package');
                setPackages(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch packages');
                setLoading(false);
            }
        };
        getPackages();
    }, []);

    const createPackage = async (formData: FormData): Promise<PackageProps> => {
        setLoading(true);
        try {
            const response = await apiClient.post("/package", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPackages(prev => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError("Failed to create package");
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePackage = async (id: string, formData: FormData): Promise<PackageProps> => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/package/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPackages(prev =>
                prev.map(pkg => pkg.id === id ? response.data : pkg)
            );
            setLoading(false);
            return response.data;
        } catch (err) {
            setError("Failed to update package");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deletePackage = async (id: string): Promise<void> => {
        setLoading(true);
        try {
            await apiClient.delete(`/package/${id}`);
            setPackages(prev => prev.filter(pkg => pkg.id !== id));
            setLoading(false);
        } catch (err) {
            setError("Failed to delete package");
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        totalPackages,
        packages,
        loading,
        error,
        setPackages,
        createPackage,
        updatePackage,
        deletePackage
    };
};

export default usePackage;