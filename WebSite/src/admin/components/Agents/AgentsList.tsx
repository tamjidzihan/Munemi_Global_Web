import { useEffect, useRef, useState } from "react";
import { Agent } from "../../../hooks/useAgents";
import { Filter, SortAsc, SortDesc, CheckCircle, XCircle, Trash2, Eye, RefreshCw, Settings } from "lucide-react";
import { useClickOutside } from "../../../Utils/useClickOutside";
import { Link, useNavigate } from "react-router-dom";

type AgentListProps = {
    allAgents: Agent[];
    deleteAgent: (id: string) => void;
    fetchAgents: () => void;
    deactivateAgent: (id: string) => void;
    activateAgent: (id: string) => void;
    loading: boolean;
    updateCommissionRate: (id: string, commissionRate: number) => void;
};

const AgentList = ({
    allAgents,
    deleteAgent,
    activateAgent,
    deactivateAgent,
    fetchAgents,
    updateCommissionRate
}: AgentListProps) => {
    const navigate = useNavigate();
    const [agentList, setAgentList] = useState<Agent[]>(allAgents);
    const [filteredAgents, setFilteredAgents] = useState<Agent[]>(allAgents);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Agent; direction: 'asc' | 'desc' }>({
        key: 'updatedAt',
        direction: 'desc'
    });
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [applyingAsFilter, setApplyingAsFilter] = useState<string>('all');
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [newCommissionRate, setNewCommissionRate] = useState('');
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, () => setMenuOpenFor(null));

    useEffect(() => {
        const sorted = [...allAgents].sort((a, b) => {
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

            // Handle number comparison
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // Handle date comparison - check if values are date strings
            const aDate = new Date(aValue as string);
            const bDate = new Date(bValue as string);

            if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
                return sortConfig.direction === 'asc'
                    ? aDate.getTime() - bDate.getTime()
                    : bDate.getTime() - aDate.getTime();
            }

            // Handle boolean comparison
            if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return sortConfig.direction === 'asc'
                    ? (aValue === bValue ? 0 : aValue ? 1 : -1)
                    : (aValue === bValue ? 0 : aValue ? -1 : 1);
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
        setAgentList(sorted);
    }, [allAgents, sortConfig]);

    useEffect(() => {
        let filtered = agentList;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(agent =>
                statusFilter === 'active' ? agent.isActive : !agent.isActive
            );
        }

        if (applyingAsFilter !== 'all') {
            filtered = filtered.filter(agent => agent.applyingAs === applyingAsFilter);
        }

        setFilteredAgents(filtered);
    }, [agentList, statusFilter, applyingAsFilter]);

    const handleSort = (key: keyof Agent) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const handleActivate = (id: string) => {
        activateAgent(id);
        setSelectedAgent(null);
    };

    const handleDeactivate = (id: string) => {
        deactivateAgent(id);
        setSelectedAgent(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this agent?')) {
            deleteAgent(id);
            setSelectedAgent(null);
        }
    };

    const handleCommissionUpdate = (id: string) => {
        const rate = parseFloat(newCommissionRate);
        if (!isNaN(rate) && rate >= 0 && rate <= 100) {
            updateCommissionRate(id, rate);
            setNewCommissionRate('');
            setSelectedAgent(null);
        } else {
            alert('Please enter a valid commission rate between 0 and 100');
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
                <div className="text-xl font-semibold text-midnight">
                    Agents ({filteredAgents.length})
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                        <Filter size={16} />
                        Filters
                    </button>

                    <button
                        onClick={fetchAgents}
                        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 cursor-pointer"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="px-4 md:px-6 2xl:px-7.5 pb-4 border-b border-stroke bg-gray-50">
                    <div className="flex flex-wrap items-end gap-5 ">
                        {/* Status Filter */}
                        <div className="flex flex-row space-x-2 bg-cyan-100 px-2 py-1 rounded-md">
                            <label className="block place-self-center text-md font-medium text-gray-800">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border bg-white border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Applying As Filter */}
                        <div className="flex flex-row space-x-2 bg-cyan-100 px-2 py-1 rounded-md">
                            <label className="block place-self-center text-md font-medium text-gray-800">Agent Type</label>
                            <select
                                value={applyingAsFilter}
                                onChange={(e) => setApplyingAsFilter(e.target.value)}
                                className="border bg-white border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer"
                            >
                                <option value="all">All Types</option>
                                <option value="Sub-Agent">Sub-Agent</option>
                                <option value="Super-Agent">Super-Agent</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        <div>
                            <button
                                onClick={() => {
                                    setStatusFilter("all");
                                    setApplyingAsFilter("all");
                                }}
                                className="inline-flex items-center gap-2 border border-red-300 text-red-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            >
                                ✕ Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid bg-cyan-50 text-midnight border-t border-stroke py-4.5 px-4 sm:grid-cols-9 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('tradingName')}>
                    <p className="font-bold">Trading Name</p>
                    {sortConfig.key === 'tradingName' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('businessRegistrationNumber')}>
                    <p className="font-bold">Reg. Number</p>
                    {sortConfig.key === 'businessRegistrationNumber' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-1 flex items-center cursor-pointer" onClick={() => handleSort('applyingAs')}>
                    <p className="font-bold">Agent Type</p>
                    {sortConfig.key === 'applyingAs' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-1 flex items-center cursor-pointer" onClick={() => handleSort('commissionRate')}>
                    <p className="font-bold">Commission</p>
                    {sortConfig.key === 'commissionRate' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-1 flex items-center cursor-pointer" onClick={() => handleSort('isActive')}>
                    <p className="font-bold">Status</p>
                    {sortConfig.key === 'isActive' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-bold">Actions</p>
                </div>
            </div>

            {filteredAgents.length > 0 ? (
                filteredAgents.map((agent) => (
                    <div
                        key={agent.id}
                        className="grid grid-cols-9 text-form-input border-t hover:bg-gray-50 border-stroke py-4.5 px-4 md:px-6 2xl:px-7.5 relative"
                    >
                        <div className="col-span-2 flex items-center">
                            <Link to={`view/${agent.id}`}>
                                <p className="font-medium hover:underline">{agent.tradingName || "N/A"}</p>
                            </Link>
                        </div>
                        <div className="col-span-2 flex items-center overflow-x-auto">
                            <p className="text-sm text-gray-600">{agent.businessRegistrationNumber || "N/A"}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {agent.applyingAs}
                            </span>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <span className="text-sm font-medium">
                                {agent.commissionRate}%
                            </span>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.isActive)}`}>
                                {agent.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => navigate(`view/${agent.id}`)}
                                    className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-blue-500 
                                                text-blue-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-blue-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                                >
                                    <Eye size={16} />
                                    View
                                </button>
                                <button
                                    onClick={() =>
                                        setMenuOpenFor(menuOpenFor === agent.id ? null : agent.id)
                                    }
                                    className="relative flex items-center gap-2 px-5 py-1
                                                rounded-xl border border-cyan-500 
                                                text-cyan-600 font-medium
                                                bg-white/10 backdrop-blur-sm
                                                shadow-md transition-all duration-300 
                                                hover:bg-cyan-600 hover:text-white 
                                                hover:shadow-lg active:scale-95 cursor-pointer"
                                >
                                    <Settings size={16} />
                                    Actions
                                </button>

                                {menuOpenFor === agent.id && (
                                    <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                        <div className="py-1">
                                            {agent.isActive ? (
                                                <button
                                                    onClick={() => handleDeactivate(agent.id)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <XCircle size={16} className="mr-2" />
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleActivate(agent.id)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                                >
                                                    <CheckCircle size={16} className="mr-2" />
                                                    Activate
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setSelectedAgent(agent);
                                                    setNewCommissionRate(agent.commissionRate.toString());
                                                    setMenuOpenFor(null);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                                            >
                                                💰 Update Commission
                                            </button>

                                            <button
                                                onClick={() => handleDelete(agent.id)}
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
                    <p className="text-gray-500">No agents found.</p>
                </div>
            )}

            {/* Commission Update Modal */}
            {selectedAgent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Update Commission Rate</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Update commission rate for {selectedAgent.tradingName}:
                        </p>
                        <div className="flex items-center mb-4">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={newCommissionRate}
                                onChange={(e) => setNewCommissionRate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter commission rate (0-100)"
                            />
                            <span className="ml-2">%</span>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setSelectedAgent(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleCommissionUpdate(selectedAgent.id)}
                                disabled={!newCommissionRate || isNaN(parseFloat(newCommissionRate))}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Update Commission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentList;