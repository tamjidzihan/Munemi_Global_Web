/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export interface Agent {
    id: string;
    applicationId: string;
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
    isActive: boolean;
    commissionRate: number;
    totalStudentsReferred: number;
    createdAt: string;
    updatedAt: string;
}

export interface AgentStats {
    total: number;
    active: number;
    inactive: number;
    subAgents: number;
    superAgents: number;
    totalStudentsReferred: number;
    averageCommissionRate: number;
}

export interface AgentFilters {
    isActive?: boolean;
    applyingAs?: 'Sub-Agent' | 'Super-Agent';
    tradingName?: string;
    emailAddress?: string;
    country?: string;
    page?: number;
    limit?: number;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AgentsResponse {
    success: boolean;
    data: Agent[];
    pagination: PaginationInfo;
}

export interface AgentResponse {
    success: boolean;
    data: Agent;
}

export interface UpdateAgentData {
    commissionRate?: number;
    isActive?: boolean;
    tradingName?: string;
    companyPhone?: string;
    primaryOfficeLocation?: string;
    currentAddress?: string;
    website?: string;
    position?: string;
    personalPhone?: string;
    personalEmail?: string;
}

const useAgents = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<AgentStats>({
        total: 0,
        active: 0,
        inactive: 0,
        subAgents: 0,
        superAgents: 0,
        totalStudentsReferred: 0,
        averageCommissionRate: 0
    });
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const totalAgents = agents.length;

    // Fetch all agents with optional filters
    const fetchAgents = async (filters: AgentFilters = {}) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/agents', { params: filters });
            const data: AgentsResponse = response.data;

            if (data.success) {
                setAgents(data.data);
                setPagination(data.pagination);
            } else {
                setError('Failed to fetch agents');
            }
            setLoading(false);
            return data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch agents';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    // Fetch agent by ID
    const fetchAgentById = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/agents/${id}`);
            const data: AgentResponse = response.data;

            if (data.success) {
                setCurrentAgent(data.data);
                setLoading(false);
                return data.data;
            } else {
                setError('Agent not found');
                setLoading(false);
                return null;
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch agent';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Fetch agent by business registration number
    const fetchAgentByRegistrationNumber = async (registrationNumber: string) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/agents-registration-number/${registrationNumber}`);
            const data = response.data;

            setLoading(false);
            return data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch agent by registration number';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Fetch agent by application ID
    const fetchAgentByApplicationId = async (applicationId: string) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/agents/application/${applicationId}`);
            const data: AgentResponse = response.data;

            if (data.success) {
                setCurrentAgent(data.data);
                setLoading(false);
                return data.data;
            } else {
                setError('Agent not found for this application');
                setLoading(false);
                return null;
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch agent by application ID';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Fetch active agents
    const fetchActiveAgents = async (page: number = 1, limit: number = 10) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/agents/active', { params: { page, limit } });
            const data: AgentsResponse = response.data;

            if (data.success) {
                setAgents(data.data);
                setPagination(data.pagination);
            }
            setLoading(false);
            return data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch active agents';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Fetch agent statistics
    const fetchAgentStats = async () => {
        try {
            const response = await apiClient.get('/agents/stats');
            const data = response.data;

            if (data.success) {
                setStats(data.data);
            }
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch agent statistics';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Fetch top performing agents
    const fetchTopPerformingAgents = async (limit: number = 10) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/agents/top-performing', { params: { limit } });
            const data = response.data;

            if (data.success) {
                setAgents(data.data);
            }
            setLoading(false);
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch top performing agents';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Search agents
    const searchAgents = async (searchCriteria: AgentFilters) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/agents/search', { params: searchCriteria });
            const data: AgentsResponse = response.data;

            if (data.success) {
                setAgents(data.data);
                setPagination(data.pagination);
            }
            setLoading(false);
            return data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to search agents';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Update agent
    const updateAgent = async (id: string, updateData: UpdateAgentData) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/agents/${id}`, updateData);
            const data: AgentResponse = response.data;

            if (data.success) {
                // Update the agent in the local state
                setAgents(prev => prev.map(agent =>
                    agent.id === id ? { ...agent, ...data.data } : agent
                ));
                if (currentAgent && currentAgent.id === id) {
                    setCurrentAgent(data.data);
                }
            }
            setLoading(false);
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to update agent';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Update commission rate
    const updateCommissionRate = async (id: string, commissionRate: number) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/agents/${id}/commission`, { commissionRate });
            const data: AgentResponse = response.data;

            if (data.success) {
                setAgents(prev => prev.map(agent =>
                    agent.id === id ? { ...agent, commissionRate } : agent
                ));
                if (currentAgent && currentAgent.id === id) {
                    setCurrentAgent(prev => prev ? { ...prev, commissionRate } : null);
                }
            }
            setLoading(false);
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to update commission rate';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Increment students referred count
    const incrementStudentsReferred = async (id: string, count: number = 1) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/agents/${id}/increment-students`, { count });
            const data: AgentResponse = response.data;

            if (data.success) {
                setAgents(prev => prev.map(agent =>
                    agent.id === id ? data.data : agent
                ));
                if (currentAgent && currentAgent.id === id) {
                    setCurrentAgent(data.data);
                }
            }
            setLoading(false);
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to increment students referred';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Deactivate agent
    const deactivateAgent = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/agents/${id}/deactivate`);
            const data: AgentResponse = response.data;

            if (data.success) {
                setAgents(prev => prev.map(agent =>
                    agent.id === id ? { ...agent, isActive: false } : agent
                ));
                if (currentAgent && currentAgent.id === id) {
                    setCurrentAgent(prev => prev ? { ...prev, isActive: false } : null);
                }
            }
            setLoading(false);
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to deactivate agent';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Activate agent
    const activateAgent = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/agents/${id}/activate`);
            const data: AgentResponse = response.data;

            if (data.success) {
                setAgents(prev => prev.map(agent =>
                    agent.id === id ? { ...agent, isActive: true } : agent
                ));
                if (currentAgent && currentAgent.id === id) {
                    setCurrentAgent(prev => prev ? { ...prev, isActive: true } : null);
                }
            }
            setLoading(false);
            return data.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to activate agent';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Delete agent
    const deleteAgent = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/agents/${id}`);
            setAgents(prev => prev.filter(agent => agent.id !== id));
            if (currentAgent && currentAgent.id === id) {
                setCurrentAgent(null);
            }
            setLoading(false);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to delete agent';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Get agent with full application details
    const fetchAgentWithApplication = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/agents/${id}/full`);
            const data: AgentResponse = response.data;

            if (data.success) {
                setCurrentAgent(data.data);
                setLoading(false);
                return data.data;
            } else {
                setError('Agent not found');
                setLoading(false);
                return null;
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch agent with application details';
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    return {
        agents,
        currentAgent,
        loading,
        error,
        stats,
        pagination,
        totalAgents,
        fetchAgents,
        fetchAgentById,
        fetchAgentByRegistrationNumber,
        fetchAgentByApplicationId,
        fetchActiveAgents,
        fetchAgentStats,
        fetchTopPerformingAgents,
        searchAgents,
        updateAgent,
        updateCommissionRate,
        incrementStudentsReferred,
        deactivateAgent,
        activateAgent,
        deleteAgent,
        fetchAgentWithApplication,
        clearError,
        setCurrentAgent
    };
};

export default useAgents;