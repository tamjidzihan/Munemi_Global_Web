/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useStudentEnquiries, {
    StudentEnquiry,
    UploadedFile,
    EducationBackground,
    Address
} from "../../../hooks/useStudentEnquiry";
import { format } from "date-fns";
import { Loader2, FileText, Home, ChevronRight, Download, ArrowLeft } from "lucide-react";
import logo from "../../../assets/logo_munemi_global.png"
import { pdfGenerator } from "../../../Utils/pdfGenerator";

const ViewStudentQuery = () => {
    const { id } = useParams<{ id: string }>();
    const { getEnquiryById } = useStudentEnquiries();
    const [enquiry, setEnquiry] = useState<StudentEnquiry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);

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



    const downloadAsPDF = async () => {
        if (!enquiry) return;

        setDownloading(true);
        try {
            await pdfGenerator.downloadStudentEnquiryPDF(enquiry, logo);
        } catch (err) {
            console.error('Error generating PDF:', err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

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

    const renderDocument = (doc: UploadedFile, title: string) => (
        <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded">
                        <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{doc.originalname}</p>
                        <p className="text-xs text-gray-500">
                            {(doc.size / 1024).toFixed(2)} KB
                        </p>
                        <p className="text-xs text-gray-400">
                            Uploaded: {format(new Date(doc.uploadDate), "MMM dd, yyyy")}
                        </p>
                    </div>
                </div>
                <a
                    href={`${import.meta.env.VITE_APICLIENT || ''}/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    View
                </a>
            </div>
        </div>
    );

    const renderAddress = (address: Address, title: string) => (
        <div className="border rounded-md p-4 mb-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
            {renderField("Address Type", address.addressType)}
            {renderField("Street", address.street)}
            {renderField("City", address.city)}
            {renderField("State", address.state)}
            {renderField("Zip Code", address.zipCode)}
            {renderField("Country", address.country)}
        </div>
    );

    // Safely access nested object properties
    const safeGet = (obj: any, key: string, defaultValue: any = null) => {
        return obj && obj[key] !== undefined ? obj[key] : defaultValue;
    };

    // --- Page UI
    return (
        <div className="max-w-7xl mx-auto px-6 pb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Student Enquire Details
            </h1>
            {/* Breadcrumb */}
            <nav className="flex items-center justify-between gap-4 text-sm mb-6 text-gray-600">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-1 px-3 py-1 rounded-md  transition-colors cursor-pointer hover:text-blue-600 hover:underline"
                >
                    <ArrowLeft size={16} />
                    Go Back
                </button>
                <div className="flex items-center gap-2">
                    <Link to="/adminpanel" className="hover:text-blue-600 flex items-center gap-1">
                        <Home className="w-4 h-4" /> Dashboard
                    </Link>
                    <span><ChevronRight className="w-4 h-4 text-gray-400" /></span>
                    <Link to="/adminpanel/student-enquiry" className="hover:text-blue-600">
                        Student Enquiry
                    </Link>
                    <span><ChevronRight className="w-4 h-4 text-gray-400" /></span>
                    <span className="text-blue-600 font-semibold">Enquiry Details</span>
                </div>
            </nav>
            {/* Header with Download Button */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={downloadAsPDF}
                    disabled={downloading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    {downloading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Download className="h-4 w-4" />
                    )}
                    Download PDF
                </button>
            </div>
            {/* Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        Enquiry : <span className=" text-blue-800"> {enquiry.givenName} {enquiry.surName}
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500">
                        Created: {format(new Date(enquiry.createdAt), "MMM dd, yyyy HH:mm")}
                    </p>
                </div>
                <div className="px-6 py-6">
                    {/* Personal Details */}
                    {renderSection("Personal Details", (
                        <>
                            {renderField("Given Name", enquiry.givenName)}
                            {renderField("Surname", enquiry.surName)}
                            {renderField("Gender", enquiry.gender)}
                            {renderField("Current Occupation", enquiry.currentOccupation)}
                            {renderField("Date of Birth", enquiry.dateOfBirth ? format(new Date(enquiry.dateOfBirth), "MMM dd, yyyy") : null)}
                            {renderField("NID Number", enquiry.nidNumber)}
                            {renderField("Email", enquiry.email)}
                            {renderField("Phone", enquiry.phone)}
                        </>
                    ))}

                    {/* Family Details */}
                    {renderSection("Family Details", (
                        <>
                            {renderField("Father's Name", enquiry.fathersName)}
                            {renderField("Father's NID", enquiry.fathersNid)}
                            {renderField("Father's Phone", enquiry.fathersPhone)}
                            {renderField("Mother's Name", enquiry.mothersName)}
                            {renderField("Mother's NID", enquiry.mothersNid)}
                            {renderField("Mother's Phone", enquiry.mothersPhone)}
                            {renderField("Spouse Name", enquiry.spouseName)}
                            {renderField("Spouse NID", enquiry.spouseNid)}
                            {renderField("Spouse Phone", enquiry.spousePhone)}
                            {renderField("Number of Children", enquiry.numberOfChildren)}
                        </>
                    ))}

                    {/* Addresses */}
                    {renderSection("Addresses", (
                        enquiry.addresses && enquiry.addresses.length > 0 ? (
                            enquiry.addresses.map((address, index) => (
                                renderAddress(address, `Address ${index + 1} (${address.addressType})`)
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No addresses provided</p>
                        )
                    ))}

                    {/* Visa Information */}
                    {renderSection("Visa Information", (
                        <>
                            {renderField("Visa Type", enquiry.visaType)}
                            {renderField("Visa Expiry Date", enquiry.visaExpiryDate ? format(new Date(enquiry.visaExpiryDate), "MMM dd, yyyy") : null)}
                            {renderField("Passport Country", enquiry.passportCountry)}
                        </>
                    ))}

                    {/* Interested Services */}
                    {renderSection("Interested Services", (
                        enquiry.interestedServices.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {enquiry.interestedServices.map((service, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No services selected</p>
                        )
                    ))}

                    {/* Education Background */}
                    {renderSection("Education Background", (
                        enquiry.educationBackground.length > 0 ? (
                            enquiry.educationBackground.map((edu: EducationBackground, index) => (
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

                    {/* English Test Scores */}
                    {renderSection("English Test Scores", (
                        enquiry.englishTestScores && Object.keys(enquiry.englishTestScores).length > 0 ? (
                            <>
                                {renderField("Test Type", safeGet(enquiry.englishTestScores, 'testType'))}
                                {renderField("Overall Score", safeGet(enquiry.englishTestScores, 'overallScore'))}
                                {renderField("Reading", safeGet(enquiry.englishTestScores, 'reading'))}
                                {renderField("Writing", safeGet(enquiry.englishTestScores, 'writing'))}
                                {renderField("Listening", safeGet(enquiry.englishTestScores, 'listening'))}
                                {renderField("Speaking", safeGet(enquiry.englishTestScores, 'speaking'))}
                                {renderField("Test Date", safeGet(enquiry.englishTestScores, 'testDate'))}
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">No test scores provided</p>
                        )
                    ))}

                    {/* Emergency Contact */}
                    {renderSection("Emergency Contact", (
                        enquiry.emergencyContact && Object.keys(enquiry.emergencyContact).length > 0 ? (
                            <>
                                {renderField("Name", safeGet(enquiry.emergencyContact, 'name'))}
                                {renderField("Relationship", safeGet(enquiry.emergencyContact, 'relationship'))}
                                {renderField("Phone", safeGet(enquiry.emergencyContact, 'phone'))}
                                {renderField("Email", safeGet(enquiry.emergencyContact, 'email'))}
                                {renderField("Address", safeGet(enquiry.emergencyContact, 'address'))}
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">No emergency contact provided</p>
                        )
                    ))}

                    {/* Passport Details */}
                    {renderSection("Passport Details", (
                        <>
                            {renderField("Has Previous Passport", enquiry.hasPreviousPassport ? "Yes" : "No")}
                            {enquiry.previousPassportNumbers && enquiry.previousPassportNumbers.length > 0 && (
                                renderField("Previous Passport Numbers", enquiry.previousPassportNumbers.join(", "))
                            )}
                            {enquiry.passportDetails && Object.keys(enquiry.passportDetails).length > 0 && (
                                <>
                                    {renderField("Passport Number", safeGet(enquiry.passportDetails, 'passportNumber'))}
                                    {renderField("Issue Date", safeGet(enquiry.passportDetails, 'issueDate'))}
                                    {renderField("Expiry Date", safeGet(enquiry.passportDetails, 'expiryDate'))}
                                    {renderField("Issue Authority", safeGet(enquiry.passportDetails, 'issueAuthority'))}
                                </>
                            )}
                        </>
                    ))}

                    {/* Visa Refusal Details */}
                    {renderSection("Visa Refusal History", (
                        enquiry.visaRefusalDetails && Object.keys(enquiry.visaRefusalDetails).length > 0 ? (
                            <>
                                {renderField("Has Refusal History", safeGet(enquiry.visaRefusalDetails, 'hasRefusalHistory') ? "Yes" : "No")}
                                {safeGet(enquiry.visaRefusalDetails, 'hasRefusalHistory') && (
                                    <>
                                        {renderField("Country", safeGet(enquiry.visaRefusalDetails, 'country'))}
                                        {renderField("Reason", safeGet(enquiry.visaRefusalDetails, 'reason'))}
                                        {renderField("Date of Refusal", safeGet(enquiry.visaRefusalDetails, 'dateOfRefusal'))}
                                        {renderField("Applied Again", safeGet(enquiry.visaRefusalDetails, 'appliedForVisaAgain'))}
                                    </>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">No visa refusal history provided</p>
                        )
                    ))}

                    {/* Documents */}
                    {renderSection("Documents", (
                        <>
                            {enquiry.passportDocument && Object.keys(enquiry.passportDocument).length > 0 && (
                                renderDocument(enquiry.passportDocument, "Passport Document")
                            )}
                            {enquiry.cvDocument && Object.keys(enquiry.cvDocument).length > 0 && (
                                renderDocument(enquiry.cvDocument, "CV Document")
                            )}
                            {(!enquiry.passportDocument || Object.keys(enquiry.passportDocument).length === 0) &&
                                (!enquiry.cvDocument || Object.keys(enquiry.cvDocument).length === 0) && (
                                    <p className="text-sm text-gray-500">No documents uploaded</p>
                                )}
                        </>
                    ))}

                    {/* Agent Information */}
                    {enquiry.agent && renderSection("Agent Information", (
                        <>
                            {renderField("Agent Name", `${enquiry.agent.firstName} ${enquiry.agent.lastName}`)}
                            {renderField("Trading Name", enquiry.agent.tradingName)}
                            {renderField("Email", enquiry.agent.emailAddress)}
                            {enquiry.agent.application && (
                                <>
                                    {renderField("Business Registration", enquiry.agent.application.businessRegistrationNumber)}
                                    {renderField("Company Phone", enquiry.agent.application.companyPhone)}
                                    {renderField("Country", enquiry.agent.application.country)}
                                    <button
                                        onClick={() => window.open(`/adminpanel/agents/view/${enquiry.agent?.id}`, '_blank')}
                                        className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-green-500 
                                                text-green-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-green-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer">
                                        View Agent Detail

                                    </button>
                                </>
                            )}
                        </>
                    ))}

                    {/* System Information */}
                    {renderSection("System Information", (
                        <>
                            {renderField("Created At", format(new Date(enquiry.createdAt), "MMM dd, yyyy HH:mm"))}
                            {renderField("Updated At", format(new Date(enquiry.updatedAt), "MMM dd, yyyy HH:mm"))}
                            {renderField("Enquiry ID", enquiry.id)}
                            {renderField("Agent ID", enquiry.agentId)}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewStudentQuery;