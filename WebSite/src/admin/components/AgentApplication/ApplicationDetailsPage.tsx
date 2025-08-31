/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAgentApplications, { AgentApplication } from "../../../hooks/useAgentApplications";
import { format } from "date-fns";
import { Loader2, Home, ChevronRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ApplicationDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth()
    const navigate = useNavigate();

    const {
        getApplicationById,
        approveAgentApplication,
        rejectAgentApplication,
        loading,
        error,
        deleteAgentApplication
    } = useAgentApplications();

    const [application, setApplication] = useState<AgentApplication | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Load specific application by ID
    useEffect(() => {
        fetchApp();
    }, [id]);

    const fetchApp = async () => {
        try {
            if (id) {
                const app = await getApplicationById(id);
                setApplication(app);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleApprove = async () => {
        if (!user?.id) {
            alert("No User ID found");
            return;
        }
        setProcessing(true);
        try {
            await approveAgentApplication(application!.id, user?.id);
            alert("Application approved!");
            setApplication({ ...application!, status: "approved" });
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!user?.id) {
            alert("No User ID found");
            return;
        }
        setProcessing(true);
        try {
            await rejectAgentApplication(application!.id, rejectReason, user?.id);
            setShowRejectModal(false);
            alert("Application rejected!");
            setApplication({ ...application!, status: "rejected" });
            setRejectReason("");
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (!id) {
            alert("No application ID found");
            return;
        }
        setProcessing(true);
        try {
            await deleteAgentApplication(id);
            alert("Application deleted successfully!");
            navigate('/adminpanel/career/agentapplication');
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete application. Please try again.");
        } finally {
            setProcessing(false);
        }
    }
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
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-4">
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
                <button
                    onClick={() => window.location.reload()}
                    className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-gray-500 
                                                text-gray-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-gray-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                </button>
            </div>
        );
    }

    // --- No data
    if (!application) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center py-12 text-gray-500">
                    <p className="mb-4">Application not found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
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
            <dt className="text-sm font-semibold text-gray-600">{label}</dt>
            <dd className="text-sm text-gray-900 md:col-span-2">
                {value || <span className="text-gray-400 italic">Not provided</span>}
            </dd>
        </dl>
    );

    // --- Page UI
    return (
        <div className="max-w-7xl mx-auto px-6 pb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Agent Applications Details
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
                    <Link
                        to="/adminpanel"
                        className="hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Dashboard
                    </Link>

                    <ChevronRight className="w-4 h-4 text-gray-400" />

                    <Link
                        to="/adminpanel/career/agentapplication"
                        className="hover:text-blue-600 transition-colors"
                    >
                        Agent Applications
                    </Link>

                    <ChevronRight className="w-4 h-4 text-gray-400" />

                    <span className="text-blue-600 font-semibold">
                        Agent Application Details
                    </span>
                </div>
            </nav>

            {/* Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        Application :   <span className=" text-blue-800"> {application.tradingName}</span>
                    </h2>
                    <div>
                        <div className="flex flex-column items-center gap-3">
                            <span className="text-sm text-gray-500">
                                Created: {format(new Date(application.createdAt || new Date()), "MMM dd, yyyy HH:mm")}
                            </span>
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${application.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : application.status === "rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                            >
                                {application.status.toUpperCase()}
                            </span>
                        </div>
                        {application.rejectionReason &&
                            <div>Reason: <span className=" text-sm text-red-700">{application.rejectionReason}</span></div>
                        }

                    </div>
                </div>

                <div className="px-6 py-6">
                    {/* Business Information */}
                    {renderSection("Business Information", (
                        <>
                            {renderField("Applying As", application.applyingAs)}
                            {renderField("Trading Name", application.tradingName)}
                            {renderField("Business Registration Number", application.businessRegistrationNumber)}
                            {renderField("Company Phone", application.companyPhone)}
                            {renderField("Company Email", application.emailAddress)}
                            {renderField("Country", application.country)}
                            {renderField("Current Address", application.currentAddress)}
                            {renderField("Primary Office Location", application.primaryOfficeLocation)}
                            {renderField("Website", application.website)}
                        </>
                    ))}

                    {/* Applicant Information */}
                    {renderSection("Applicant Information", (
                        <>
                            {renderField("Name", `${application.firstName} ${application.lastName}`)}
                            {renderField("Position", application.position)}
                            {renderField("Personal Phone", application.personalPhone)}
                            {renderField("Personal Email", application.personalEmail)}
                        </>
                    ))}

                    {/* Status & Actions */}
                    {renderSection("Application Status", (
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleApprove}
                                disabled={application.status === "approved" || processing}
                                className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-green-500 
                                                text-green-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-green-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Approve
                            </button>
                            <button
                                onClick={() => setShowRejectModal(true)}
                                disabled={application.status === "rejected" || processing}
                                className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-red-500 
                                                text-red-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-red-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Reject
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={processing}
                                className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-yellow-500 
                                                text-yellow-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-yellow-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Reject Application</h3>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="w-full border rounded-lg p-3 text-sm mb-4 h-32"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                disabled={processing}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectReason.trim() || processing}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetailsPage;