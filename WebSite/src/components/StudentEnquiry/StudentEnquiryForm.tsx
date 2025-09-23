/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import useStudentEnquiries, { Address, EducationBackground, StudentEnquiry, TestResult, TravelHistory } from '../../hooks/useStudentEnquiry';
import { FiHelpCircle } from 'react-icons/fi';
import Alert from '../common/Alert/Alert';
import Hero from '../common/Hero/Hero';
import agentImage from '../../assets/agents.png';
import { useAgentAuth } from '../../context/AgentAuthProvider';

const StudentEnquiryForm = () => {
    const { createEnquiry, loading } = useStudentEnquiries()
    const { agent } = useAgentAuth()

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
    const [numberOfBrother, setNumberOfBrother] = useState("");
    const [numberOfSister, setNumberOfSister] = useState("");

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
    const [travelHistory, setTravelHistory] = useState<TravelHistory[]>([]);

    // --- Addresses ---
    const [permanentAddress, setPermanentAddress] = useState<Omit<Address, 'id'>>({
        addressType: 'Permanent',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [presentAddress, setPresentAddress] = useState<Omit<Address, 'id'>>({
        addressType: 'Present',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    // --- File Uploads ---
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const passportInputRef = useRef<HTMLInputElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (hasPreviousPassport && previousPassportNumbers.length === 0) {
            setPreviousPassportNumbers([""]);
        }
        if (!hasPreviousPassport) {
            setPreviousPassportNumbers([]); // clear when unchecked
        }
    }, [hasPreviousPassport]);

    const handleFileUpload = (fileType: 'passport' | 'cv', e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check file type (only PDF allowed)
            if (file.type !== 'application/pdf') {
                setErrors(prev => ({
                    ...prev,
                    [fileType === 'passport' ? 'passportFile' : 'cvFile']: 'Only PDF files are allowed'
                }));
                e.target.value = ''; // Clear the input
                return;
            }

            // Check file size (max 10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    [fileType === 'passport' ? 'passportFile' : 'cvFile']: 'File size must be less than 10MB'
                }));
                e.target.value = ''; // Clear the input
                return;
            }

            // Clear any previous errors for this file type
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fileType === 'passport' ? 'passportFile' : 'cvFile'];
                return newErrors;
            });

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

        // Clear any errors for this file type when removed
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fileType === 'passport' ? 'passportFile' : 'cvFile'];
            return newErrors;
        });
    };

    // Update the validateForm function to include file type validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

        if (!givenName) newErrors.givenName = "Given name is required";
        if (!surName) newErrors.surName = "Surname is required";
        if (!email || !emailRegex.test(email)) newErrors.email = "Valid email is required";
        if (!phone || !phoneRegex.test(phone)) newErrors.phone = "Valid phone number is required";
        if (!nidNumber) newErrors.nidNumber = "NID number is required";
        if (!fathersName) newErrors.fathersName = "Father's name is required";
        if (!fathersNid) newErrors.fathersNid = "Father's NID is required";
        if (!mothersName) newErrors.mothersName = "Mother's name is required";
        if (!mothersNid) newErrors.mothersNid = "Mother's NID is required";
        if (!currentOccupation) newErrors.currentOccupation = "Current occupation is required";
        if (!permanentAddress.street) newErrors.permanentStreet = "Permanent address street is required";
        if (!permanentAddress.city) newErrors.permanentCity = "Permanent address city is required";
        if (!permanentAddress.country) newErrors.permanentCountry = "Permanent address country is required";
        if (!presentAddress.street) newErrors.presentStreet = "Present address street is required";
        if (!presentAddress.city) newErrors.presentCity = "Present address city is required";
        if (!presentAddress.country) newErrors.presentCountry = "Present address country is required";

        // File validation
        if (!passportFile) newErrors.passportFile = "Passport document is required";
        else if (passportFile.type !== 'application/pdf') newErrors.passportFile = "Only PDF files are allowed";
        else if (passportFile.size > 10 * 1024 * 1024) newErrors.passportFile = "File size must be less than 10MB";

        if (!cvFile) newErrors.cvFile = "CV document is required";
        else if (cvFile.type !== 'application/pdf') newErrors.cvFile = "Only PDF files are allowed";
        else if (cvFile.size > 10 * 1024 * 1024) newErrors.cvFile = "File size must be less than 10MB";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setAlert(null);

        if (!validateForm()) return;

        if (!agent) return;

        try {
            const enquiryData: Omit<StudentEnquiry, 'id' | 'createdAt' | 'updatedAt' | 'agent'> = {
                agentId: agent.id,
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
                numberOfBrother: numberOfBrother || null,
                numberOfSister: numberOfSister || null,
                interestedServices,
                educationBackground,
                englishTestScores,
                emergencyContact,
                passportDetails,
                visaRefusalDetails,
                previousPassportNumbers,
                travelHistory,
                hasPreviousPassport,
                addresses: [permanentAddress, presentAddress],
                passportDocument: {} as any,
                cvDocument: {} as any
            };

            await createEnquiry(enquiryData, {
                passport: passportFile ?? undefined,
                cv: cvFile ?? undefined
            });

            setAlert({ message: "Student enquiry created successfully!", type: 'success' });
            setTimeout(() => {
                resetForm();
            }, 1500);
        } catch (error) {
            console.error("Failed to create enquiry:", error);
            setAlert({ message: "Failed to create student enquiry. Please try again.", type: 'error' });
        }
    };

    const resetForm = () => {
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
        setNumberOfBrother("");
        setNumberOfSister("");
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
        setTravelHistory([]);
        setHasPreviousPassport(false);
        setPermanentAddress({
            addressType: 'Permanent',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        });
        setPresentAddress({
            addressType: 'Present',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        });
        setPassportFile(null);
        setCvFile(null);
        setErrors({});
        setAlert(null);
    };

    const addEducationBackground = () => {
        setEducationBackground([...educationBackground, {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            yearCompleted: '',
            grades: '',
            outOf: ''
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


    const addTravelHistory = () => {
        setTravelHistory([...travelHistory, {
            country: '',
            formDate: '',
            toDate: '',
            reasonOfVisit: ''
        }]);
    };

    const handleTravelHistoryChange = (index: number, field: string, value: string) => {
        const updatedTravelHistory = [...travelHistory];
        updatedTravelHistory[index] = {
            ...updatedTravelHistory[index],
            [field]: value
        };
        setTravelHistory(updatedTravelHistory);
    };

    const removeTravelHistory = (index: number) => {
        const updatedTravelHistory = travelHistory.filter((_, i) => i !== index);
        setTravelHistory(updatedTravelHistory);
    };


    const handlePermanentAddressChange = (field: string, value: string) => {
        setPermanentAddress(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePresentAddressChange = (field: string, value: string) => {
        setPresentAddress(prev => ({
            ...prev,
            [field]: value
        }));
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


    const renderField = (label: string, value: string | null | undefined, icon?: React.ReactNode) => (

        <div className="ml-4 space-y-4">
            {icon && <div className="mt-1 text-gray-500">{icon}</div>}
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <dt className="text-sm text-gray-600">{label} : </dt>
                <dd className="text-sm text-gray-900 md:col-span-2">
                    {value || <span className="text-gray-400 italic">Not provided</span>}
                </dd>
            </dl>
        </div >

    );

    return (
        <main className="w-full">
            <Hero bgImage={agentImage} heroName=" Student Enquiry" />
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
            <div className="flex items-center justify-center z-50 p-4">
                <div className="bg-white max-w-4xl w-full overflow-y-auto rounded-lg shadow-xl">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl text-midnight font-bold">
                                Create Student Enquiry
                                <span className="text-sm text-gray-500 ml-2 font-normal">
                                    (All required fields are marked with *)
                                </span>
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                            {/* Agent Selection */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">
                                    Agent Information
                                    <FiHelpCircle
                                        className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                        title="Select the agent responsible for this student enquiry"
                                    />
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        {agent && (
                                            <>
                                                {renderField("Trading Name", agent.tradingName)}
                                                {renderField("Business Registration Number", agent.businessRegistrationNumber)}
                                                {renderField("Company Phone", agent.companyPhone)}
                                                {renderField("Company Email", agent.emailAddress)}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Personal Details</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Given Name *
                                            {errors.givenName && <span className="text-red-500 text-sm ml-2">{errors.givenName}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={givenName}
                                            onChange={(e) => setGivenName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Surname *
                                            {errors.surName && <span className="text-red-500 text-sm ml-2">{errors.surName}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={surName}
                                            onChange={(e) => setSurName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Gender *</label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | '')}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Current Occupation *
                                            {errors.currentOccupation && <span className="text-red-500 text-sm ml-2">{errors.currentOccupation}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={currentOccupation}
                                            onChange={(e) => setCurrentOccupation(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            NID Number *
                                            {errors.nidNumber && <span className="text-red-500 text-sm ml-2">{errors.nidNumber}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={nidNumber}
                                            onChange={(e) => setNidNumber(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                                        <input
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Contact Details</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Phone *
                                            {errors.phone && <span className="text-red-500 text-sm ml-2">{errors.phone}</span>}
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email *
                                            {errors.email && <span className="text-red-500 text-sm ml-2">{errors.email}</span>}
                                        </label>
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
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Family Details</h4>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Father's Name *
                                            {errors.fathersName && <span className="text-red-500 text-sm ml-2">{errors.fathersName}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={fathersName}
                                            onChange={(e) => setFathersName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Father's NID *
                                            {errors.fathersNid && <span className="text-red-500 text-sm ml-2">{errors.fathersNid}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={fathersNid}
                                            onChange={(e) => setFathersNid(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Father's Phone</label>
                                        <input
                                            type="tel"
                                            value={fathersPhone}
                                            onChange={(e) => setFathersPhone(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Mother's Name *
                                            {errors.mothersName && <span className="text-red-500 text-sm ml-2">{errors.mothersName}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={mothersName}
                                            onChange={(e) => setMothersName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Mother's NID *
                                            {errors.mothersNid && <span className="text-red-500 text-sm ml-2">{errors.mothersNid}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            value={mothersNid}
                                            onChange={(e) => setMothersNid(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Mother's Phone</label>
                                        <input
                                            type="tel"
                                            value={mothersPhone}
                                            onChange={(e) => setMothersPhone(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Spouse Name</label>
                                        <input
                                            type="text"
                                            value={spouseName}
                                            onChange={(e) => setSpouseName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Spouse NID</label>
                                        <input
                                            type="text"
                                            value={spouseNid}
                                            onChange={(e) => setSpouseNid(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Spouse Phone</label>
                                        <input
                                            type="tel"
                                            value={spousePhone}
                                            onChange={(e) => setSpousePhone(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Number of Your Children</label>
                                        <input
                                            type="number"
                                            value={numberOfChildren}
                                            onChange={(e) => setNumberOfChildren(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Number of Your Brothers</label>
                                        <input
                                            type="number"
                                            value={numberOfBrother}
                                            onChange={(e) => setNumberOfBrother(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Number of Your Sisters</label>
                                        <input
                                            type="number"
                                            value={numberOfSister}
                                            onChange={(e) => setNumberOfSister(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">Addresses
                                    <FiHelpCircle
                                        className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                        title="Address is required"
                                    />
                                </h4>
                                {/* Permanent Address */}
                                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                                    <h4 className="text-md font-semibold text-gray-700 mb-3">Permanent Address</h4>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2">
                                                Street *
                                                {errors.permanentStreet && <span className="text-red-500 text-sm ml-2">{errors.permanentStreet}</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={permanentAddress.street}
                                                onChange={(e) => handlePermanentAddressChange('street', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                City *
                                                {errors.permanentCity && <span className="text-red-500 text-sm ml-2">{errors.permanentCity}</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={permanentAddress.city}
                                                onChange={(e) => handlePermanentAddressChange('city', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">State / Divisions * </label>
                                            <input
                                                type="text"
                                                value={permanentAddress.state}
                                                onChange={(e) => handlePermanentAddressChange('state', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Zip Code *</label>
                                            <input
                                                type="text"
                                                value={permanentAddress.zipCode}
                                                onChange={(e) => handlePermanentAddressChange('zipCode', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Country *
                                                {errors.permanentCountry && <span className="text-red-500 text-sm ml-2">{errors.permanentCountry}</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={permanentAddress.country}
                                                onChange={(e) => handlePermanentAddressChange('country', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Present Address */}
                                <div className="p-4 border rounded-lg bg-gray-50">
                                    <h4 className="text-md font-semibold text-gray-700 mb-3">Present Address</h4>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2">
                                                Street *
                                                {errors.presentStreet && <span className="text-red-500 text-sm ml-2">{errors.presentStreet}</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={presentAddress.street}
                                                onChange={(e) => handlePresentAddressChange('street', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                City *
                                                {errors.presentCity && <span className="text-red-500 text-sm ml-2">{errors.presentCity}</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={presentAddress.city}
                                                onChange={(e) => handlePresentAddressChange('city', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">State / Divisions *</label>
                                            <input
                                                type="text"
                                                value={presentAddress.state}
                                                onChange={(e) => handlePresentAddressChange('state', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Zip Code *</label>
                                            <input
                                                type="text"
                                                value={presentAddress.zipCode}
                                                onChange={(e) => handlePresentAddressChange('zipCode', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Country *
                                                {errors.presentCountry && <span className="text-red-500 text-sm ml-2">{errors.presentCountry}</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={presentAddress.country}
                                                onChange={(e) => handlePresentAddressChange('country', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* English Test Scores */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">English Test Scores</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Test Type</label>
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
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Overall Score</label>
                                        <input
                                            type="text"
                                            value={englishTestScores.overallScore}
                                            onChange={(e) => setEnglishTestScores({ ...englishTestScores, overallScore: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Test Date</label>
                                        <input
                                            type="date"
                                            value={englishTestScores.testDate}
                                            onChange={(e) => setEnglishTestScores({ ...englishTestScores, testDate: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Reading</label>
                                        <input
                                            type="text"
                                            value={englishTestScores.reading}
                                            onChange={(e) => setEnglishTestScores({ ...englishTestScores, reading: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Writing</label>
                                        <input
                                            type="text"
                                            value={englishTestScores.writing}
                                            onChange={(e) => setEnglishTestScores({ ...englishTestScores, writing: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Listening</label>
                                        <input
                                            type="text"
                                            value={englishTestScores.listening}
                                            onChange={(e) => setEnglishTestScores({ ...englishTestScores, listening: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Speaking</label>
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
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Required Documents</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Passport Document */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Passport Document (PDF only, max 10MB) *
                                            {errors.passportFile && <span className="text-red-500 text-sm ml-2">{errors.passportFile}</span>}
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            {passportFile ? (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600 truncate">{passportFile.name}</span>
                                                        <span className="text-xs text-gray-500">
                                                            ({(passportFile.size / 1024 / 1024).toFixed(2)} MB)
                                                        </span>
                                                    </div>
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
                                                        <p className="text-xs text-gray-500">PDF only, max 10MB</p>
                                                    </div>
                                                    <input
                                                        ref={passportInputRef}
                                                        type="file"
                                                        onChange={(e) => handleFileUpload('passport', e)}
                                                        className="hidden"
                                                        accept=".pdf,application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* CV Document */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            CV Document (PDF only, max 10MB) *
                                            {errors.cvFile && <span className="text-red-500 text-sm ml-2">{errors.cvFile}</span>}
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            {cvFile ? (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600 truncate">{cvFile.name}</span>
                                                        <span className="text-xs text-gray-500">
                                                            ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                                                        </span>
                                                    </div>
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
                                                        <p className="text-xs text-gray-500">PDF only, max 10MB</p>
                                                    </div>
                                                    <input
                                                        ref={cvInputRef}
                                                        type="file"
                                                        onChange={(e) => handleFileUpload('cv', e)}
                                                        className="hidden"
                                                        accept=".pdf,application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education Background */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold text-midnight">Education Background</h4>
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
                                        <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                                            <div className="grid md:grid-cols-2 gap-4 mb-2">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Institution</label>
                                                    <input
                                                        type="text"
                                                        value={edu.institution}
                                                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Degree</label>
                                                    <input
                                                        type="text"
                                                        value={edu.degree}
                                                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Major/ Group</label>
                                                    <input
                                                        type="text"
                                                        value={edu.fieldOfStudy}
                                                        onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Year Completed</label>
                                                    <input
                                                        type="text"
                                                        value={edu.yearCompleted}
                                                        onChange={(e) => handleEducationChange(index, 'yearCompleted', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">CGPA</label>
                                                    <input
                                                        type="text"
                                                        value={edu.grades}
                                                        onChange={(e) => handleEducationChange(index, 'grades', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Out Of (4,5.. etc)</label>
                                                    <input
                                                        type="number"
                                                        value={edu.outOf}
                                                        onChange={(e) => handleEducationChange(index, 'outOf', e.target.value)}
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
                            <div className="mb-8">

                                <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">
                                    Emergency Contact *
                                    <FiHelpCircle
                                        className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                        title="Fill in all the fields"
                                    />
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name *</label>
                                        <input
                                            type="text"
                                            value={emergencyContact.name}
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Relationship *</label>
                                        <input
                                            type="text"
                                            value={emergencyContact.relationship}
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone *</label>
                                        <input
                                            type="text"
                                            value={emergencyContact.phone}
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email *</label>
                                        <input
                                            type="text"
                                            value={emergencyContact.email}
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, email: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2">Address *</label>
                                        <input
                                            type="text"
                                            value={emergencyContact.address}
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, address: e.target.value })}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Passport Details */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Passport Details</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Passport Number</label>
                                        <input
                                            type="text"
                                            value={passportDetails.passportNumber}
                                            onChange={(e) => setPassportDetails({ ...passportDetails, passportNumber: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Issue Date</label>
                                        <input
                                            type="date"
                                            value={passportDetails.issueDate}
                                            onChange={(e) => setPassportDetails({ ...passportDetails, issueDate: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={passportDetails.expiryDate}
                                            onChange={(e) => setPassportDetails({ ...passportDetails, expiryDate: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Issue Authority</label>
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
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Passport History</h4>
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

                            {/* Travel History */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold text-midnight">Travel History</h4>
                                    <button
                                        type="button"
                                        onClick={addTravelHistory}
                                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                    >
                                        Add Travel History
                                    </button>
                                </div>
                                {travelHistory.length === 0 ? (
                                    <p className="text-sm text-gray-500">No travel history added yet</p>
                                ) : (
                                    travelHistory.map((travel, index) => (
                                        <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                                            <div className="grid md:grid-cols-2 gap-4 mb-2">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Country</label>
                                                    <input
                                                        type="text"
                                                        value={travel.country}
                                                        onChange={(e) => handleTravelHistoryChange(index, 'country', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">From Date</label>
                                                    <input
                                                        type="date"
                                                        value={travel.formDate}
                                                        onChange={(e) => handleTravelHistoryChange(index, 'formDate', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">To Date</label>
                                                    <input
                                                        type="date"
                                                        value={travel.toDate}
                                                        onChange={(e) => handleTravelHistoryChange(index, 'toDate', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Reason of Visit</label>
                                                    <input
                                                        type="text"
                                                        value={travel.reasonOfVisit}
                                                        onChange={(e) => handleTravelHistoryChange(index, 'reasonOfVisit', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeTravelHistory(index)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove Travel History
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                            {/* Visa Refusal Details */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-midnight mb-4">Visa Refusal Details</h4>
                                <div className="space-y-4">
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
                                        <div className="ml-6 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Country</label>
                                                <input
                                                    type="text"
                                                    value={visaRefusalDetails.country}
                                                    onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, country: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Reason</label>
                                                <input
                                                    type="text"
                                                    value={visaRefusalDetails.reason || ''}
                                                    onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, reason: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Date of Refusal</label>
                                                <input
                                                    type="date"
                                                    value={visaRefusalDetails.dateOfRefusal || ''}
                                                    onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, dateOfRefusal: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Applied for Visa Again</label>
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
                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center cursor-pointer"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        </main>
    );
};

export default StudentEnquiryForm