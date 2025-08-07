import React, { useState } from "react";
import { AcademicQualification, StudentEnquiry, TestResult, VisaHistory } from "../../../hooks/useStudentEnquiry";

type CreateStudentEnquiryModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    createEnquiry: (enquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<StudentEnquiry>;
};

const CreateStudentEnquiryModal = ({
    isOpen,
    closeModal,
    createEnquiry,
}: CreateStudentEnquiryModalProps) => {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [englishProficiencyTest, setEnglishProficiencyTest] = useState("IELTS");
    const [testResult, setTestResult] = useState<TestResult>({
        testType: "IELTS",
        overallScore: 0,
        reading: 0,
        writing: 0,
        listening: 0,
        speaking: 0
    });
    const [academicQualification, setAcademicQualification] = useState<AcademicQualification[]>([]);
    const [visaHistory, setVisaHistory] = useState<VisaHistory>({
        hasPreviousVisa: false,
        countries: [],
        rejections: false
    });
    const [que1, setQue1] = useState("");
    const [que2, setQue2] = useState("");
    const [que3, setQue3] = useState("");
    const [loading, setLoading] = useState(false);
    const [newCountry, setNewCountry] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentName || !email || !phone || !address) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const newEnquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'> = {
            studentName,
            email,
            phone,
            address,
            englishProficiencyTest,
            testResult: {
                ...testResult,
                testType: englishProficiencyTest
            },
            academicQualification,
            visaHistory,
            que1,
            que2,
            que3,
        };

        try {
            await createEnquiry(newEnquiry);
            resetForm();
            closeModal();
        } catch (error) {
            console.error("Failed to create enquiry:", error);
            alert("Failed to create student enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setStudentName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setEnglishProficiencyTest("IELTS");
        setTestResult({
            testType: "IELTS",
            overallScore: 0,
            reading: 0,
            writing: 0,
            listening: 0,
            speaking: 0
        });
        setAcademicQualification([]);
        setVisaHistory({
            hasPreviousVisa: false,
            countries: [],
            rejections: false
        });
        setQue1("");
        setQue2("");
        setQue3("");
    };

    const addAcademicQualification = () => {
        setAcademicQualification([...academicQualification, {
            degree: '',
            institution: '',
            yearCompleted: new Date().getFullYear()
        }]);
    };

    const handleAcademicChange = (index: number, field: keyof AcademicQualification, value: string | number) => {
        const updatedQualifications = [...academicQualification];
        updatedQualifications[index] = {
            ...updatedQualifications[index],
            [field]: field === 'yearCompleted' ? Number(value) : value
        };
        setAcademicQualification(updatedQualifications);
    };

    const removeAcademicQualification = (index: number) => {
        const updatedQualifications = academicQualification.filter((_, i) => i !== index);
        setAcademicQualification(updatedQualifications);
    };

    const addCountry = () => {
        if (newCountry.trim()) {
            setVisaHistory(prev => ({
                ...prev,
                countries: [...prev.countries, newCountry.trim()]
            }));
            setNewCountry("");
        }
    };

    const removeCountry = (index: number) => {
        setVisaHistory(prev => ({
            ...prev,
            countries: prev.countries.filter((_, i) => i !== index)
        }));
    };

    if (!isOpen) return null;

    return (
        <div className=" py-4 inset-0 flex items-center justify-center bg-gray-200  shadow-2xl">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Create Student Enquiry</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name*</label>
                                <input
                                    type="text"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">English Proficiency Test</label>
                            <select
                                value={englishProficiencyTest}
                                onChange={(e) => setEnglishProficiencyTest(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="IELTS">IELTS</option>
                                <option value="PTE">PTE</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="Duolingo">Duolingo</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Test Results</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Reading</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="9"
                                        value={testResult.reading}
                                        onChange={(e) => setTestResult({ ...testResult, reading: Number(e.target.value) })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Writing</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="9"
                                        value={testResult.writing}
                                        onChange={(e) => setTestResult({ ...testResult, writing: Number(e.target.value) })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Listening</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="9"
                                        value={testResult.listening}
                                        onChange={(e) => setTestResult({ ...testResult, listening: Number(e.target.value) })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Speaking</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="9"
                                        value={testResult.speaking}
                                        onChange={(e) => setTestResult({ ...testResult, speaking: Number(e.target.value) })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Overall</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="9"
                                        value={testResult.overallScore}
                                        onChange={(e) => setTestResult({ ...testResult, overallScore: Number(e.target.value) })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Academic Qualifications</label>
                                <button
                                    type="button"
                                    onClick={addAcademicQualification}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Qualification
                                </button>
                            </div>

                            {academicQualification.length === 0 ? (
                                <p className="text-sm text-gray-500">No qualifications added yet</p>
                            ) : (
                                academicQualification.map((qual, index) => (
                                    <div key={index} className="mb-3 border p-4 rounded-lg bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Degree</label>
                                                <input
                                                    type="text"
                                                    value={qual.degree}
                                                    onChange={(e) => handleAcademicChange(index, 'degree', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Institution</label>
                                                <input
                                                    type="text"
                                                    value={qual.institution}
                                                    onChange={(e) => handleAcademicChange(index, 'institution', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Year Completed</label>
                                                <input
                                                    type="number"
                                                    value={qual.yearCompleted}
                                                    onChange={(e) => handleAcademicChange(index, 'yearCompleted', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Grade (Optional)</label>
                                            <input
                                                type="text"
                                                value={qual.grade || ''}
                                                onChange={(e) => handleAcademicChange(index, 'grade', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                placeholder="e.g., 3.5/4.0"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeAcademicQualification(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove Qualification
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Visa History</label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={visaHistory.hasPreviousVisa}
                                        onChange={(e) => setVisaHistory({ ...visaHistory, hasPreviousVisa: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="text-sm">Have you ever held a visa?</label>
                                </div>
                                {visaHistory.hasPreviousVisa && (
                                    <div className="ml-6 space-y-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Countries</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newCountry}
                                                onChange={(e) => setNewCountry(e.target.value)}
                                                className="flex-1 p-2 border border-gray-300 rounded-md"
                                                placeholder="Add country"
                                            />
                                            <button
                                                type="button"
                                                onClick={addCountry}
                                                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {visaHistory.countries.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {visaHistory.countries.map((country, index) => (
                                                    <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded">
                                                        <span>{country}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCountry(index)}
                                                            className="ml-1 text-red-500 hover:text-red-700"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={visaHistory.rejections}
                                        onChange={(e) => setVisaHistory({ ...visaHistory, rejections: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="text-sm">Have you ever had a visa rejection?</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question 1</label>
                            <textarea
                                value={que1}
                                onChange={(e) => setQue1(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={2}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question 2</label>
                            <textarea
                                value={que2}
                                onChange={(e) => setQue2(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={2}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question 3</label>
                            <textarea
                                value={que3}
                                onChange={(e) => setQue3(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={2}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
                                        closeModal();
                                    }
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center min-w-24"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : "Create Enquiry"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStudentEnquiryModal;