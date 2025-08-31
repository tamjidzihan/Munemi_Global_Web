/* eslint-disable @typescript-eslint/no-explicit-any */
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
    status: 'pending' | 'approved' | 'rejected';
    approvedAt?: string;
    approvedBy?: string;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAgentApplication {
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
}

interface ApplicationStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

const useAgentApplications = () => {
    const [agentApplications, setAgentApplications] = useState<AgentApplication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<ApplicationStats>({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    const totalApplications = agentApplications.length;

    // Fetch all agent applications
    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/agent-applications');
            setAgentApplications(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch agent applications');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Fetch application statistics
    const fetchApplicationStats = async () => {
        try {
            const response = await apiClient.get('/agent-applications-stats');
            setStats(response.data);
            return response.data;
        } catch (err) {
            setError('Failed to fetch application statistics');
            throw err;
        }
    };

    // Fetch applications by status
    const getApplicationsByStatus = async (status: string) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/agent-applications-status/${status}`);
            setAgentApplications(response.data);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(`Failed to fetch ${status} applications`);
            setLoading(false);
            throw err;
        }
    };

    const getApplicationById = async (id: string) => {
        try {
            const response = await apiClient.get(`/agent-applications/${id}`);
            return response.data;
        } catch (err) {
            setError("Failed to fetch application by ID");
            throw err;
        }
    };

    // Create new agent application
    const createAgentApplication = async (application: CreateAgentApplication) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/agent-applications', application);
            fetchApplications()
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
            const response = await apiClient.put(`/agent-applications/${id}`, updatedApplication);
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
        } catch (err: any) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Failed to delete agent application';

            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Approve agent application
    const approveAgentApplication = async (id: string, approvedBy: string) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/agent-applications/${id}/approve`, { approvedBy });
            const { application } = response.data; // only update application
            const updatedApplications = agentApplications.map(app =>
                app.id === id ? { ...app, ...application } : app
            );
            setAgentApplications(updatedApplications); // update parent state
            setLoading(false);
            return application;
        } catch (err) {
            setError('Failed to approve agent application');
            setLoading(false);
            throw err;
        }
    };

    // Reject agent application
    const rejectAgentApplication = async (id: string, reason: string, rejectedBy: string) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/agent-applications/${id}/reject`, { reason, rejectedBy });
            const { application } = response.data; // only update application
            const updatedApplications = agentApplications.map(app =>
                app.id === id ? { ...app, ...application } : app
            );
            setAgentApplications(updatedApplications); // update parent state
            setLoading(false);
            return application;
        } catch (err) {
            setError('Failed to reject agent application');
            setLoading(false);
            throw err;
        }
    };

    return {
        totalApplications,
        agentApplications,
        loading,
        error,
        stats,
        fetchApplications,
        getApplicationById,
        setAgentApplications,
        fetchApplicationStats,
        getApplicationsByStatus,
        createAgentApplication,
        updateAgentApplication,
        deleteAgentApplication,
        approveAgentApplication,
        rejectAgentApplication,
    };
};

export default useAgentApplications;