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
        totalPages: number;
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
    outOf: string;
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

export interface TravelHistory {
    country: string;
    formDate: string;
    toDate: string;
    reasonOfVisit: string
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
    uploadDate: string;
}

export interface Address {
    id?: string;
    addressType: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface Agent {
    id: string;
    tradingName: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    application?: {
        businessRegistrationNumber: string;
        companyPhone: string;
        country: string;
    };
}

// Define empty/default types for optional objects
export interface EmptyTestResult {
    testType?: string;
    overallScore?: string;
    reading?: string;
    writing?: string;
    listening?: string;
    speaking?: string;
    testDate?: string;
}

export interface EmptyEmergencyContact {
    name?: string;
    relationship?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface EmptyPassportDetails {
    passportNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    issueAuthority?: string;
}

export interface EmptyVisaRefusalDetails {
    hasRefusalHistory?: boolean;
    country?: string;
    reason?: string;
    dateOfRefusal?: string;
    refusalLetter?: string;
    appliedForVisaAgain?: string;
}

// ---------- Main Model ----------
export interface StudentEnquiry {
    id: string;
    agentId: string;
    agent?: Agent;

    // --- Personal Details ---
    givenName: string;
    surName: string;
    gender: 'Male' | 'Female' | null;
    currentOccupation: string;
    dateOfBirth: string | null;
    nidNumber: string;

    // --- Contact Details ---
    phone: string;
    email: string;

    // --- Family Details ---
    fathersName: string;
    fathersNid: string;
    fathersPhone: string | null;
    mothersName: string;
    mothersNid: string;
    mothersPhone: string | null;
    spouseName: string | null;
    spouseNid: string | null;
    spousePhone: string | null;
    numberOfChildren: string | null;
    numberOfBrother: string | null;
    numberOfSister: string | null;

    // --- Arrays and JSON fields ---
    interestedServices: string[];
    educationBackground: EducationBackground[];
    englishTestScores: TestResult | EmptyTestResult;
    emergencyContact: EmergencyContact | EmptyEmergencyContact;
    passportDetails: PassportDetails | EmptyPassportDetails;
    visaRefusalDetails: VisaRefusalDetails | EmptyVisaRefusalDetails;
    previousPassportNumbers: string[];
    travelHistory: TravelHistory[];

    // --- File Uploads ---
    passportDocument: UploadedFile;
    cvDocument: UploadedFile;

    // --- Addresses ---
    addresses: Address[];

    // --- Additional fields ---
    hasPreviousPassport: boolean;

    createdAt: string;
    updatedAt: string;
}

// ---------- Hook ----------
const useStudentEnquiries = () => {
    const [enquiries, setEnquiries] = useState<StudentEnquiry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10000,
        total: 0,
        totalPages: 0
    });

    const totalEnquiries = enquiries.length;

    // Fetch all enquiries with pagination
    const fetchEnquiries = async (options: {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
        agentId?: string;
    } = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            Object.entries(options).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, String(value));
                }
            });

            const { data } = await apiClient.get<ApiListResponse<StudentEnquiry>>(
                `/student-enquiries?${params.toString()}`
            );
            setEnquiries(data.data);
            setPagination(data.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
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
        enquiryData: Omit<StudentEnquiry, "id" | "createdAt" | "updatedAt" | "agent">,
        files?: {
            passport?: File;
            cv?: File;
        }
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Append all non-file fields
            Object.entries(enquiryData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value) || typeof value === "object") {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            // Append files if provided
            if (files?.passport) {
                formData.append('passport', files.passport);
            }
            if (files?.cv) {
                formData.append('cv', files.cv);
            }

            const { data } = await apiClient.post<ApiSingleResponse<StudentEnquiry>>(
                "/student-enquiries",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setEnquiries((prev) => [data.data, ...prev]);
            setPagination(prev => ({
                ...prev,
                total: prev.total + 1,
                totalPages: Math.ceil((prev.total + 1) / prev.limit)
            }));

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
        updatedData: Partial<StudentEnquiry>,
        files?: {
            passport?: File;
            cv?: File;
        }
    ): Promise<StudentEnquiry> => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Append all non-file fields
            Object.entries(updatedData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value) || typeof value === "object") {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            // Append files if provided
            if (files?.passport) {
                formData.append('passport', files.passport);
            }
            if (files?.cv) {
                formData.append('cv', files.cv);
            }

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
            setPagination(prev => ({
                ...prev,
                total: prev.total - 1,
                totalPages: Math.ceil((prev.total - 1) / prev.limit)
            }));
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
        pagination,
        fetchEnquiries,
        getEnquiryById,
        createEnquiry,
        updateEnquiry,
        deleteEnquiry,
        setEnquiries,
    };
};

export default useStudentEnquiries;