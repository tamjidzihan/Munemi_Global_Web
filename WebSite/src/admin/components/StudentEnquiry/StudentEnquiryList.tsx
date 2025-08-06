import { useEffect, useState } from "react";
import useStudentEnquiries, { StudentEnquiry } from "../../../hooks/useStudentEnquiry";
import CreateStudentEnquiryModal from "./CreateStudentEnquiryModel";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface StudentEnquiryListProps {
    allStudentEnquiry: StudentEnquiry[];
    deleteStudentEnquiry: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const StudentEnquiryList = ({
    allStudentEnquiry,
    deleteStudentEnquiry,
    loading,
    error
}: StudentEnquiryListProps) => {
    const { createEnquiry } = useStudentEnquiries();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentEnquiryList, setStudentEnquiryList] = useState<StudentEnquiry[]>(allStudentEnquiry);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        setStudentEnquiryList(allStudentEnquiry);
    }, [allStudentEnquiry]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this enquiry?")) {
            try {
                setDeletingId(id);
                await deleteStudentEnquiry(id);
            } catch (err) {
                console.error("Failed to delete enquiry:", err);
                alert("Failed to delete enquiry. Please try again.");
            } finally {
                setDeletingId(null);
            }
        }
    };

    return (
        <div className="rounded-lg border border-stroke bg-white shadow-default">
            <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
                <div className="text-xl font-semibold text-gray-900">
                    Student Enquiries
                </div>
                <button
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className={`inline-flex items-center justify-center gap-2 rounded-md ${isModalOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                        } py-2.5 px-6 text-sm font-medium text-white transition-colors`}
                    disabled={loading}
                >
                    {isModalOpen ? (
                        <>
                            <Minus size={18} />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Create New Enquiry
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="px-4 md:px-6 py-3 bg-red-50 text-red-700 rounded mx-4 mb-4">
                    {error}
                </div>
            )}

            {/* Create Enquiry Modal */}
            {isModalOpen && (
                <CreateStudentEnquiryModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    createEnquiry={createEnquiry}
                />
            )}

            {/* Table Header */}
            <div className="grid bg-gray-50 text-gray-700 border-t border-stroke py-4 px-4 sm:grid-cols-9 md:px-6">
                <div className="col-span-1">
                    <p className="font-semibold">Name</p>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold">Email</p>
                </div>
                <div className="col-span-1">
                    <p className="font-semibold">Phone</p>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold">Address</p>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold">Questions</p>
                </div>
                <div className="col-span-1">
                    <p className="font-semibold">Actions</p>
                </div>
            </div>

            {/* Loading State */}
            {loading && !studentEnquiryList.length && (
                <div className="px-4 py-8 text-center text-gray-500">
                    Loading enquiries...
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && studentEnquiryList.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500">
                    No student enquiries found.
                </div>
            )}

            {/* Enquiry List */}
            {studentEnquiryList.length > 0 && (
                <div className="divide-y divide-gray-200">
                    {studentEnquiryList
                        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        .map((enquiry) => (
                            <div
                                key={enquiry.id}
                                className="grid grid-cols-7 sm:grid-cols-9 py-4 px-4 hover:bg-gray-50 transition-colors md:px-6"
                            >
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {enquiry.studentName}
                                    </p>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <p className="text-sm text-gray-600 truncate">
                                        {enquiry.email}
                                    </p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm text-gray-600">
                                        {enquiry.phone}
                                    </p>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <p className="text-sm text-gray-600 truncate">
                                        {enquiry.address}
                                    </p>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <div className="text-sm text-gray-600">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li className="truncate max-w-xs">{enquiry.que1}</li>
                                            <li className="truncate max-w-xs">{enquiry.que2}</li>
                                            <li className="truncate max-w-xs">{enquiry.que3}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-1 flex items-center justify-end">
                                    <div className="flex space-x-3">
                                        {/* View Button */}
                                        <button
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            onClick={() => {
                                                // TODO: Implement view functionality
                                            }}
                                            title="View details"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        {/* Edit Button */}
                                        <button
                                            className="text-yellow-600 hover:text-yellow-800 transition-colors"
                                            onClick={() => {
                                                // TODO: Implement edit functionality
                                            }}
                                            title="Edit enquiry"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            onClick={() => handleDelete(enquiry.id)}
                                            disabled={deletingId === enquiry.id}
                                            title="Delete enquiry"
                                        >
                                            {deletingId === enquiry.id ? (
                                                <span className="animate-spin">...</span>
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Last Updated */}
            {studentEnquiryList.length > 0 && (
                <div className="px-4 py-3 text-xs text-gray-500 border-t border-stroke">
                    Last updated: {format(new Date(), "MMMM d, yyyy h:mm a")}
                </div>
            )}
        </div>
    );
};

export default StudentEnquiryList;