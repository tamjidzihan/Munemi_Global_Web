import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Minus, Eye, Pencil, Trash2, Loader2, Filter, SortAsc, SortDesc } from "lucide-react";
import useStudentEnquiries, { StudentEnquiry } from "../../../hooks/useStudentEnquiry";
import CreateStudentEnquiryModal from "./CreateStudentEnquiryModel";
import { Link, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../../Utils/useClickOutside";

const StudentEnquiryList = () => {
    const {
        enquiries,
        loading,
        error,
        createEnquiry,
        deleteEnquiry,
    } = useStudentEnquiries();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentEnquiryList, setStudentEnquiryList] = useState<StudentEnquiry[]>([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState<StudentEnquiry[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: keyof StudentEnquiry; direction: 'asc' | 'desc' }>({
        key: 'updatedAt',
        direction: 'desc'
    });

    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, () => setMenuOpenFor(null));
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

    useEffect(() => {
        setStudentEnquiryList(enquiries);
        setFilteredEnquiries(enquiries);
    }, [enquiries]);

    // Apply sorting
    useEffect(() => {
        const sorted = [...studentEnquiryList].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === undefined && bValue === undefined) return 0;
            if (aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
            if (bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            const aDate = new Date(aValue as string);
            const bDate = new Date(bValue as string);

            if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
                return sortConfig.direction === 'asc'
                    ? aDate.getTime() - bDate.getTime()
                    : bDate.getTime() - aDate.getTime();
            }

            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
            if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredEnquiries(sorted);
    }, [studentEnquiryList, sortConfig]);

    const closeModal = () => setIsModalOpen(false);

    const addNewEnquiry = (newEnquiry: StudentEnquiry) => {
        setStudentEnquiryList((prev) => [newEnquiry, ...prev]);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;

        try {
            setDeletingId(id);
            await deleteEnquiry(id);
            setStudentEnquiryList((prev) => prev.filter((enq) => enq.id !== id));
        } catch (err) {
            console.error("Failed to delete enquiry:", err);
            alert("Failed to delete enquiry. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleSort = (key: keyof StudentEnquiry) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const clearFilters = () => {
        setSortConfig({
            key: 'updatedAt',
            direction: 'desc'
        })
        setFilteredEnquiries(studentEnquiryList);
    };

    // Get last updated time from enquiries
    const lastUpdated =
        studentEnquiryList.length > 0
            ? format(
                new Date(
                    Math.max(...studentEnquiryList.map((enq) => new Date(enq.updatedAt).getTime()))
                ),
                "MMMM d, yyyy h:mm a"
            )
            : null;

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default">
            {/* Header */}
            <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
                <div className="text-xl font-semibold text-midnight">
                    Student Enquiries ({filteredEnquiries.length})
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
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className={`inline-flex items-center justify-center gap-2.5 rounded-md cursor-pointer ${isModalOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'
                            } py-3 px-6 text-center font-medium text-white hover:bg-opacity-90`}
                    >
                        {isModalOpen ? <Minus size={20} /> : 'Create New'}
                        {isModalOpen ? `Cancel` : ` Enquiry`}
                    </button>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="px-4 md:px-6 2xl:px-7.5 pb-4 border-b border-stroke bg-gray-50">
                    <div className="flex flex-wrap items-end gap-5">
                        {/* Sort Options */}
                        <div className="flex flex-row space-x-2 bg-cyan-100 px-2 py-1 rounded-md">
                            <label className="block place-self-center text-md font-medium text-gray-800">Sort By</label>
                            <select
                                value={sortConfig.key}
                                onChange={(e) => handleSort(e.target.value as keyof StudentEnquiry)}
                                className="border bg-white border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
                            >
                                <option value="updatedAt">Updated Date</option>
                                <option value="createdAt">Created Date</option>
                                <option value="givenName">Given Name</option>
                                <option value="surName">SurName</option>
                                <option value="email">Email</option>
                            </select>
                        </div>

                        {/* Sort Direction */}
                        <div className="flex flex-row space-x-2 bg-cyan-100 px-2 py-1 rounded-md">
                            <label className="block place-self-center text-md font-medium text-gray-800">Order</label>
                            <select
                                value={sortConfig.direction}
                                onChange={(e) => setSortConfig(prev => ({
                                    ...prev,
                                    direction: e.target.value as 'asc' | 'desc'
                                }))}
                                className="border bg-white border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        <div>
                            <button
                                onClick={() => clearFilters()}
                                className="inline-flex items-center gap-2 border border-red-300 text-red-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition cursor-pointer"
                            >
                                ✕ Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Error banner */}
            {error && (
                <div className="px-4 md:px-6 py-3 bg-red-50 text-red-700 rounded mx-4 mb-4">
                    {error}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <CreateStudentEnquiryModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    createEnquiry={createEnquiry}
                    addNewEnquiry={addNewEnquiry}
                />
            )}

            {/* Table header */}
            <div className="grid bg-cyan-50 text-midnight border-t border-stroke py-4.5 px-4 sm:grid-cols-10 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('givenName')}>
                    <p className="font-bold">Name</p>
                    {sortConfig.key === 'givenName' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('email')}>
                    <p className="font-bold">Email</p>
                    {sortConfig.key === 'email' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('phone')}>
                    <p className="font-bold">Phone</p>
                    {sortConfig.key === 'phone' && (
                        sortConfig.direction === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
                    )}
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-bold">Services</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-bold">Actions</p>
                </div>
            </div>

            {/* Loading / Empty */}
            {loading && !filteredEnquiries.length && (
                <div className="text-center py-8">
                    <p className="text-gray-500">Loading enquiries...</p>
                </div>
            )}

            {/* Enquiry list */}
            {filteredEnquiries.length > 0 && filteredEnquiries.map((enquiry) => (
                <div
                    key={enquiry.id}
                    className="grid grid-cols-10 text-form-input border-t hover:bg-gray-50 border-stroke py-4.5 px-4 md:px-6 2xl:px-7.5 relative"
                >
                    <div className="col-span-2 flex items-center">
                        <Link
                            to={`/adminpanel/student-enquiry/view/${enquiry.id}`}
                            className="font-medium hover:underline"
                        >
                            {enquiry.givenName} {enquiry.surName}
                        </Link>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-gray-600 truncate">
                            {enquiry.email}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-gray-600">{enquiry.phone}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <div className="text-sm text-gray-600">
                            {enquiry.interestedServices.slice(0, 2).map((service, idx) => (
                                <div key={idx} className="truncate">
                                    {service}
                                </div>
                            ))}
                            {enquiry.interestedServices.length > 2 && (
                                <div className="text-xs text-gray-500">
                                    +{enquiry.interestedServices.length - 2} more
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => navigate(`/adminpanel/student-enquiry/view/${enquiry.id}`)}
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
                                onClick={() => setMenuOpenFor(menuOpenFor === enquiry.id ? null : enquiry.id)}
                                className="relative flex items-center gap-2 px-5 py-1
                                            rounded-xl border border-cyan-500 
                                            text-cyan-600 font-medium
                                            bg-white/10 backdrop-blur-sm
                                            shadow-md transition-all duration-300 
                                            hover:bg-cyan-600 hover:text-white 
                                            hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                <Pencil size={16} />
                                Edit
                            </button>

                            {menuOpenFor === enquiry.id && (
                                <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                navigate(`/adminpanel/student-enquiry/edit/${enquiry.id}`);
                                                setMenuOpenFor(null);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                                        >
                                            <Pencil size={16} className="mr-2" />
                                            Edit Details
                                        </button>
                                        <button
                                            onClick={() => handleDelete(enquiry.id)}
                                            disabled={deletingId === enquiry.id}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deletingId === enquiry.id ? (
                                                <Loader2 size={16} className="mr-2 animate-spin" />
                                            ) : (
                                                <Trash2 size={16} className="mr-2" />
                                            )}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Footer */}
            {lastUpdated && (
                <div className="px-4 py-3 text-xs text-gray-500 border-t border-stroke">
                    Last updated: {lastUpdated}
                </div>
            )}
        </div>
    );
};

export default StudentEnquiryList;