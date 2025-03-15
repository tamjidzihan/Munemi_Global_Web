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
    _id: string;
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


    const createOffers = async (offers: OfferProps) => {
        setLoading(true)
        try {
            const response = await apiClient.post('/offers', offers)
            setOffers((prev) => [response.data, ...prev])
            setLoading(false)
            return response.data
        } catch (err) {
            setError('Failed to create offers');
            setLoading(false)
            throw err
        }
    }

    const deleteoffers = async (id: string) => {
        setLoading(true)
        try {
            await apiClient.delete(`/offers/${id}`);
            setOffers((prev) => prev.filter((offer) => offer._id !== id))
            setLoading(false)
        } catch (err) {
            setError('Failed to delete Offers')
            setLoading(false)
        }
    }

    return {
        totalOffers,
        offers,
        loading,
        error,
        setOffers,
        createOffers,
        deleteoffers
    }





}

export default useOffer;