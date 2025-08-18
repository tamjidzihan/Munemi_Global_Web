import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

// ---------- API Types ----------
export interface ApiListResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface ApiSingleResponse<T> {
    success: boolean;
    data: T;
}

// ---------- Sub Interfaces ----------
export interface EducationBackground {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    yearCompleted: string;
    grades: string;
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

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
    email: string;
    address: string;
}

export interface PassportDetails {
    passportNumber: string;
    issueDate: string;
    expiryDate: string;
    issueAuthority: string;
}

export interface VisaRefusalDetails {
    hasRefusalHistory: boolean;
    country: string;
    reason?: string;
    dateOfRefusal?: string;
    refusalLetter?: string;
    appliedForVisaAgain: string;
}

export interface UploadedFile {
    filename: string;
    originalname: string;
    path: string;
    mimetype: string;
    size: number;
}

// ---------- Main Model ----------
export interface StudentEnquiry {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string | null;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;

    interestedServices: string[];
    educationBackground: EducationBackground[];
    englishTestScores: TestResult;
    documents: UploadedFile[];
    emergencyContact: EmergencyContact;
    passportDetails: PassportDetails;
    visaRefusalDetails: VisaRefusalDetails;

    preferredIntake: string | boolean;

    // Extra fields from API
    visaType?: string | null;
    visaExpiryDate?: string | null;
    passportCountry?: string | null;
    comments?: string | null;

    createdAt: string;
    updatedAt: string;
}

// ---------- Hook ----------
const useStudentEnquiries = () => {
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalEnquiries = enquiries.length;

    // Fetch all enquiries
    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await apiClient.get<ApiListResponse<StudentEnquiry>>(
                    "/student-enquiries"
                );
                setEnquiries(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    // Get by ID
    const getEnquiryById = async (id: string): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const { data } = await apiClient.get<ApiSingleResponse<StudentEnquiry>>(
                `/student-enquiries/${id}`
            );
            return data.data;
        } catch (err) {
            setError("Failed to fetch enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Create
    const createEnquiry = async (
        enquiry: Omit<StudentEnquiry, "id" | "createdAt" | "updatedAt">
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            let formData: FormData;
            const isFormData = enquiry instanceof FormData;

            if (!isFormData) {
                formData = new FormData();
                Object.entries(enquiry).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        if (Array.isArray(value) || typeof value === "object") {
                            formData.append(key, JSON.stringify(value));
                        } else {
                            formData.append(key, String(value));
                        }
                    }
                });
            } else {
                formData = enquiry as FormData;
            }

            const { data } = await apiClient.post<ApiSingleResponse<StudentEnquiry>>(
                "/student-enquiries",
                isFormData ? enquiry : formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setEnquiries((prev) => [data.data, ...prev]);
            return data.data;
        } catch (err) {
            setError("Failed to create enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update
    const updateEnquiry = async (
        id: string,
        updatedEnquiry: Partial<StudentEnquiry>
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(updatedEnquiry).forEach(([key, value]) => {
                if (Array.isArray(value) || typeof value === "object") {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, String(value));
                }
            });

            const { data } = await apiClient.patch<ApiSingleResponse<StudentEnquiry>>(
                `/student-enquiries/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setEnquiries((prev) => prev.map((enq) => (enq.id === id ? data.data : enq)));
            return data.data;
        } catch (err) {
            setError("Failed to update enquiry");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete
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
