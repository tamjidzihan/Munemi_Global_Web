import { useState } from "react";
import { AcademicQualification, StudentEnquiry, TestResult, VisaHistory } from "../../../hooks/useStudentEnquiry";


type EditStudentEnquiryModelProps = {
    isOpen: boolean;
    closeModal: () => void;
    studentEnquiry: StudentEnquiry;
    updateStudentEnquiry: (id: string, updateStudentEnquiry: StudentEnquiry) => Promise<void>
}

const EditStudentEnquiryModel = ({
    isOpen,
    closeModal,
    studentEnquiry,
    updateStudentEnquiry
}: EditStudentEnquiryModelProps) => {
    const [studentName, setStudentName] = useState(studentEnquiry.studentName);
    const [email, setEmail] = useState(studentEnquiry.email);
    const [phone, setPhone] = useState(studentEnquiry.phone);
    const [address, setAddress] = useState(studentEnquiry.address);
    const [englishProficiencyTest, setEnglishProficiencyTest] = useState(studentEnquiry.englishProficiencyTest);
    const [testResult, setTestResult] = useState<TestResult>({
        reading: studentEnquiry.testResult.reading,
        writing: studentEnquiry.testResult.writing,
        listening: studentEnquiry.testResult.listening,
        speaking: studentEnquiry.testResult.speaking,
        overAll: studentEnquiry.testResult.overAll
    });
    const [academicQualification, setAcademicQualification] = useState<AcademicQualification[]>(studentEnquiry.academicQualification);

    const [visaHistory, setVisaHistory] = useState<VisaHistory>({
        heldVisa: studentEnquiry.visaHistory.heldVisa,
        visaRefusal: studentEnquiry.visaHistory.visaRefusal,
        visaViolation: studentEnquiry.visaHistory.visaViolation,
    });
    const [que1, setQue1] = useState(studentEnquiry.que1);
    const [que2, setQue2] = useState(studentEnquiry.que2);
    const [que3, setQue3] = useState(studentEnquiry.que3);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentName || !email || !phone || !address) {
            alert("All fields are required.");
            return;
        }

        setLoading(true);

        const updateEnquiry: StudentEnquiry = {
            _id: studentEnquiry._id,
            studentName,
            email,
            phone,
            address,
            englishProficiencyTest: englishProficiencyTest as StudentEnquiry["englishProficiencyTest"],
            testResult,
            academicQualification,
            visaHistory,
            que1,
            que2,
            que3,
            createdAt: studentEnquiry.createdAt,
            updatedAt: new Date().toISOString(),
        };

        try {
            await updateStudentEnquiry(studentEnquiry._id, updateEnquiry)
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Failed to create student enquiry.");
        } finally {
            setLoading(false);
        }
    };

    const addAcademicQualification = () => {
        setAcademicQualification([...academicQualification, { degreeName: '', institutionName: '', passingYear: '' }]);
    };

    const handleAcademicChange = (index: number, field: keyof AcademicQualification, value: string) => {
        const updatedQualifications = [...academicQualification];
        updatedQualifications[index] = {
            ...updatedQualifications[index],
            [field]: value
        };
        setAcademicQualification(updatedQualifications);
    };

    const removeAcademicQualification = (index: number) => {
        const updatedQualifications = academicQualification.filter((_, i) => i !== index);
        setAcademicQualification(updatedQualifications);
    };

    if (!isOpen) return null;

    return (
        <div className=" py-5 inset-0 flex items-center justify-center bg-gray shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <h3 className="text-xl font-semibold mb-4">Create Student Enquiry</h3>
                <form onSubmit={handleSubmit} className={loading ? "opacity-50 pointer-events-none" : ""}>
                    <div className="mb-4 flex justify-between">
                        <div className="mb-4 w-full px-3">
                            <label className="block text-sm font-medium mb-2">Student Name</label>
                            <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="mb-4 w-full ">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md" required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">English Proficiency Test</label>
                        <select value={englishProficiencyTest} onChange={(e) => setEnglishProficiencyTest(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="IELTS">IELTS</option>
                            <option value="PTE">PTE</option>
                            <option value="TOEFL">TOEFL</option>
                            <option value="Duolingo">Duolingo</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Test Results</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Reading</label>
                                <input type="text" value={testResult.reading} onChange={(e) => setTestResult({ ...testResult, reading: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Writing</label>
                                <input type="text" value={testResult.writing} onChange={(e) => setTestResult({ ...testResult, writing: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Listening</label>
                                <input type="text" value={testResult.listening} onChange={(e) => setTestResult({ ...testResult, listening: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Speaking</label>
                                <input type="text" value={testResult.speaking} onChange={(e) => setTestResult({ ...testResult, speaking: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Overall</label>
                                <input type="text" value={testResult.overAll} onChange={(e) => setTestResult({ ...testResult, overAll: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Academic Qualifications</label>
                        {academicQualification.map((qual, index) => (
                            <div key={index} className="mb-4 border p-4 rounded-lg">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium mb-2">Degree Name</label>
                                    <input type="text" value={qual.degreeName} onChange={(e) => handleAcademicChange(index, 'degreeName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium mb-2">Institution Name</label>
                                    <input type="text" value={qual.institutionName} onChange={(e) => handleAcademicChange(index, 'institutionName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium mb-2">Passing Year</label>
                                    <input type="text" value={qual.passingYear} onChange={(e) => handleAcademicChange(index, 'passingYear', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <button type="button" onClick={() => removeAcademicQualification(index)} className="text -red-500 hover:underline">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addAcademicQualification} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                            Add Qualification
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Visa History</label>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={visaHistory.heldVisa} onChange={(e) => setVisaHistory({ ...visaHistory, heldVisa: e.target.checked })} />
                                <label>Have you ever held a visa?</label>
                            </div>
                            {visaHistory.heldVisa && (
                                <div className="ml-6">
                                    <label className="block text-sm font-medium mb-2">Visa Details</label>
                                    <input type="text" value={visaHistory.heldVisaDetails || ''} onChange={(e) => setVisaHistory({ ...visaHistory, heldVisaDetails: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={visaHistory.visaRefusal} onChange={(e) => setVisaHistory({ ...visaHistory, visaRefusal: e.target.checked })} />
                                <label>Have you ever had a visa refusal?</label>
                            </div>
                            {visaHistory.visaRefusal && (
                                <div className="ml-6">
                                    <label className="block text-sm font-medium mb-2">Refusal Details</label>
                                    <input type="text" value={visaHistory.visaRefusalDetails || ''} onChange={(e) => setVisaHistory({ ...visaHistory, visaRefusalDetails: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={visaHistory.visaViolation} onChange={(e) => setVisaHistory({ ...visaHistory, visaViolation: e.target.checked })} />
                                <label>Have you ever violated visa conditions?</label>
                            </div>
                            {visaHistory.visaViolation && (
                                <div className="ml-6">
                                    <label className="block text-sm font-medium mb-2">Violation Details</label>
                                    <input type="text" value={visaHistory.visaViolationDetails || ''} onChange={(e) => setVisaHistory({ ...visaHistory, visaViolationDetails: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Question 1</label>
                        <input type="text" value={que1} onChange={(e) => setQue1(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Question 2</label>
                        <input type="text" value={que2} onChange={(e) => setQue2(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Question 3</label>
                        <input type="text" value={que3} onChange={(e) => setQue3(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md" disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center" disabled={loading}>
                            {loading ? "Updating..." : "Update Enquiry"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudentEnquiryModel