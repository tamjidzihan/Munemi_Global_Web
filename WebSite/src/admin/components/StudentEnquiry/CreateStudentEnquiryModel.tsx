/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Address, EducationBackground, StudentEnquiry, TestResult } from "../../../hooks/useStudentEnquiry";
import useAgents from "../../../hooks/useAgents";


type CreateStudentEnquiryModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    createEnquiry: (enquiry: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'>, files?: { passport?: File; cv?: File }) => Promise<StudentEnquiry>;
    addNewEnquiry: (enquiry: StudentEnquiry) => void;
};

const CreateStudentEnquiryModal = ({
    isOpen,
    closeModal,
    createEnquiry,
    addNewEnquiry
}: CreateStudentEnquiryModalProps) => {
    // --- Agent Selection ---
    const { agents, fetchAgents } = useAgents();
    const [selectedAgentId, setSelectedAgentId] = useState<string>("");
    const [agentLoading, setAgentLoading] = useState(false);

    // --- Personal Details ---
    const [givenName, setGivenName] = useState("");
    const [surName, setSurName] = useState("");
    const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
    const [currentOccupation, setCurrentOccupation] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nidNumber, setNidNumber] = useState("");

    // --- Contact Details ---
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // --- Family Details ---
    const [fathersName, setFathersName] = useState("");
    const [fathersNid, setFathersNid] = useState("");
    const [fathersPhone, setFathersPhone] = useState("");
    const [mothersName, setMothersName] = useState("");
    const [mothersNid, setMothersNid] = useState("");
    const [mothersPhone, setMothersPhone] = useState("");
    const [spouseName, setSpouseName] = useState("");
    const [spouseNid, setSpouseNid] = useState("");
    const [spousePhone, setSpousePhone] = useState("");
    const [numberOfChildren, setNumberOfChildren] = useState("");

    // --- Visa Information ---
    const [visaType, setVisaType] = useState("");
    const [visaExpiryDate, setVisaExpiryDate] = useState("");
    const [passportCountry, setPassportCountry] = useState("");

    // --- Arrays and JSON fields ---
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
    const [visaRefusalDetails, setVisaRefusalDetails] = useState({
        hasRefusalHistory: false,
        country: "",
        reason: "",
        dateOfRefusal: "",
        refusalLetter: "",
        appliedForVisaAgain: ""
    });
    const [previousPassportNumbers, setPreviousPassportNumbers] = useState<string[]>([]);
    const [hasPreviousPassport, setHasPreviousPassport] = useState(false);

    // --- Addresses ---
    const [addresses, setAddresses] = useState<Address[]>([{
        id: '',
        addressType: 'Permanent',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    }]);

    // --- File Uploads ---
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const passportInputRef = useRef<HTMLInputElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);

    // Fetch agents when modal opens
    useEffect(() => {
        if (isOpen) {
            const loadAgents = async () => {
                setAgentLoading(true);
                try {
                    await fetchAgents({ isActive: true }); // Only fetch active agents
                } catch (error) {
                    console.error("Failed to fetch agents:", error);
                } finally {
                    setAgentLoading(false);
                }
            };
            loadAgents();
        }
    }, [isOpen]);

    const handleFileUpload = (fileType: 'passport' | 'cv', e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (fileType === 'passport') {
                setPassportFile(file);
            } else {
                setCvFile(file);
            }
        }
    };

    const removeFile = (fileType: 'passport' | 'cv') => {
        if (fileType === 'passport') {
            setPassportFile(null);
            if (passportInputRef.current) {
                passportInputRef.current.value = '';
            }
        } else {
            setCvFile(null);
            if (cvInputRef.current) {
                cvInputRef.current.value = '';
            }
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Required field validation
        if (!givenName || !surName || !email || !phone || !nidNumber ||
            !fathersName || !fathersNid || !mothersName || !mothersNid ||
            !currentOccupation) {
            alert("Please fill in all required fields.");
            return;
        }

        // File validation
        if (!passportFile || !cvFile) {
            alert("Please upload both passport and CV documents.");
            return;
        }

        setLoading(true);

        try {
            const enquiryData: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt'> = {
                agentId: selectedAgentId,
                givenName,
                surName,
                gender: gender as 'Male' | 'Female' | null,
                currentOccupation,
                dateOfBirth: dateOfBirth || null,
                nidNumber,
                phone,
                email,
                fathersName,
                fathersNid,
                fathersPhone: fathersPhone || null,
                mothersName,
                mothersNid,
                mothersPhone: mothersPhone || null,
                spouseName: spouseName || null,
                spouseNid: spouseNid || null,
                spousePhone: spousePhone || null,
                numberOfChildren: numberOfChildren || null,
                visaType: visaType || null,
                visaExpiryDate: visaExpiryDate || null,
                passportCountry: passportCountry || null,
                interestedServices,
                educationBackground,
                englishTestScores,
                emergencyContact,
                passportDetails,
                visaRefusalDetails,
                previousPassportNumbers,
                hasPreviousPassport,
                addresses,
                passportDocument: {} as any, // These will be handled by the backend
                cvDocument: {} as any
            };

            const newEnquiry = await createEnquiry(enquiryData, {
                passport: passportFile,
                cv: cvFile
            });

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
        // Reset all form fields
        setGivenName("");
        setSurName("");
        setGender('');
        setCurrentOccupation("");
        setDateOfBirth("");
        setNidNumber("");
        setPhone("");
        setEmail("");
        setFathersName("");
        setFathersNid("");
        setFathersPhone("");
        setMothersName("");
        setMothersNid("");
        setMothersPhone("");
        setSpouseName("");
        setSpouseNid("");
        setSpousePhone("");
        setNumberOfChildren("");
        setVisaType("");
        setVisaExpiryDate("");
        setPassportCountry("");
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
        setVisaRefusalDetails({
            hasRefusalHistory: false,
            country: "",
            reason: "",
            dateOfRefusal: "",
            refusalLetter: "",
            appliedForVisaAgain: ""
        });
        setPreviousPassportNumbers([]);
        setHasPreviousPassport(false);
        setAddresses([{
            id: '',
            addressType: 'Permanent',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }]);
        setPassportFile(null);
        setCvFile(null);
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

    const addAddress = () => {
        setAddresses([...addresses, {
            id: '',
            addressType: 'Current',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }]);
    };

    const handleAddressChange = (index: number, field: string, value: string) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index] = {
            ...updatedAddresses[index],
            [field]: value
        };
        setAddresses(updatedAddresses);
    };

    const removeAddress = (index: number) => {
        if (addresses.length > 1) {
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(updatedAddresses);
        }
    };

    const addPreviousPassportNumber = () => {
        setPreviousPassportNumbers([...previousPassportNumbers, ""]);
    };

    const handlePreviousPassportChange = (index: number, value: string) => {
        const updatedNumbers = [...previousPassportNumbers];
        updatedNumbers[index] = value;
        setPreviousPassportNumbers(updatedNumbers);
    };

    const removePreviousPassportNumber = (index: number) => {
        const updatedNumbers = previousPassportNumbers.filter((_, i) => i !== index);
        setPreviousPassportNumbers(updatedNumbers);
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

                        {/* Agent Selection */}
                        <div className="border-b pb-6 mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Agent Information</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Agent*</label>
                                    <select
                                        value={selectedAgentId}
                                        onChange={(e) => setSelectedAgentId(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500 cursor-pointer"
                                        required
                                        disabled={agentLoading}
                                    >
                                        <option value="">Select an agent</option>
                                        {agentLoading ? (
                                            <option value="">Loading agents...</option>
                                        ) : (
                                            agents.map((agent) => (
                                                <option key={agent.id} value={agent.id}>
                                                    {agent.tradingName} - {agent.firstName} {agent.lastName}
                                                    {agent.emailAddress ? ` (${agent.emailAddress})` : ''}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    {agents.length === 0 && !agentLoading && (
                                        <p className="text-sm text-red-600 mt-1">No active agents available. Please contact administrator.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="border-b pb-6 mb-4">
                            <div className="font-semibold text-gray-600 pb-4">Personal Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Given Name*</label>
                                    <input
                                        type="text"
                                        value={givenName}
                                        onChange={(e) => setGivenName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Surname*</label>
                                    <input
                                        type="text"
                                        value={surName}
                                        onChange={(e) => setSurName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | '')}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Occupation*</label>
                                    <input
                                        type="text"
                                        value={currentOccupation}
                                        onChange={(e) => setCurrentOccupation(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">NID Number*</label>
                                    <input
                                        type="text"
                                        value={nidNumber}
                                        onChange={(e) => setNidNumber(e.target.value)}
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

                        {/* Contact Details */}
                        <div className="border-b pb-6 mb-4">
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

                        {/* Family Details */}
                        <div className="border-b pb-6 mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Family Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name*</label>
                                    <input
                                        type="text"
                                        value={fathersName}
                                        onChange={(e) => setFathersName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's NID*</label>
                                    <input
                                        type="text"
                                        value={fathersNid}
                                        onChange={(e) => setFathersNid(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Phone</label>
                                    <input
                                        type="tel"
                                        value={fathersPhone}
                                        onChange={(e) => setFathersPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name*</label>
                                    <input
                                        type="text"
                                        value={mothersName}
                                        onChange={(e) => setMothersName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's NID*</label>
                                    <input
                                        type="text"
                                        value={mothersNid}
                                        onChange={(e) => setMothersNid(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Phone</label>
                                    <input
                                        type="tel"
                                        value={mothersPhone}
                                        onChange={(e) => setMothersPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name</label>
                                    <input
                                        type="text"
                                        value={spouseName}
                                        onChange={(e) => setSpouseName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Spouse NID</label>
                                    <input
                                        type="text"
                                        value={spouseNid}
                                        onChange={(e) => setSpouseNid(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Phone</label>
                                    <input
                                        type="tel"
                                        value={spousePhone}
                                        onChange={(e) => setSpousePhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
                                    <input
                                        type="number"
                                        value={numberOfChildren}
                                        onChange={(e) => setNumberOfChildren(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="border-b pb-6 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Addresses</h3>
                                <button
                                    type="button"
                                    onClick={addAddress}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Address
                                </button>
                            </div>
                            {addresses.map((address, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                            <select
                                                value={address.addressType}
                                                onChange={(e) => handleAddressChange(index, 'addressType', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="Permanent">Permanent</option>
                                                <option value="Current">Current</option>
                                                <option value="Mailing">Mailing</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                                            <input
                                                type="text"
                                                value={address.street}
                                                onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input
                                                type="text"
                                                value={address.city}
                                                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                            <input
                                                type="text"
                                                value={address.state}
                                                onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                            <input
                                                type="text"
                                                value={address.zipCode}
                                                onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                            <input
                                                type="text"
                                                value={address.country}
                                                onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    {addresses.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(index)}
                                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove Address
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="border-b pb-6 mb-4">
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

                        {/* File Uploads */}
                        <div className="border-b pb-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Passport Document */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport Document*</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        {passportFile ? (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 truncate">{passportFile.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('passport')}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => passportInputRef.current?.click()}
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                    </svg>
                                                    <p className="text-sm text-gray-600">Click to upload passport</p>
                                                </div>
                                                <input
                                                    ref={passportInputRef}
                                                    type="file"
                                                    onChange={(e) => handleFileUpload('passport', e)}
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CV Document */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CV Document*</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        {cvFile ? (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 truncate">{cvFile.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('cv')}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => cvInputRef.current?.click()}
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                    </svg>
                                                    <p className="text-sm text-gray-600">Click to upload CV</p>
                                                </div>
                                                <input
                                                    ref={cvInputRef}
                                                    type="file"
                                                    onChange={(e) => handleFileUpload('cv', e)}
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Education Background */}
                        <div className="border-b pb-6 mb-4">
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


                        {/* Emergency Contact */}
                        <div className="border-b pb-6 mb-4">
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

                        {/* Passport Details */}
                        <div className="pb-6 mb-4">
                            <div className="text-lg font-semibold text-gray-600 pb-4">Passport Details</div>
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

                        {/* Passport History */}
                        <div className="border-b pb-6 mb-4">
                            <div className="font-semibold text-gray-800 mb-4">Passport History</div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={hasPreviousPassport}
                                        onChange={(e) => setHasPreviousPassport(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="text-sm">Has previous passport?</label>
                                </div>
                                {hasPreviousPassport && (
                                    <div className="ml-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium text-gray-700">Previous Passport Numbers</h4>
                                            <button
                                                type="button"
                                                onClick={addPreviousPassportNumber}
                                                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                                            >
                                                Add Number
                                            </button>
                                        </div>
                                        {previousPassportNumbers.map((number, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={number}
                                                    onChange={(e) => handlePreviousPassportChange(index, e.target.value)}
                                                    placeholder="Passport number"
                                                    className="flex-1 p-2 border border-gray-300 rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePreviousPassportNumber(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visa Details */}
                        <div className="pb-6 mb-4">
                            <div className="text-lg font-semibold text-gray-600 pb-4">Visa Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Visa Type</label>
                                    <input
                                        type="text"
                                        value={visaType}
                                        onChange={(e) => setVisaType(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Visa Expiry Date</label>
                                    <input
                                        type="date"
                                        value={visaExpiryDate}
                                        onChange={(e) => setVisaExpiryDate(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Issue Authority</label>
                                    <input
                                        type="text"
                                        value={passportCountry}
                                        onChange={(e) => setPassportCountry(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Visa Refusal Details */}
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