import { useState } from "react";
import {
    StudentEnquiry,
    TestResult,
    EducationBackground,
    VisaRefusalDetails,
    EmergencyContact,
    PassportDetails,
    Address,
    EmptyTestResult,
    EmptyEmergencyContact,
    EmptyPassportDetails,
    EmptyVisaRefusalDetails
} from "../../../hooks/useStudentEnquiry";

type EditStudentEnquiryModelProps = {
    isOpen: boolean;
    closeModal: () => void;
    studentEnquiry: StudentEnquiry;
    updateStudentEnquiry: (id: string, updatedEnquiry: Partial<StudentEnquiry>, files?: { passport?: File; cv?: File; }) => Promise<StudentEnquiry>;
};

const EditStudentEnquiryModel = ({
    isOpen,
    closeModal,
    studentEnquiry,
    updateStudentEnquiry
}: EditStudentEnquiryModelProps) => {
    // --- Personal Details ---
    const [givenName, setGivenName] = useState(studentEnquiry.givenName);
    const [surName, setSurName] = useState(studentEnquiry.surName);
    const [gender, setGender] = useState<'Male' | 'Female' | null>(studentEnquiry.gender);
    const [currentOccupation, setCurrentOccupation] = useState(studentEnquiry.currentOccupation);
    const [dateOfBirth, setDateOfBirth] = useState(studentEnquiry.dateOfBirth || "");
    const [nidNumber, setNidNumber] = useState(studentEnquiry.nidNumber);

    // --- Contact Details ---
    const [phone, setPhone] = useState(studentEnquiry.phone);
    const [email, setEmail] = useState(studentEnquiry.email);

    // --- Family Details ---
    const [fathersName, setFathersName] = useState(studentEnquiry.fathersName);
    const [fathersNid, setFathersNid] = useState(studentEnquiry.fathersNid);
    const [fathersPhone, setFathersPhone] = useState(studentEnquiry.fathersPhone || "");
    const [mothersName, setMothersName] = useState(studentEnquiry.mothersName);
    const [mothersNid, setMothersNid] = useState(studentEnquiry.mothersNid);
    const [mothersPhone, setMothersPhone] = useState(studentEnquiry.mothersPhone || "");
    const [spouseName, setSpouseName] = useState(studentEnquiry.spouseName || "");
    const [spouseNid, setSpouseNid] = useState(studentEnquiry.spouseNid || "");
    const [spousePhone, setSpousePhone] = useState(studentEnquiry.spousePhone || "");
    const [numberOfChildren, setNumberOfChildren] = useState(studentEnquiry.numberOfChildren || "");
    const [numberOfBrother, setNumberOfBrother] = useState(studentEnquiry.numberOfBrother || "");
    const [numberOfSister, setNumberOfSister] = useState(studentEnquiry.numberOfSister || "");

    // --- Arrays and Objects ---
    const [educationBackground, setEducationBackground] = useState<EducationBackground[]>(studentEnquiry.educationBackground);
    const [englishTestScores, setEnglishTestScores] = useState<TestResult | EmptyTestResult>(studentEnquiry.englishTestScores);
    const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | EmptyEmergencyContact>(studentEnquiry.emergencyContact);
    const [passportDetails, setPassportDetails] = useState<PassportDetails | EmptyPassportDetails>(studentEnquiry.passportDetails);
    const [visaRefusalDetails, setVisaRefusalDetails] = useState<VisaRefusalDetails | EmptyVisaRefusalDetails>(studentEnquiry.visaRefusalDetails);
    const [previousPassportNumbers, setPreviousPassportNumbers] = useState<string[]>(studentEnquiry.previousPassportNumbers);
    const [travelHistory, setTravelHistory] = useState(studentEnquiry.travelHistory);
    const [addresses, setAddresses] = useState<Address[]>(studentEnquiry.addresses);

    // --- File Uploads ---
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!givenName || !surName || !email || !phone) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const updatedEnquiry: Partial<StudentEnquiry> = {
            givenName,
            surName,
            gender,
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
            educationBackground,
            englishTestScores,
            emergencyContact,
            passportDetails,
            visaRefusalDetails,
            previousPassportNumbers,
            travelHistory,
            addresses,
            hasPreviousPassport: previousPassportNumbers.length > 0
        };

        try {
            await updateStudentEnquiry(studentEnquiry.id, updatedEnquiry, {
                passport: passportFile || undefined,
                cv: cvFile || undefined
            });
            closeModal();
        } catch (error) {
            console.error("Failed to update enquiry:", error);
            alert("Failed to update student enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
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

    const addAddress = () => {
        setAddresses([...addresses, {
            addressType: '',
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
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
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

    const addPreviousPassportNumber = () => {
        setPreviousPassportNumbers([...previousPassportNumbers, '']);
    };

    const handlePreviousPassportNumberChange = (index: number, value: string) => {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Edit Student Enquiry</h3>
                        <button
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                            disabled={loading}
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={loading ? "opacity-50 pointer-events-none" : ""}>
                        {/* Personal Details */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">Personal Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Given Name*</label>
                                    <input
                                        type="text"
                                        value={givenName}
                                        onChange={(e) => setGivenName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Surname*</label>
                                    <input
                                        type="text"
                                        value={surName}
                                        onChange={(e) => setSurName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        value={gender || ''}
                                        onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | null)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Current Occupation</label>
                                    <input
                                        type="text"
                                        value={currentOccupation}
                                        onChange={(e) => setCurrentOccupation(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">NID Number*</label>
                                    <input
                                        type="text"
                                        value={nidNumber}
                                        onChange={(e) => setNidNumber(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">Contact Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email*</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone*</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Family Details */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">Family Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Father's Name*</label>
                                    <input
                                        type="text"
                                        value={fathersName}
                                        onChange={(e) => setFathersName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Father's NID*</label>
                                    <input
                                        type="text"
                                        value={fathersNid}
                                        onChange={(e) => setFathersNid(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Father's Phone</label>
                                    <input
                                        type="tel"
                                        value={fathersPhone}
                                        onChange={(e) => setFathersPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mother's Name*</label>
                                    <input
                                        type="text"
                                        value={mothersName}
                                        onChange={(e) => setMothersName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mother's NID*</label>
                                    <input
                                        type="text"
                                        value={mothersNid}
                                        onChange={(e) => setMothersNid(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mother's Phone</label>
                                    <input
                                        type="tel"
                                        value={mothersPhone}
                                        onChange={(e) => setMothersPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Spouse Name</label>
                                    <input
                                        type="text"
                                        value={spouseName}
                                        onChange={(e) => setSpouseName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Spouse NID</label>
                                    <input
                                        type="text"
                                        value={spouseNid}
                                        onChange={(e) => setSpouseNid(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Spouse Phone</label>
                                    <input
                                        type="tel"
                                        value={spousePhone}
                                        onChange={(e) => setSpousePhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Number of Children</label>
                                    <input
                                        type="number"
                                        value={numberOfChildren}
                                        onChange={(e) => setNumberOfChildren(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Number of Brothers</label>
                                    <input
                                        type="number"
                                        value={numberOfBrother}
                                        onChange={(e) => setNumberOfBrother(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Number of Sisters</label>
                                    <input
                                        type="number"
                                        value={numberOfSister}
                                        onChange={(e) => setNumberOfSister(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-600 pb-2 border-b">Addresses</h4>
                                <button
                                    type="button"
                                    onClick={addAddress}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Address
                                </button>
                            </div>
                            {addresses.length === 0 ? (
                                <p className="text-sm text-gray-500 mt-4">No addresses added yet</p>
                            ) : (
                                addresses.map((address, index) => (
                                    <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50 mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Address Type</label>
                                                <select
                                                    value={address.addressType}
                                                    onChange={(e) => handleAddressChange(index, 'addressType', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Permanent">Permanent</option>
                                                    <option value="Present">Present</option>
                                                    <option value="Mailing">Mailing</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Street</label>
                                                <input
                                                    type="text"
                                                    value={address.street}
                                                    onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">City</label>
                                                <input
                                                    type="text"
                                                    value={address.city}
                                                    onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">State</label>
                                                <input
                                                    type="text"
                                                    value={address.state}
                                                    onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Zip Code</label>
                                                <input
                                                    type="text"
                                                    value={address.zipCode}
                                                    onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Country</label>
                                                <input
                                                    type="text"
                                                    value={address.country}
                                                    onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(index)}
                                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove Address
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* English Test Scores */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">English Test Scores</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Test Type</label>
                                    <select
                                        value={englishTestScores.testType || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, testType: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="IELTS">IELTS</option>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="PTE">PTE</option>
                                        <option value="Duolingo">Duolingo</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Overall Score</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.overallScore || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, overallScore: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Reading</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.reading || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, reading: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Writing</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.writing || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, writing: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Listening</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.listening || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, listening: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Speaking</label>
                                    <input
                                        type="text"
                                        value={englishTestScores.speaking || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, speaking: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Test Date</label>
                                    <input
                                        type="date"
                                        value={englishTestScores.testDate || ''}
                                        onChange={(e) => setEnglishTestScores({ ...englishTestScores, testDate: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education Background */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-600 pb-2 border-b">Education Background</h4>
                                <button
                                    type="button"
                                    onClick={addEducationBackground}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Education
                                </button>
                            </div>
                            {educationBackground.length === 0 ? (
                                <p className="text-sm text-gray-500 mt-4">No education background added yet</p>
                            ) : (
                                educationBackground.map((edu, index) => (
                                    <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50 mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Institution</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Degree</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Field of Study</label>
                                                <input
                                                    type="text"
                                                    value={edu.fieldOfStudy}
                                                    onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Year Completed</label>
                                                <input
                                                    type="text"
                                                    value={edu.yearCompleted}
                                                    onChange={(e) => handleEducationChange(index, 'yearCompleted', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Grades</label>
                                                <input
                                                    type="text"
                                                    value={edu.grades}
                                                    onChange={(e) => handleEducationChange(index, 'grades', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Out Of</label>
                                                <input
                                                    type="text"
                                                    value={edu.outOf}
                                                    onChange={(e) => handleEducationChange(index, 'outOf', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeEducationBackground(index)}
                                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove Education
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Visa Refusal Details */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">Visa Refusal Details</h4>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={visaRefusalDetails.hasRefusalHistory || false}
                                        onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, hasRefusalHistory: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="text-sm">Has visa refusal history?</label>
                                </div>
                                {visaRefusalDetails.hasRefusalHistory && (
                                    <div className="ml-6 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Country</label>
                                            <input
                                                type="text"
                                                value={visaRefusalDetails.country || ''}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, country: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Reason</label>
                                            <input
                                                type="text"
                                                value={visaRefusalDetails.reason || ''}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, reason: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Date of Refusal</label>
                                            <input
                                                type="date"
                                                value={visaRefusalDetails.dateOfRefusal || ''}
                                                onChange={(e) => setVisaRefusalDetails({ ...visaRefusalDetails, dateOfRefusal: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Applied for Visa Again</label>
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

                        {/* Emergency Contact */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">Emergency Contact</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.name || ''}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Relationship</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.relationship || ''}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.phone || ''}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.email || ''}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, email: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={emergencyContact.address || ''}
                                        onChange={(e) => setEmergencyContact({ ...emergencyContact, address: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Passport Details */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">Passport Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Passport Number</label>
                                    <input
                                        type="text"
                                        value={passportDetails.passportNumber || ''}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, passportNumber: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issue Date</label>
                                    <input
                                        type="date"
                                        value={passportDetails.issueDate || ''}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, issueDate: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={passportDetails.expiryDate || ''}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, expiryDate: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issue Authority</label>
                                    <input
                                        type="text"
                                        value={passportDetails.issueAuthority || ''}
                                        onChange={(e) => setPassportDetails({ ...passportDetails, issueAuthority: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Previous Passport Numbers */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-600 pb-2 border-b">Previous Passport Numbers</h4>
                                <button
                                    type="button"
                                    onClick={addPreviousPassportNumber}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Passport Number
                                </button>
                            </div>
                            {previousPassportNumbers.length === 0 ? (
                                <p className="text-sm text-gray-500 mt-4">No previous passport numbers added yet</p>
                            ) : (
                                previousPassportNumbers.map((number, index) => (
                                    <div key={index} className="flex items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={number}
                                            onChange={(e) => handlePreviousPassportNumberChange(index, e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md"
                                            placeholder="Passport Number"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removePreviousPassportNumber(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Travel History */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-600 pb-2 border-b">Travel History</h4>
                                <button
                                    type="button"
                                    onClick={addTravelHistory}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    Add Travel History
                                </button>
                            </div>
                            {travelHistory.length === 0 ? (
                                <p className="text-sm text-gray-500 mt-4">No travel history added yet</p>
                            ) : (
                                travelHistory.map((travel, index) => (
                                    <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50 mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Country</label>
                                                <input
                                                    type="text"
                                                    value={travel.country}
                                                    onChange={(e) => handleTravelHistoryChange(index, 'country', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">From Date</label>
                                                <input
                                                    type="date"
                                                    value={travel.formDate}
                                                    onChange={(e) => handleTravelHistoryChange(index, 'formDate', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">To Date</label>
                                                <input
                                                    type="date"
                                                    value={travel.toDate}
                                                    onChange={(e) => handleTravelHistoryChange(index, 'toDate', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Reason of Visit</label>
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
                                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove Travel History
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* File Uploads */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-600 pb-2 border-b">File Uploads</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Passport Document</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">CV Document</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        accept=".pdf,.doc,.docx"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center min-w-24"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : "Update Enquiry"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditStudentEnquiryModel;