import React, { ChangeEvent, useRef, useState } from "react";
import { EducationBackground, StudentEnquiry, TestResult } from "../../../hooks/useStudentEnquiry";


type CreateStudentEnquiryModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    createEnquiry: (enquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<StudentEnquiry>;
    addNewEnquiry: (enquiry: StudentEnquiry) => void;
};

const CreateStudentEnquiryModal = ({
    isOpen,
    closeModal,
    createEnquiry,
    addNewEnquiry
}: CreateStudentEnquiryModalProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [interestedServices, setInterestedServices] = useState<string[]>([]);
    const [educationBackground, setEducationBackground] = useState<EducationBackground[]>([]);
    const [englishTestScores, setEnglishTestScores] = useState<TestResult>({
        testType: "",
        overallScore: "",
        reading: "",
        writing: "",
        listening: "",
        speaking: "",
        testDate: ""
    });
    const [preferredIntake, setPreferredIntake] = useState("");
    const [visaRefusalDetails, setVisaRefusalDetails] = useState({
        hasRefusalHistory: false,
        country: "",
        reason: "",
        dateOfRefusal: "",
        refusalLetter: "",
        appliedForVisaAgain: ""
    });
    const [emergencyContact, setEmergencyContact] = useState({
        name: "",
        relationship: "",
        phone: "",
        email: "",
        address: ""
    });
    const [passportDetails, setPassportDetails] = useState({
        passportNumber: "",
        issueDate: "",
        expiryDate: "",
        issueAuthority: ""
    });
    const [documents, setDocuments] = useState<File[]>([]);
    const [documentDescriptions, setDocumentDescriptions] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setDocuments(prev => [...prev, ...newFiles]);

            // Initialize descriptions for new files
            const newDescriptions = { ...documentDescriptions };
            newFiles.forEach(file => {
                newDescriptions[file.name] = "";
            });
            setDocumentDescriptions(newDescriptions);
        }
    };

    const removeDocument = (index: number) => {
        const updatedDocuments = [...documents];
        const removedFile = updatedDocuments.splice(index, 1)[0];
        const updatedDescriptions = { ...documentDescriptions };
        delete updatedDescriptions[removedFile.name];
        setDocumentDescriptions(updatedDescriptions);
        setDocuments(updatedDocuments);
    };

    const updateDocumentDescription = (fileName: string, description: string) => {
        setDocumentDescriptions(prev => ({
            ...prev,
            [fileName]: description
        }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !phone) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        // Append all text fields
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth);
        formData.append('email', email);
        formData.append('phone', phone);
        if (street) formData.append('street', street);
        if (city) formData.append('city', city);
        if (state) formData.append('state', state);
        if (zipCode) formData.append('zipCode', zipCode);
        if (country) formData.append('country', country);

        if (interestedServices.length > 0) {
            formData.append('interestedServices', JSON.stringify(interestedServices));
        }
        formData.append('educationBackground', JSON.stringify(educationBackground));


        formData.append('englishTestScores', JSON.stringify(englishTestScores));

        if (preferredIntake) {
            formData.append('preferredIntake', preferredIntake);
        }

        formData.append('visaRefusalDetails', JSON.stringify(visaRefusalDetails));
        formData.append('emergencyContact', JSON.stringify(emergencyContact));
        formData.append('passportDetails', JSON.stringify(passportDetails));

        if (Object.keys(documentDescriptions).length > 0) {
            formData.append('documentDescriptions', JSON.stringify(documentDescriptions));
        }

        // Append all documents
        documents.forEach(file => {
            formData.append('documents', file);
        });

        try {
            const newEnquiry = await createEnquiry(formData as unknown as Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>);
            addNewEnquiry(newEnquiry);
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
        setFirstName("");
        setLastName("");
        setDateOfBirth("");
        setEmail("");
        setPhone("");
        setStreet("");
        setCity("");
        setState("");
        setZipCode("");
        setCountry("");
        setInterestedServices([]);
        setEducationBackground([]);
        setEnglishTestScores({
            testType: "",
            overallScore: "",
            reading: "",
            writing: "",
            listening: "",
            speaking: "",
            testDate: ""
        });
        setPreferredIntake("");
        setVisaRefusalDetails({
            hasRefusalHistory: false,
            country: "",
            reason: "",
            dateOfRefusal: "",
            refusalLetter: "",
            appliedForVisaAgain: ""
        });
        setEmergencyContact({
            name: "",
            relationship: "",
            phone: "",
            email: "",
            address: ""
        });
        setPassportDetails({
            passportNumber: "",
            issueDate: "",
            expiryDate: "",
            issueAuthority: ""
        });
        setDocuments([]);
        setDocumentDescriptions({});
    };

    const addEducationBackground = () => {
        setEducationBackground([...educationBackground, {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            yearCompleted: '',
            grades: ''
        }]);
    };

    const handleEducationChange = (index: number, field: string, value: string) => {
        const updatedEducation = [...educationBackground];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value
        };
        setEducationBackground(updatedEducation);
    };

    const removeEducationBackground = (index: number) => {
        const updatedEducation = educationBackground.filter((_, i) => i !== index);
        setEducationBackground(updatedEducation);
    };

    if (!isOpen) return null;

    return (
        <div className="p-4 md:px-20 inset-0 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white rounded-lg shadow-xl w-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-xl font-semibold">Create Student Enquiry</div>
                        <button
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700"
                            disabled={loading}
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div className="font-semibold text-gray-600 pb-4">Personal Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="font-semibold text-gray-600 pb-4">Contact Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="font-semibold text-gray-600 pb-4">Address Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                                    <input
                                        type="text"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold text-gray-600 pb-4">Documents</div>

                            {/* Drag and drop area */}
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 cursor-pointer hover:border-blue-400 transition-colors"
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                        handleDocumentUpload({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
                                    }
                                }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PDF, DOC, JPG, PNG up to 10MB
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleDocumentUpload}
                                    multiple
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                            </div>

                            {/* Uploaded files preview in a table */}
                            {documents.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {documents.map((file, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {file.type.includes('image') ? (
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded" src={URL.createObjectURL(file)} alt="" />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded">
                                                                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</div>
                                                                <div className="text-sm text-gray-500">{file.type}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <input
                                                            type="text"
                                                            placeholder="Add description..."
                                                            value={documentDescriptions[file.name] || ""}
                                                            onChange={(e) => updateDocumentDescription(file.name, e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeDocument(index)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">No documents uploaded yet</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold text-gray-600 pb-4">English Test Scores</div>
                            <div className="pb-4">
                                <div className="pb-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Test Type</label>
                                    <select
                                        value={englishTestScores.testType}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, testType: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="IELTS">IELTS</option>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="PTE">PTE</option>
                                        <option value="Duolingo">Duolingo</option>
                                    </select>
                                </div>
                                <div className="pb-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Overall Score</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.overallScore}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, overallScore: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div className="pb-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Test Date</label>
                                    <input
                                        type="date"
                                        value={englishTestScores.testDate}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, testDate: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Reading</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.reading}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, reading: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Writing</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.writing}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, writing: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Listening</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.listening}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, listening: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Speaking</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.speaking}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, speaking: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="font-semibold text-gray-600 pb-4">Education Background</div>
                                <button
                                    type="button"
                                    onClick={addEducationBackground}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Education
                                </button>
                            </div>

                            {educationBackground.length === 0 ? (
                                <p className="text-sm text-gray-500">No education background added yet</p>
                            ) : (
                                educationBackground.map((edu, index) => (
                                    <div key={index} className="mb-3 border p-4 rounded-lg bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Institution</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Degree</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Field of Study</label>
                                                <input
                                                    type="text"
                                                    value={edu.fieldOfStudy}
                                                    onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Year Completed</label>
                                                <input
                                                    type="text"
                                                    value={edu.yearCompleted}
                                                    onChange={(e) => handleEducationChange(index, 'yearCompleted', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Grades</label>
                                                <input
                                                    type="text"
                                                    value={edu.grades}
                                                    onChange={(e) => handleEducationChange(index, 'grades', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeEducationBackground(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove Education
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold text-gray-600 pb-4">Preferred Intake</div>
                            <input
                                type="text"
                                value={preferredIntake}
                                onChange={(e) => setPreferredIntake(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold text-gray-600 pb-4">Visa Refusal Details</div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={visaRefusalDetails.hasRefusalHistory}
                                        onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, hasRefusalHistory: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="text-sm">Has visa refusal history?</label>
                                </div>
                                {visaRefusalDetails.hasRefusalHistory && (
                                    <div className="ml-6 space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                                            <input
                                                type="text"
                                                value={visaRefusalDetails.country}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, country: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Reason</label>
                                            <input
                                                type="text"
                                                value={visaRefusalDetails.reason || ''}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, reason: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Date of Refusal</label>
                                            <input
                                                type="date"
                                                value={visaRefusalDetails.dateOfRefusal || ''}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, dateOfRefusal: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Applied for Visa Again</label>
                                            <input
                                                type="text"
                                                value={visaRefusalDetails.appliedForVisaAgain || ''}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, appliedForVisaAgain: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold text-gray-600 pb-4">Emergency Contact</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.name}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Relationship</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.relationship}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.phone}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.email}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, email: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.address}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, address: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="font-semibold text-gray-600 pb-4">Passport Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Passport Number</label>
                                    <input
                                        type="text"
                                        value={passportDetails.passportNumber}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, passportNumber: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Issue Date</label>
                                    <input
                                        type="date"
                                        value={passportDetails.issueDate}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, issueDate: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={passportDetails.expiryDate}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, expiryDate: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Issue Authority</label>
                                    <input
                                        type="text"
                                        value={passportDetails.issueAuthority}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, issueAuthority: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
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