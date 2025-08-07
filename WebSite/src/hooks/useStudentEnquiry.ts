import { useEffect, useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export interface TestResult {
    testType: string;
    overallScore: number;
    reading: number;
    writing: number;
    listening: number;
    speaking: number;
}

export interface AcademicQualification {
    degree: string;
    institution: string;
    yearCompleted: number;
    grade?: string;
}

export interface VisaHistory {
    hasPreviousVisa: boolean;
    countries: string[];
    rejections: boolean;
}

export interface StudentEnquiry {
    id: string;
    studentName: string;
    email: string;
    phone: string;
    address: string;
    englishProficiencyTest: string;
    testResult: TestResult;
    academicQualification: AcademicQualification[];
    visaHistory: VisaHistory;
    que1: string;
    que2: string;
    que3: string;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    success: boolean;
    data: StudentEnquiry[];
}

interface UseStudentEnquiriesReturn {
    totalEnquiries: number;
    enquiries: StudentEnquiry[];
    loading: boolean;
    error: string | null;
    fetchEnquiries: () => Promise<void>;
    createEnquiry: (enquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<StudentEnquiry>;
    updateEnquiry: (id: string, updatedEnquiry: Partial<StudentEnquiry>) => Promise<StudentEnquiry>;
    deleteEnquiry: (id: string) => Promise<void>;
    getEnquiryById: (id: string) => StudentEnquiry | undefined;
}

const useStudentEnquiries = (): UseStudentEnquiriesReturn => {
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalEnquiries = enquiries.length;

    const fetchEnquiries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get<ApiResponse>('/student-enquiries');
            if (response.data.success) {
                setEnquiries(response.data.data);
            } else {
                throw new Error('Failed to fetch student enquiries');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch student enquiries');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch all student enquiries on mount
    useEffect(() => {
        fetchEnquiries();
    }, [fetchEnquiries]);

    // Create a new student enquiry
    const createEnquiry = useCallback(async (enquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>): Promise<StudentEnquiry> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post<ApiResponse>('/student-enquiries', enquiry);
            if (response.data.success && response.data.data[0]) {
                const newEnquiry = response.data.data[0];
                setEnquiries(prev => [newEnquiry, ...prev]);
                return newEnquiry;
            }
            throw new Error('Failed to create student enquiry');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create student enquiry';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing student enquiry
    const updateEnquiry = useCallback(async (id: string, updatedEnquiry: Partial<StudentEnquiry>): Promise<StudentEnquiry> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.patch<ApiResponse>(`/student-enquiries/${id}`, updatedEnquiry);
            if (response.data.success && response.data.data[0]) {
                const updated = response.data.data[0];
                setEnquiries(prev => prev.map(enquiry =>
                    enquiry.id === id ? updated : enquiry
                ));
                return updated;
            }
            throw new Error('Failed to update student enquiry');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update student enquiry';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a student enquiry
    const deleteEnquiry = useCallback(async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.delete<{ success: boolean }>(`/student-enquiries/${id}`);
            if (response.data.success) {
                setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
            } else {
                throw new Error('Failed to delete student enquiry');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete student enquiry');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get single enquiry by ID
    const getEnquiryById = useCallback((id: string): StudentEnquiry | undefined => {
        return enquiries.find(enquiry => enquiry.id === id);
    }, [enquiries]);

    return {
        totalEnquiries,
        enquiries,
        loading,
        error,
        fetchEnquiries,
        createEnquiry,
        updateEnquiry,
        deleteEnquiry,
        getEnquiryById,
    };
};

export default useStudentEnquiries;