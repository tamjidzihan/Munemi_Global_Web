/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Helper function to extract error message from backend response
const getErrorMessage = (err: any, defaultMessage: string): string => {
    if (err.response?.data?.message) {
        return err.response.data.message;
    }
    if (err.message) {
        return err.message;
    }
    return defaultMessage;
};

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
        setError(null);
        try {
            const response = await apiClient.get('/agent-applications');
            setAgentApplications(response.data);
            setLoading(false);
        } catch (err: any) {
            const errorMessage = getErrorMessage(err, 'Failed to fetch agent applications');
            setError(errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Fetch application statistics
    const fetchApplicationStats = async () => {
        setError(null);
        try {
            const response = await apiClient.get('/agent-applications-stats');
            setStats(response.data);
            return response.data;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err, 'Failed to fetch application statistics');
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Fetch applications by status
    const getApplicationsByStatus = async (status: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(`/agent-applications-status/${status}`);
            setAgentApplications(response.data);
            setLoading(false);
            return response.data;
        } catch (err: any) {
            const errorMessage = getErrorMessage(err, `Failed to fetch ${status} applications`);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    const getApplicationById = async (id: string) => {
        setError(null);
        try {
            const response = await apiClient.get(`/agent-applications/${id}`);
            return response.data;
        } catch (err: any) {
            if (err.response?.status === 404) {
                const errorMessage = 'Agent application not found';
                setError(errorMessage);
                throw new Error(errorMessage);
            }
            const errorMessage = getErrorMessage(err, 'Failed to fetch application by ID');
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Create new agent application
    const createAgentApplication = async (application: CreateAgentApplication) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post('/agent-applications', application);
            fetchApplications();
            setAgentApplications(prev => [response.data.application, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err: any) {
            let errorMessage = 'Failed to create agent application';

            if (err.response?.status === 400) {
                if (err.response.data.missingFields) {
                    errorMessage = `Please fill out all required fields: ${err.response.data.missingFields.join(', ')}`;
                } else if (err.response.data.message?.includes('business Registration Number')) {
                    errorMessage = 'An application with this business Registration Number already exists';
                } else if (err.response.data.message?.includes('Invalid Applying Post type')) {
                    errorMessage = 'Invalid application type selected';
                } else {
                    errorMessage = err.response.data.message || errorMessage;
                }
            }

            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Update existing agent application
    const updateAgentApplication = async (id: string, updatedApplication: Partial<AgentApplication>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put(`/agent-applications/${id}`, updatedApplication);
            const updatedApplications = agentApplications.map(app =>
                app.id === id ? { ...app, ...response.data.application } : app
            );
            setAgentApplications(updatedApplications);
            setLoading(false);
            return response.data;
        } catch (err: any) {
            let errorMessage = 'Failed to update agent application';

            if (err.response?.status === 404) {
                errorMessage = 'Agent application not found';
            } else if (err.response?.status === 400) {
                if (err.response.data.message?.includes('Cannot update an approved application')) {
                    errorMessage = 'Cannot update an approved application';
                } else if (err.response.data.message?.includes('Invalid Applying Post type')) {
                    errorMessage = 'Invalid application type selected';
                } else if (err.response.data.message?.includes('No changes made')) {
                    errorMessage = 'No changes were made to the application';
                } else {
                    errorMessage = err.response.data.message || errorMessage;
                }
            }

            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Delete agent application
    const deleteAgentApplication = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await apiClient.delete(`/agent-applications/${id}`);
            setAgentApplications(prev => prev.filter(app => app.id !== id));
            setLoading(false);
        } catch (err: any) {
            let errorMessage = 'Failed to delete agent application';

            if (err.response?.status === 404) {
                errorMessage = 'Agent application not found';
            } else if (err.response?.status === 400) {
                if (err.response.data.message?.includes('Cannot delete an approved application')) {
                    errorMessage = 'Cannot delete an approved application. Please reject the application first.';
                } else {
                    errorMessage = err.response.data.message || errorMessage;
                }
            }

            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Approve agent application
    const approveAgentApplication = async (id: string, approvedBy: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.patch(`/agent-applications/${id}/approve`, { approvedBy });
            const { application } = response.data;
            const updatedApplications = agentApplications.map(app =>
                app.id === id ? { ...app, ...application } : app
            );
            setAgentApplications(updatedApplications);
            setLoading(false);
            return application;
        } catch (err: any) {
            let errorMessage = 'Failed to approve agent application';

            if (err.response?.status === 400) {
                if (err.response.data.message?.includes('already approved')) {
                    errorMessage = 'This application has already been approved';
                } else if (err.response.data.message?.includes('Approver ID is required')) {
                    errorMessage = 'Approver information is required';
                } else {
                    errorMessage = err.response.data.message || errorMessage;
                }
            } else if (err.response?.status === 404) {
                errorMessage = 'Agent application not found';
            }

            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Reject agent application
    const rejectAgentApplication = async (id: string, reason: string, rejectedBy: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.patch(`/agent-applications/${id}/reject`, { reason, rejectedBy });
            const { application } = response.data;
            const updatedApplications = agentApplications.map(app =>
                app.id === id ? { ...app, ...application } : app
            );
            setAgentApplications(updatedApplications);
            setLoading(false);
            return application;
        } catch (err: any) {
            let errorMessage = 'Failed to reject agent application';

            if (err.response?.status === 400) {
                if (err.response.data.message?.includes('already rejected')) {
                    errorMessage = 'This application has already been rejected';
                } else if (err.response.data.message?.includes('rejectedBy')) {
                    errorMessage = 'Rejecter information is required';
                } else {
                    errorMessage = err.response.data.message || errorMessage;
                }
            } else if (err.response?.status === 404) {
                errorMessage = 'Agent application not found';
            }

            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
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