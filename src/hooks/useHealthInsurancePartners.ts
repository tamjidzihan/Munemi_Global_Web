/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface HealthInsurancePartner {
    id: string;
    tradingName: string;
    businessRegistrationNumber: string;
    officePhoneNumber: string;
    countryLocated: string;
    primaryOfficeLocation: string;
    website?: string;
    applyingAs: string;
    otherInsuranceType?: string;
    firstName: string;
    lastName: string;
    position: string;
    contactEmail: string;
    contactCountryCode: string;
    contactPhoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

const useHealthInsurancePartners = () => {
    const [healthInsurancePartners, setHealthInsurancePartners] = useState<HealthInsurancePartner[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalPartners = healthInsurancePartners.length;

    // Fetch all health insurance partners
    useEffect(() => {
        setLoading(true);
        const getPartners = async () => {
            try {
                const response = await apiClient.get('/health-insurance-partners');
                setHealthInsurancePartners(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch health insurance partners');
                setLoading(false);
            }
        }
        getPartners();
    }, []);

    // Create a new health insurance partner
    const createHealthInsurancePartner = async (partner: Omit<HealthInsurancePartner, 'id' | 'createdAt' | 'updatedAt'>) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/health-insurance-partners', partner);
            setHealthInsurancePartners(prev => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create health insurance partner');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing health insurance partner
    const updateHealthInsurancePartner = async (id: string, updatedPartner: Partial<HealthInsurancePartner>) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/health-insurance-partners/${id}`, updatedPartner);
            const updatedPartners = healthInsurancePartners.map(partner =>
                partner.id === id ? { ...partner, ...response.data } : partner
            );
            setHealthInsurancePartners(updatedPartners);
            setLoading(false);
        } catch (err) {
            setError('Failed to update health insurance partner');
            setLoading(false);
        }
    };

    // Delete a health insurance partner
    const deleteHealthInsurancePartner = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/health-insurance-partners/${id}`);
            setHealthInsurancePartners(prev => prev.filter(partner => partner.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete health insurance partner');
            setLoading(false);
        }
    };

    return {
        totalPartners,
        healthInsurancePartners,
        loading,
        error,
        setHealthInsurancePartners,
        createHealthInsurancePartner,
        updateHealthInsurancePartner,
        deleteHealthInsurancePartner,
    };
};

export default useHealthInsurancePartners;