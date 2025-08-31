/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAgents, { Agent } from "../../../hooks/useAgents";
import { format } from "date-fns";
import { Loader2, Home, ChevronRight, Mail, Phone, Globe, MapPin, User, Briefcase, ArrowLeft } from "lucide-react";

const AgentDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        fetchAgentById,
        deactivateAgent,
        activateAgent,
        deleteAgent,
        updateCommissionRate,
        loading,
        error,
    } = useAgents();

    const [agent, setAgent] = useState<Agent | null>(null);
    const [newCommissionRate, setNewCommissionRate] = useState("");
    const [showCommissionModal, setShowCommissionModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Load specific agent by ID
    useEffect(() => {
        fetchAgent();
    }, [id]);

    const fetchAgent = async () => {
        try {
            if (id) {
                const agentData = await fetchAgentById(id);
                setAgent(agentData);
                if (agentData) {
                    setNewCommissionRate(agentData.commissionRate.toString());
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleActivate = async () => {
        setProcessing(true);
        try {
            await activateAgent(agent!.id);
            alert("Agent activated successfully!");
            setAgent({ ...agent!, isActive: true });
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleDeactivate = async () => {
        setProcessing(true);
        try {
            await deactivateAgent(agent!.id);
            alert("Agent deactivated successfully!");
            setAgent({ ...agent!, isActive: false });
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleCommissionUpdate = async () => {
        const rate = parseFloat(newCommissionRate);
        if (!isNaN(rate) && rate >= 0 && rate <= 100) {
            setProcessing(true);
            try {
                await updateCommissionRate(agent!.id, rate);
                setShowCommissionModal(false);
                alert("Commission rate updated successfully!");
                setAgent({ ...agent!, commissionRate: rate });
            } catch (err) {
                console.error(err);
            } finally {
                setProcessing(false);
            }
        } else {
            alert('Please enter a valid commission rate between 0 and 100');
        }
    };

    const handleDelete = async () => {
        if (!id) {
            alert("No agent ID found");
            return;
        }
        setProcessing(true);
        try {
            await deleteAgent(id);
            alert("Agent deleted successfully!");
            navigate('/adminpanel/agents');
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete agent. Please try again.");
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
    if (!agent) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center py-12 text-gray-500">
                    <p className="mb-4">Agent not found.</p>
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

    const renderField = (label: string, value: string | null | undefined, icon?: React.ReactNode) => (
        <div className="flex items-start gap-3">
            {icon && <div className="mt-1 text-gray-500">{icon}</div>}
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <dt className="text-sm font-semibold text-gray-600">{label}</dt>
                <dd className="text-sm text-gray-900 md:col-span-2">
                    {value || <span className="text-gray-400 italic">Not provided</span>}
                </dd>
            </dl>
        </div>
    );

    // --- Page UI
    return (
        <div className="max-w-7xl mx-auto px-6 pb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Active Agents Details
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
                    <Link to="/adminpanel/agents" className="hover:text-blue-600">
                        Agents
                    </Link>
                    <span><ChevronRight className="w-4 h-4 text-gray-400" /></span>
                    <span className="text-blue-600 font-semibold">Agent Details</span>
                </div>
            </nav>

            {/* Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        Agent: <span className="text-blue-800"> {agent.tradingName}</span>
                    </h2>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-sm text-gray-500">
                            Created: {format(new Date(agent.createdAt || new Date()), "MMM dd, yyyy HH:mm")}
                        </span>
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${agent.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                        >
                            {agent.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                    </div>
                </div>

                <div className="px-6 py-6">
                    {/* Business Information */}
                    {renderSection("Business Information", (
                        <>
                            {renderField("Agent Type", agent.applyingAs)}
                            {renderField("Trading Name", agent.tradingName)}
                            {renderField("Business Registration Number", agent.businessRegistrationNumber)}
                            {renderField("Company Phone", agent.companyPhone, <Phone size={16} />)}
                            {renderField("Company Email", agent.emailAddress, <Mail size={16} />)}
                            {renderField("Country", agent.country, <MapPin size={16} />)}
                            {renderField("Current Address", agent.currentAddress, <MapPin size={16} />)}
                            {renderField("Primary Office Location", agent.primaryOfficeLocation, <MapPin size={16} />)}
                            {renderField("Website", agent.website, <Globe size={16} />)}
                        </>
                    ))}

                    {/* Agent Contact Information */}
                    {renderSection("Agent Contact Information", (
                        <>
                            {renderField("Name", `${agent.firstName} ${agent.lastName}`, <User size={16} />)}
                            {renderField("Position", agent.position, <Briefcase size={16} />)}
                            {renderField("Personal Phone", agent.personalPhone, <Phone size={16} />)}
                            {renderField("Personal Email", agent.personalEmail, <Mail size={16} />)}
                        </>
                    ))}

                    {/* Performance Information */}
                    {renderSection("Performance Information", (
                        <>
                            {renderField("Commission Rate", `${agent.commissionRate}%`)}
                            {renderField("Total Students Referred", agent.totalStudentsReferred.toString())}
                        </>
                    ))}

                    {/* Actions */}
                    {renderSection("Agent Management", (
                        <div className="flex gap-3 pt-4 flex-wrap">
                            {agent.isActive ? (
                                <button
                                    onClick={handleDeactivate}
                                    disabled={processing}
                                    className="relative flex items-center gap-2 px-5 py-1
                                                    rounded-xl border border-red-500 
                                                    text-red-600 font-medium
                                                    bg-white/10 backdrop-blur-sm
                                                    shadow-md transition-all duration-300 
                                                    hover:bg-red-600 hover:text-white 
                                                    hover:shadow-lg active:scale-95 cursor-pointer"
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Deactivate Agent
                                </button>
                            ) : (
                                <button
                                    onClick={handleActivate}
                                    disabled={processing}
                                    className="relative flex items-center gap-2 px-5 py-1
                                                    rounded-xl border border-green-500 
                                                    text-green-600 font-medium
                                                    bg-white/10 backdrop-blur-sm
                                                    shadow-md transition-all duration-300 
                                                    hover:bg-green-600 hover:text-white 
                                                    hover:shadow-lg active:scale-95 cursor-pointer"
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Activate Agent
                                </button>
                            )}
                            <button
                                onClick={() => setShowCommissionModal(true)}
                                disabled={processing}
                                className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-yellow-500 
                                                text-yellow-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-yellow-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Update Commission
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={processing}
                                className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-red-500 
                                                text-red-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-red-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Delete Agent
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commission Update Modal */}
            {showCommissionModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Update Commission Rate</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Commission Rate (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={newCommissionRate}
                                onChange={(e) => setNewCommissionRate(e.target.value)}
                                className="w-full border rounded-lg p-3 text-sm"
                                placeholder="Enter commission rate (0-100)"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowCommissionModal(false)}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                disabled={processing}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCommissionUpdate}
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Update Commission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentDetailsPage;