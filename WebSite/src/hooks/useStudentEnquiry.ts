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

const useStudentEnquiries = () => {
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalEnquiries = enquiries.length;

    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get("/student-enquiries");
                setEnquiries(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);


    const getEnquiryById = async (id: string): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/student-enquiries/${id}`);
            return response.data;
        } catch (err) {
            setError("Failed to fetch enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createEnquiry = async (
        enquiry: Omit<StudentEnquiry, "id" | "createdAt" | "updatedAt">
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const response = await apiClient.post("/student-enquiries", enquiry);
            setEnquiries((prev) => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            setError("Failed to create enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateEnquiry = async (
        id: string,
        updatedEnquiry: Partial<StudentEnquiry>
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const response = await apiClient.patch(
                `/student-enquiries/${id}`,
                updatedEnquiry
            );
            setEnquiries((prev) =>
                prev.map((enq) => (enq.id === id ? response.data : enq))
            );
            return response.data;
        } catch (err) {
            setError("Failed to update enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteEnquiry = async (id: string): Promise<void> => {
        setLoading(true);
        try {
            await apiClient.delete(`/student-enquiries/${id}`);
            setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
        } catch (err) {
            setError("Failed to delete enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        totalEnquiries,
        enquiries,
        loading,
        error,
        setEnquiries,
        getEnquiryById,
        createEnquiry,
        updateEnquiry,
        deleteEnquiry,
    };
};

export default useStudentEnquiries;
