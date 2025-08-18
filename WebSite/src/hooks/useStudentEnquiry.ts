import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";


export interface ApiFetch {
    success: boolean
    data: StudentEnquiry[];
}

export interface educationBackground {
    institution: string
    degree: string
    fieldOfStudy: string
    yearCompleted: string
    grades: string
}


export interface TestResult {
    testType: string;
    overallScore: string;
    reading: string;
    writing: string;
    listening: string;
    speaking: string;
    testDate: string;
}

export interface emergencyContact {
    name: string,
    relationship: string,
    phone: string,
    email: string,
    address: string
}
export interface passportDetails {
    passportNumber: string,
    issueDate: string,
    expiryDate: string,
    issueAuthority: string,
}
export interface passportDetails {
    passportNumber: string,
    issueDate: string,
    expiryDate: string,
    issueAuthority: string,
}

export interface visaRefusalDetails {
    hasRefusalHistory: boolean;
    country: string;
    reason?: string;
    dateOfRefusal?: string;
    refusalLetter?: string;
    appliedForVisaAgain: string
}

export interface StudentEnquiry {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    interestedServices: string[];
    educationBackground: educationBackground[]
    englishTestScores: TestResult;
    documents: UploadedFile[];
    emergencyContact: emergencyContact;
    passportDetails: passportDetails;
    preferredIntake: string | boolean;
    visaRefusalDetails: visaRefusalDetails;
    createdAt: string;
    updatedAt: string;
}

export interface UploadedFile {
    filename: string;
    originalname: string;
    path: string;
    mimetype: string;
    size: number;
}

const useStudentEnquiries = () => {
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalEnquiries = enquiries.length;

    // 🔹 Fetch all enquiries
    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await apiClient.get<ApiFetch>("/student-enquiries");
                setEnquiries(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    // 🔹 Get by ID
    const getEnquiryById = async (id: string): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const { data } = await apiClient.get<StudentEnquiry>(`/student-enquiries/${id}`);
            return data;
        } catch (err) {
            setError("Failed to fetch enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Create (supports FormData for files)
    const createEnquiry = async (
        enquiry: Omit<StudentEnquiry, "id" | "createdAt" | "updatedAt">
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(enquiry).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else if (typeof value === "object" && value !== null) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, String(value));
                }
            });

            const { data } = await apiClient.post<StudentEnquiry>("/student-enquiries", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setEnquiries((prev) => [data, ...prev]);
            return data;
        } catch (err) {
            setError("Failed to create enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Update (PUT instead of PATCH)
    const updateEnquiry = async (
        id: string,
        updatedEnquiry: Partial<StudentEnquiry>
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(updatedEnquiry).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else if (typeof value === "object" && value !== null) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, String(value));
                }
            });

            const { data } = await apiClient.patch<StudentEnquiry>(
                `/student-enquiries/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setEnquiries((prev) =>
                prev.map((enq) => (enq.id === id ? data : enq))
            );
            return data;
        } catch (err) {
            setError("Failed to update enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Delete
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
