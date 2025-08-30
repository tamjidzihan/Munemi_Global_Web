import { useEffect, useRef, useState } from "react";
import { AgentApplication, CreateAgentApplication } from "../../../hooks/useAgentApplications";
import { Minus, Filter, SortAsc, SortDesc, CheckCircle, XCircle, Trash2 } from "lucide-react";
import CreateAgentApplicationModal from "./CreateAgentApplicationModal";
import { useClickOutside } from "../../../Utils/useClickOutside";
import { useAuth } from "../../../context/AuthContext";

type AgentApplicationListProps = {
    allApplications: AgentApplication[];
    createAgentApplication: (application: CreateAgentApplication) => void
    deleteApplication: (id: string) => void;
    fetchApplications: () => void;
    approveAgentApplication: (id: string, approvedBy: string) => void;
    rejectAgentApplication: (id: string, reason: string, rejectedBy: string,) => void;
    loading: boolean
};

const AgentApplicationList = ({
    allApplications,
    createAgentApplication,
    deleteApplication,
    approveAgentApplication,
    rejectAgentApplication,
    fetchApplications,
    loading
}: AgentApplicationListProps) => {
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationList, setApplicationList] = useState<AgentApplication[]>(allApplications);
    const [filteredApplications, setFilteredApplications] = useState<AgentApplication[]>(allApplications);
    const [sortConfig, setSortConfig] = useState<{ key: keyof AgentApplication; direction: 'asc' | 'desc' }>({
        key: 'updatedAt',
        direction: 'desc'
    });
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [applyingAsFilter, setApplyingAsFilter] = useState<string>('all');
    const [selectedApplication, setSelectedApplication] = useState<AgentApplication | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);


    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, () => setMenuOpenFor(null));

    useEffect(() => {
        const sorted = [...allApplications].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            // Handle undefined values
            if (aValue === undefined && bValue === undefined) return 0;
            if (aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
            if (bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

            // Handle string comparison
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            // Handle date comparison - check if values are date strings
            const aDate = new Date(aValue as string);
            const bDate = new Date(bValue as string);

            if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
                return sortConfig.direction === 'asc'
                    ? aDate.getTime() - bDate.getTime()
                    : bDate.getTime() - aDate.getTime();
            }

            // Default comparison for other types
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setApplicationList(sorted);
    }, [allApplications, sortConfig]);

    useEffect(() => {
        let filtered = applicationList;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }

        if (applyingAsFilter !== 'all') {
            filtered = filtered.filter(app => app.applyingAs === applyingAsFilter);
        }

        setFilteredApplications(filtered);
    }, [applicationList, statusFilter, applyingAsFilter]);

    const closeModal = () => setIsModalOpen(false);

    const handleSort = (key: keyof AgentApplication) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleApprove = (id: string) => {
        if (user?.id) {
            approveAgentApplication(id, user.id);
        } else {
            // Optionally handle the case where user.id is not available
            alert("User ID is not available. Cannot approve application.");
        }
        setSelectedApplication(null);
    };

    const handleReject = (id: string) => {
        if (rejectionReason.trim() && user?.id) {
            rejectAgentApplication(id, rejectionReason, user.id);
            setRejectionReason('');
            setSelectedApplication(null);
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            deleteApplication(id);
            setSelectedApplication(null);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
                <div className="text-xl font-semibold text-midnight">
                    Agent Applications ({filteredApplications.length})
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        <Filter size={16} />
                        Filters
                    </button>

                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className={`inline-flex items-center justify-center gap-2.5 rounded-md ${isModalOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'
                            } py-3 px-6 text-center font-medium text-white hover:bg-opacity-90`}
                    >
                        {isModalOpen ? <Minus size={20} /> : 'Create New'}
                        {isModalOpen ? `Cancel` : ` Application`}
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="px-4 md:px-6 2xl:px-7.5 pb-4 border-b border-stroke">
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <label className="block place-self-center text-md font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label className="block  place-self-center text-dm font-medium text-gray-700 mb-1">Applying As</label>
                            <select
                                value={applyingAsFilter}
                                onChange={(e) => setApplyingAsFilter(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">All Types</option>
                                <option value="Sub-Agent">Sub-Agent</option>
                                <option value="Super-Agent">Super-Agent</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setStatusFilter('all');
                                    setApplyingAsFilter('all');
                                }}
                                className="border border-red-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <CreateAgentApplicationModal
                fetchApplications={fetchApplications}
                createAgentApplication={createAgentApplication}
                isOpen={isModalOpen}
                closeModal={closeModal}
                loading={loading}
            />

            <div className="grid bg-cyan-50 text-midnight border-t border-stroke py-4.5 px-4 sm:grid-cols-12 md:px-6 2xl:px-7.5">
                <div className="col-span-3 flex items-center cursor-pointer" onClick={() => handleSort('tradingName')}>
                    <p className="font-bold">Trading Name</p>
                    {sortConfig.key === 'tradingName' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-3 flex items-center cursor-pointer" onClick={() => handleSort('businessRegistrationNumber')}>
                    <p className="font-bold">Reg. Number</p>
                    {sortConfig.key === 'businessRegistrationNumber' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('applyingAs')}>
                    <p className="font-bold">Applying As</p>
                    {sortConfig.key === 'applyingAs' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('status')}>
                    <p className="font-bold">Status</p>
                    {sortConfig.key === 'status' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-bold">Actions</p>
                </div>
            </div>

            {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                    <div
                        key={application.id}
                        className="grid grid-cols-12 text-form-input border-t hover:bg-gray-50 border-stroke py-4.5 px-4 md:px-6 2xl:px-7.5 relative"
                    >
                        <div className="col-span-3 flex items-center">
                            <p className="font-medium">{application.tradingName || "N/A"}</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="text-sm text-gray-600">{application.businessRegistrationNumber || "N/A"}</p>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {application.applyingAs}
                            </span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                                {(application.status || "pending").toUpperCase()}
                            </span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        setMenuOpenFor(menuOpenFor === application.id ? null : application.id)
                                    }
                                    className="relative flex items-center gap-2 px-5 py-2.5 
                                                rounded-xl border border-cyan-500 
                                                text-cyan-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-cyan-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                                >
                                    Action
                                </button>


                                {menuOpenFor === application.id && (
                                    <div ref={menuRef} className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                        <div className="py-1">
                                            <button
                                                onClick={() => handleApprove(application.id)}

                                                disabled={application.status === 'approved'}
                                                className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <CheckCircle size={16} className="mr-2" />
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedApplication(application); // opens modal
                                                    setRejectionReason('');
                                                    setMenuOpenFor(null); // close dropdown
                                                }}
                                                disabled={application.status === 'rejected'}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <XCircle size={16} className="mr-2" />
                                                Reject
                                            </button>

                                            <button
                                                onClick={() => handleDelete(application.id)}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} className="mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No agent applications found.</p>
                </div>
            )}

            {/* Rejection Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Reject Application</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Please provide a reason for rejecting {selectedApplication.tradingName}'s application:
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows={4}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setSelectedApplication(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleReject(selectedApplication.id)}
                                disabled={!rejectionReason.trim()}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentApplicationList;