import { useEffect, useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export interface TestResult {
    reading: string;
    writing: string;
    listening: string;
    speaking: string;
    overAll: string;
}

export interface AcademicQualification {
    degreeName: string;
    institutionName: string;
    passingYear: string;
}

export interface VisaHistory {
    heldVisa: boolean;
    heldVisaDetails?: string;
    visaRefusal: boolean;
    visaRefusalDetails?: string;
    visaViolation: boolean;
    visaViolationDetails?: string;
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
    que1: string;
    que2: string;
    que3: string;
    visaHistory: VisaHistory;
    createdAt: string;
    updatedAt: string;
}

interface UseStudentEnquiriesReturn {
    totalEnquiries: number;
    enquiries: StudentEnquiry[];
    loading: boolean;
    error: string | null;
    fetchEnquiries: () => Promise<void>;
    createEnquiry: (enquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<StudentEnquiry>;
    updateEnquiry: (id: string, updatedEnquiry: Partial<StudentEnquiry>) => Promise<void>;
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
            const response = await apiClient.get<StudentEnquiry[]>('/student-enquiries');
            setEnquiries(response.data);
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
            const response = await apiClient.post<StudentEnquiry>('/student-enquiries', enquiry);
            setEnquiries(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create student enquiry';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing student enquiry
    const updateEnquiry = useCallback(async (id: string, updatedEnquiry: Partial<StudentEnquiry>): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.patch<StudentEnquiry>(`/student-enquiries/${id}`, updatedEnquiry);
            setEnquiries(prev => prev.map(enquiry =>
                enquiry.id === id ? response.data : enquiry
            ));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update student enquiry');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a student enquiry
    const deleteEnquiry = useCallback(async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await apiClient.delete(`/student-enquiries/${id}`);
            setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
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