/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface AgentApplication {
    id: string;
    tradingName: string;
    businessRegistrationNumber: string;
    companyPhone: string;
    country: string;
    emailAddress: string;
    applyingAs: 'Sub-Agent' | 'Super-Agent';
    primaryOfficeLocation: string;
    currentAddress: string;
    website?: string;
    firstName: string;
    position: string;
    lastName: string;
    personalPhone: string;
    personalEmail: string;
    createdAt: string;
    updatedAt: string;
}

const useAgentApplications = () => {
    const [agentApplications, setAgentApplications] = useState<AgentApplication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalApplications = agentApplications.length;

    // Fetch all agent applications
    useEffect(() => {
        setLoading(true);
        const getApplications = async () => {
            try {
                const response = await apiClient.get('/agent-applications');
                setAgentApplications(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch agent applications');
                setLoading(false);
            }
        }
        getApplications();
    }, []);

    // Create new agent application
    const createAgentApplication = async (application: Omit<AgentApplication, 'id' | 'createdAt' | 'updatedAt'>) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/agent-applications', application);
            setAgentApplications(prev => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create agent application');
            setLoading(false);
            throw err;
        }
    };

    // Update existing agent application
    const updateAgentApplication = async (id: string, updatedApplication: Partial<AgentApplication>) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/agent-applications/${id}`, updatedApplication);
            const updatedApplications = agentApplications.map(app =>
                app.id === id ? { ...app, ...response.data } : app
            );
            setAgentApplications(updatedApplications);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to update agent application');
            setLoading(false);
            throw err;
        }
    };

    // Delete agent application
    const deleteAgentApplication = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/agent-applications/${id}`);
            setAgentApplications(prev => prev.filter(app => app.id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete agent application');
            setLoading(false);
            throw err;
        }
    };

    return {
        totalApplications,
        agentApplications,
        loading,
        error,
        setAgentApplications,
        createAgentApplication,
        updateAgentApplication,
        deleteAgentApplication,
    };
};

export default useAgentApplications;