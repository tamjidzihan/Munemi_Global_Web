/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
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
    _id: string;
    studentName: string;
    email: string;
    phone: string;
    address: string;
    englishProficiencyTest: 'IELTS' | 'PTE' | 'TOEFL' | 'Duolingo';
    testResult: TestResult;
    academicQualification: AcademicQualification[];
    que1: string;
    que2: string;
    que3: string;
    visaHistory: VisaHistory;
    createdAt: string;
    updatedAt: string;
}


const useStudentEnquiries = () => {
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalEnquiries = enquiries.length

    // Fetch all student enquiries
    useEffect(() => {
        setLoading(true);
        const getEnquiries = async () => {
            try {
                const response = await apiClient.get('/student-enquiries');
                setEnquiries(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch student enquiries');
                setLoading(false);
            }
        };
        getEnquiries();
    }, []);


    // Create a new student enquiry
    const createEnquiry = async (enquiry: Omit<StudentEnquiry, '_id' | 'createdAt' | 'updatedAt'>) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/student-enquiries', enquiry);
            setEnquiries((prev) => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError('Failed to create student enquiry');
            setLoading(false);
            throw err;
        }
    };

    // Update an existing student enquiry
    const updateEnquiry = async (id: string, updatedEnquiry: Partial<StudentEnquiry>) => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/student-enquiries/${id}`, updatedEnquiry);
            setEnquiries((prev) => prev.map((enquiry) => (enquiry._id === id ? response.data : enquiry)));
            setLoading(false);
        } catch (err) {
            setError('Failed to update student enquiry');
            setLoading(false);
        }
    };

    // Delete a student enquiry
    const deleteEnquiry = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/student-enquiries/${id}`);
            setEnquiries((prev) => prev.filter((enquiry) => enquiry._id !== id));
            setLoading(false);
        } catch (err) {
            setError('Failed to delete student enquiry');
            setLoading(false);
        }
    };

    return {
        totalEnquiries,
        enquiries,
        loading,
        error,
        setEnquiries,
        createEnquiry,
        updateEnquiry,
        deleteEnquiry,
    };

}


export default useStudentEnquiries;