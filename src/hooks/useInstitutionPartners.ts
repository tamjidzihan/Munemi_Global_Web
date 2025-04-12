/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface InstitutionPartner {
    id: string;
    fullNameOfInstitute: string;
    category: 'University' | 'Institute' | 'Professional Year Provider' | 'RPL Provider';
    coursesProviding: string[]; // Change to string[] to reflect the array structure
    otherCourses?: string;
    businessRegistrationNumber: string;
    countryLocated: string;
    campusLocations: string;
    primaryEmailAddress: string;
    website?: string;
    firstName: string;
    lastName: string;
    position: string;
    contactEmail: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

const useInstitutionPartners = () => {
    const [institutionPartners, setInstitutionPartners] = useState<InstitutionPartner[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalPartners = institutionPartners.length;

    // Fetch all institution partners
    useEffect(() => {
        setLoading(true);
        const getPartners = async () => {
            try {
                const response = await apiClient.get('/institution-partners');
                setInstitutionPartners(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch institution partners');
                setLoading(false);
            }
        }
        getPartners();
    }, []);

    // Create a new institution partner
    const createInstitutionPartner = async (partner: Omit<InstitutionPartner, 'id' | 'createdAt' | 'updatedAt'>) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/institution-partners', {
                ...partner,
                coursesProviding: partner.coursesProviding.join(','), // Convert array to comma-separated string
            });
            setInstitutionPartners(prev => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create institution partner');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing institution partner
    const updateInstitutionPartner = async (id: string, updatedPartner: Partial<Omit<InstitutionPartner, 'coursesProviding'>> & { coursesProviding?: string[] }) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/institution-partners/${id}`, {
                ...updatedPartner,
                coursesProviding: updatedPartner.coursesProviding?.join(','), // Convert array to comma-separated string
            });
            const updatedPartners = institutionPartners.map(partner =>
                partner.id === id ? { ...partner, ...response.data } : partner
            );
            setInstitutionPartners(updatedPartners);
            setLoading(false);
        } catch (err) {
            setError('Failed to update institution partner');
            setLoading(false);
        }
    };

    // Delete an institution partner
    const deleteInstitutionPartner = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/institution-partners/${id}`);
            setInstitutionPartners(prev => prev.filter(partner => partner.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete institution partner');
            setLoading(false);
        }
    };

    return {
        totalPartners,
        institutionPartners,
        loading,
        error,
        createInstitutionPartner,
        updateInstitutionPartner,
        deleteInstitutionPartner,
    };
};

export default useInstitutionPartners;