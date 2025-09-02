/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../services/apiClient';

export interface AgentAuth {
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

interface AgentApplicationInfo {
    applicationStatus?: 'pending' | 'rejected';
    rejectionReason?: string;
    message?: string;
}

interface AgentAuthContextType {
    agent: AgentAuth | null;
    loading: boolean;
    error: string | null;
    applicationInfo: AgentApplicationInfo | null;
    loginAgent: (businessRegistrationNumber: string) => Promise<boolean>;
    logoutAgent: () => void;
    isAuthenticated: boolean;
    clearError: () => void;
    clearApplicationInfo: () => void;
}

const AgentAuthContext = createContext<AgentAuthContextType | null>(null);

export const useAgentAuth = () => {
    const context = useContext(AgentAuthContext);
    if (!context) {
        throw new Error('useAgentAuth must be used within an AgentAuthProvider');
    }
    return context;
};

export const AgentAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [agent, setAgent] = useState<AgentAuth | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [applicationInfo, setApplicationInfo] = useState<AgentApplicationInfo | null>(null);

    useEffect(() => {
        // Check if agent data exists in localStorage on component mount
        const storedAgent = localStorage.getItem('agentData');
        if (storedAgent) {
            try {
                const agentData = JSON.parse(storedAgent);
                setAgent(agentData);
            } catch (err) {
                console.error('Failed to parse stored agent data:', err);
                localStorage.removeItem('agentData');
            }
        }
        setLoading(false);
    }, []);

    const loginAgent = async (businessRegistrationNumber: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setApplicationInfo(null);

        try {
            const response = await apiClient.get(`/agents-registration-number/${businessRegistrationNumber}`);
            const responseData = response.data;

            if (responseData.success === true && responseData.data) {
                // Agent is approved and active
                localStorage.setItem('agentData', JSON.stringify(responseData.data));
                setAgent(responseData.data);
                setLoading(false);
                return true;
            } else if (responseData.success === false) {
                // Handle different application statuses
                if (responseData.applicationStatus === 'pending') {
                    setApplicationInfo({
                        applicationStatus: 'pending',
                        message: responseData.message
                    });
                } else if (responseData.applicationStatus === 'rejected') {
                    setApplicationInfo({
                        applicationStatus: 'rejected',
                        rejectionReason: responseData.rejectionReason,
                        message: responseData.message
                    });
                } else {
                    setError(responseData.message || 'No agent or application found');
                }
                setLoading(false);
                return false;
            } else {
                // Unexpected response format
                setError('Unexpected response from server');
                setLoading(false);
                return false;
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError('No agent or application found for this registration number');
            } else if (err.response?.status === 500) {
                setError('Server error. Please try again later.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message === 'Network Error') {
                setError('Network error. Please check your connection.');
            } else {
                setError('Failed to login. Please try again.');
            }

            setLoading(false);
            return false;
        }
    };

    const logoutAgent = () => {
        localStorage.removeItem('agentData');
        setAgent(null);
        setError(null);
        setApplicationInfo(null);
    };

    const clearError = () => {
        setError(null);
    };

    const clearApplicationInfo = () => {
        setApplicationInfo(null);
    };

    const value: AgentAuthContextType = {
        agent,
        loading,
        error,
        applicationInfo,
        loginAgent,
        logoutAgent,
        isAuthenticated: !!agent,
        clearError,
        clearApplicationInfo
    };

    return (
        <AgentAuthContext.Provider value={value}>
            {children}
        </AgentAuthContext.Provider>
    );
};