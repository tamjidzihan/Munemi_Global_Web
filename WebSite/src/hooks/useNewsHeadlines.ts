/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface NewsHeadline {
    id?: string;
    title: string;
    link: string;
    isBreaking?: boolean;
    category?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

const useNewsHeadlines = () => {
    const [headlines, setHeadlines] = useState<NewsHeadline[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalHeadlines = headlines.length;
    const breakingNewsCount = headlines.filter(headline => headline.isBreaking).length;
    const activeHeadlinesCount = headlines.filter(headline => headline.isActive).length;

    // Fetch all news headlines
    useEffect(() => {
        setLoading(true);
        const getAllHeadlines = async () => {
            try {
                const response = await apiClient.get('/newsheadline');
                setHeadlines(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch news headlines');
                setLoading(false);
            }
        };
        getAllHeadlines();
    }, []);

    // Create a new news headline
    const createHeadline = async (headline: NewsHeadline) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/newsheadline', headline);
            setHeadlines((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create news headline');
            setLoading(false);
            throw err;
        }
    };

    // Get a single news headline by ID
    const getHeadlineById = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/newsheadline/${id}`);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to fetch news headline');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing news headline
    const updateHeadline = async (id: string, updatedHeadline: Partial<NewsHeadline>) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/newsheadline/${id}`, updatedHeadline);
            const updatedHeadlines = headlines.map((headline) =>
                headline.id === id ? response.data : headline
            );
            setHeadlines(updatedHeadlines);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to update news headline');
            setLoading(false);
            throw err;
        }
    };

    // Delete a news headline
    const deleteHeadline = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/newsheadline/${id}`);
            setHeadlines(headlines.filter((headline) => headline.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete news headline');
            setLoading(false);
            throw err;
        }
    };

    // Toggle breaking news status
    const toggleBreakingNews = async (id: string) => {
        const headline = headlines.find(h => h.id === id);
        if (!headline) return;
        try {
            await updateHeadline(id, {
                isBreaking: !headline.isBreaking
            });
        } catch (err) {
            throw err;
        }
    };

    // Toggle active status
    const toggleActiveStatus = async (id: string) => {
        const headline = headlines.find(h => h.id === id);
        if (!headline) return;

        try {
            await updateHeadline(id, {
                isActive: !headline.isActive
            });
        } catch (err) {
            throw err;
        }
    };

    // Filter headlines by category
    const getHeadlinesByCategory = (category: string) => {
        return headlines.filter(headline => headline.category === category);
    };

    // Get only active headlines
    const getActiveHeadlines = () => {
        return headlines.filter(headline => headline.isActive);
    };

    // Get only breaking news
    const getBreakingNews = () => {
        return headlines.filter(headline => headline.isBreaking && headline.isActive);
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    // Refresh headlines
    const refreshHeadlines = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/newsheadline');
            setHeadlines(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to refresh news headlines');
            setLoading(false);
            throw err;
        }
    };

    return {
        // State
        headlines,
        loading,
        error,

        // Counts
        totalHeadlines,
        breakingNewsCount,
        activeHeadlinesCount,

        // CRUD Operations
        createHeadline,
        getHeadlineById,
        updateHeadline,
        deleteHeadline,

        // Utility Functions
        toggleBreakingNews,
        toggleActiveStatus,
        getHeadlinesByCategory,
        getActiveHeadlines,
        getBreakingNews,
        clearError,
        refreshHeadlines,
        setHeadlines,
    };
};

export default useNewsHeadlines;