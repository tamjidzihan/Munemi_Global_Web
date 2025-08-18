/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useStudentEnquiries, {
    StudentEnquiry,
    UploadedFile,
} from "../../../hooks/useStudentEnquiry";
import { format } from "date-fns";
import { Loader2, FileText, Home, ChevronRight } from "lucide-react";

const ViewStudentQuery = () => {
    const { id } = useParams<{ id: string }>();
    const { getEnquiryById } = useStudentEnquiries();
    const [enquiry, setEnquiry] = useState<StudentEnquiry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnquiry = async () => {
            try {
                if (id) {
                    const data = await getEnquiryById(id);
                    setEnquiry(data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load enquiry");
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiry();
    }, [id]);

    // --- Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    // --- Error state
    if (error) {
        return (
            <div className="max-w-3xl mx-auto mt-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <svg
                        className="h-5 w-5 text-red-500 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 
              1.414L8.586 10l-1.293 1.293a1 1 0 
              101.414 1.414L10 11.414l1.293 1.293a1 1 0 
              001.414-1.414L11.414 10l1.293-1.293a1 1 
              0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    // --- No data
    if (!enquiry) {
        return <div className="text-center py-12 text-gray-500">No enquiry data found</div>;
    }

    // --- Reusable UI helpers
    const renderSection = (title: string, children: React.ReactNode) => (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                {title}
            </h3>
            <div className="space-y-4">{children}</div>
        </div>
    );

    const renderField = (label: string, value: string | null | undefined) => (
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-600">{label}</dt>
            <dd className="text-sm text-gray-900 md:col-span-2">
                {value || <span className="text-gray-400 italic">Not provided</span>}
            </dd>
        </dl>
    );

    const renderDocument = (doc: UploadedFile) => (
        <div
            key={doc.filename}
            className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition"
        >
            <div className="flex items-center gap-3">
                {doc.mimetype.includes("image") ? (
                    <img
                        className="h-12 w-12 rounded object-cover"
                        src={`${import.meta.env.VITE_APICLIENT}/uploads/${doc.filename}`}
                        alt={doc.originalname}
                    />
                ) : (
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded">
                        <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                )}
                <div>
                    <p className="text-sm font-medium text-gray-900">{doc.originalname}</p>
                    <p className="text-xs text-gray-500">
                        {(doc.size / 1024).toFixed(2)} KB
                    </p>
                </div>
            </div>
            <a
                href={`${import.meta.env.VITE_APICLIENT}/uploads/${doc.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
                View
            </a>
        </div>
    );

    // --- Page UI
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <nav className=" place-self-end flex items-center gap-2 text-sm mb-6 text-gray-600">
                <Link to="/adminpanel" className="hover:text-blue-600 flex items-center gap-1">
                    <Home className="w-4 h-4" /> Dashboard
                </Link>
                <span>  <ChevronRight className="w-4 h-4 text-gray-400" /></span>
                <Link to="/adminpanel/student-enquiry" className="hover:text-blue-600">
                    Student Enquiry
                </Link>
                <span>  <ChevronRight className="w-4 h-4 text-gray-400" /></span>
                <span className=" text-blue-600 font-semibold">Enquiry Details</span>
            </nav>

            {/* Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {enquiry.firstName} {enquiry.lastName}'s Enquiry
                    </h2>
                    <p className="text-sm text-gray-500">
                        Created: {format(new Date(enquiry.createdAt), "MMM dd, yyyy HH:mm")}
                    </p>
                </div>
                <div className="px-6 py-6">
                    {/* Sections */}
                    {renderSection("Personal Details", (
                        <>
                            {renderField("First Name", enquiry.firstName)}
                            {renderField("Last Name", enquiry.lastName)}
                            {renderField("Date of Birth", enquiry.dateOfBirth ? format(new Date(enquiry.dateOfBirth), "MMM dd, yyyy") : null)}
                            {renderField("Email", enquiry.email)}
                            {renderField("Phone", enquiry.phone)}
                        </>
                    ))}

                    {renderSection("Address Details", (
                        <>
                            {renderField("Street", enquiry.street)}
                            {renderField("City", enquiry.city)}
                            {renderField("State", enquiry.state)}
                            {renderField("Zip Code", enquiry.zipCode)}
                            {renderField("Country", enquiry.country)}
                        </>
                    ))}

                    {renderSection("Education Background", (
                        enquiry.educationBackground.length > 0 ? (
                            enquiry.educationBackground.map((edu, index) => (
                                <div key={index} className="border rounded-md p-4 mb-4 bg-gray-50">
                                    {renderField("Institution", edu.institution)}
                                    {renderField("Degree", edu.degree)}
                                    {renderField("Field of Study", edu.fieldOfStudy)}
                                    {renderField("Year Completed", edu.yearCompleted)}
                                    {renderField("Grades", edu.grades)}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No education background provided</p>
                        )
                    ))}

                    {renderSection("English Test Scores", (
                        <>
                            {renderField("Test Type", enquiry.englishTestScores.testType)}
                            {renderField("Overall Score", enquiry.englishTestScores.overallScore)}
                            {renderField("Reading", enquiry.englishTestScores.reading)}
                            {renderField("Writing", enquiry.englishTestScores.writing)}
                            {renderField("Listening", enquiry.englishTestScores.listening)}
                            {renderField("Speaking", enquiry.englishTestScores.speaking)}
                            {renderField("Test Date", enquiry.englishTestScores.testDate)}
                        </>
                    ))}

                    {renderSection("Study Plans", renderField("Preferred Intake", enquiry.preferredIntake as string))}

                    {renderSection("Visa History", (
                        <>
                            {renderField("Has Visa Refusal History", enquiry.visaRefusalDetails.hasRefusalHistory ? "Yes" : "No")}
                            {enquiry.visaRefusalDetails.hasRefusalHistory && (
                                <>
                                    {renderField("Country", enquiry.visaRefusalDetails.country)}
                                    {renderField("Reason", enquiry.visaRefusalDetails.reason)}
                                    {renderField("Date of Refusal", enquiry.visaRefusalDetails.dateOfRefusal)}
                                    {renderField("Applied Again", enquiry.visaRefusalDetails.appliedForVisaAgain)}
                                </>
                            )}
                        </>
                    ))}

                    {renderSection("Emergency Contact", (
                        <>
                            {renderField("Name", enquiry.emergencyContact.name)}
                            {renderField("Relationship", enquiry.emergencyContact.relationship)}
                            {renderField("Phone", enquiry.emergencyContact.phone)}
                            {renderField("Email", enquiry.emergencyContact.email)}
                            {renderField("Address", enquiry.emergencyContact.address)}
                        </>
                    ))}

                    {renderSection("Passport Details", (
                        <>
                            {renderField("Passport Number", enquiry.passportDetails.passportNumber)}
                            {renderField("Issue Date", enquiry.passportDetails.issueDate)}
                            {renderField("Expiry Date", enquiry.passportDetails.expiryDate)}
                            {renderField("Issue Authority", enquiry.passportDetails.issueAuthority)}
                        </>
                    ))}

                    {renderSection("Documents", (
                        enquiry.documents.length > 0 ? (
                            <div className="space-y-3">{enquiry.documents.map(renderDocument)}</div>
                        ) : (
                            <p className="text-sm text-gray-500">No documents uploaded</p>
                        )
                    ))}

                    {renderSection("Additional Information", (
                        <>
                            {renderField("Visa Type", enquiry.visaType)}
                            {renderField("Visa Expiry Date", enquiry.visaExpiryDate)}
                            {renderField("Passport Country", enquiry.passportCountry)}
                            {renderField("Comments", enquiry.comments)}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewStudentQuery;
