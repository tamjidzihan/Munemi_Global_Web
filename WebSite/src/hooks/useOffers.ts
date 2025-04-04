/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface OfferProps {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    termsAndConditions?: string;
    image?: {
        publicId?: string | null;
        imageUrl?: string | null;
    };
    isActive?: boolean;
    updatedAt: string;
    id: string;
}


const useOffer = () => {
    const [offers, setOffers] = useState<OfferProps[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalOffers = offers.length

    useEffect(() => {
        setLoading(true)
        const getOffers = async () => {
            try {
                const response = await apiClient.get('/offers');
                setOffers(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch offers');
                setLoading(false)
            }
        }
        getOffers()
    }, [])


    const createOffers = async (formData: FormData): Promise<OfferProps> => {
        setLoading(true);
        try {
            const response = await apiClient.post("/offers", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setOffers(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            setError("Failed to create offer");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update offer
    const updateOffers = async (id: string, formData: FormData): Promise<OfferProps> => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/offers/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setOffers(prev =>
                prev.map(offer => offer.id === id ? response.data : offer)
            );
            return response.data;
        } catch (err) {
            setError("Failed to update offer");
            throw err;
        } finally {
            setLoading(false);
        }
    };


    // Delete offer
    const deleteOffers = async (id: string): Promise<void> => {
        setLoading(true);
        try {
            await apiClient.delete(`/offers/${id}`);
            setOffers(prev => prev.filter(offer => offer.id !== id));
        } catch (err) {
            setError("Failed to delete offer");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        totalOffers,
        offers,
        loading,
        error,
        setOffers,
        createOffers,
        updateOffers,
        deleteOffers
    }
}

export default useOffer;