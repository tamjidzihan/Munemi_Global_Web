/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useAgentApplications from "../../../hooks/useAgentApplications";
import Hero from "../../common/Hero/Hero";
import agentImage from '../../../assets/agents.png';
import { FiHelpCircle } from "react-icons/fi";
import Alert from "../../common/Alert/Alert";

const AgentApplicationForm = () => {
    const { createAgentApplication, loading } = useAgentApplications();
    const [formData, setFormData] = useState({
        tradingName: '',
        businessRegistrationNumber: '',
        companyPhone: '',
        country: '',
        emailAddress: '',
        applyingAs: '' as 'Sub-Agent' | 'Super-Agent',
        primaryOfficeLocation: '',
        currentAddress: '',
        website: '',
        firstName: '',
        position: '',
        lastName: '',
        personalPhone: '',
        personalEmail: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [backendErrors, setBackendErrors] = useState<string[]>([]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

        if (!formData.tradingName) newErrors.tradingName = "Trading name is required";
        if (!formData.businessRegistrationNumber) newErrors.businessRegistrationNumber = "Business registration number is required";
        if (!formData.companyPhone || !phoneRegex.test(formData.companyPhone)) newErrors.companyPhone = "Valid phone number is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.primaryOfficeLocation) newErrors.primaryOfficeLocation = "Primary office location is required";
        if (!formData.currentAddress) newErrors.currentAddress = "Current address is required";
        if (!formData.applyingAs) newErrors.applyingAs = "Application type is required";
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.personalPhone || !phoneRegex.test(formData.personalPhone)) newErrors.personalPhone = "Valid phone number is required";
        if (!formData.personalEmail || !emailRegex.test(formData.personalEmail)) newErrors.personalEmail = "Valid email is required";
        if (!formData.emailAddress || !emailRegex.test(formData.emailAddress)) newErrors.emailAddress = "Valid company email is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setAlert(null);
        setBackendErrors([]);

        if (!validateForm()) return;

        try {
            await createAgentApplication(formData);
            setAlert({
                message: "Application submitted successfully! We will review your application shortly.",
                type: 'success'
            });
            // Reset form on success
            setFormData({
                tradingName: '',
                businessRegistrationNumber: '',
                companyPhone: '',
                country: '',
                emailAddress: '',
                applyingAs: '' as 'Sub-Agent' | 'Super-Agent',
                primaryOfficeLocation: '',
                currentAddress: '',
                website: '',
                firstName: '',
                position: '',
                lastName: '',
                personalPhone: '',
                personalEmail: '',
            });
        } catch (error: any) {
            // Handle backend validation errors
            if (error.message.includes('Please fill out all required fields')) {
                setAlert({
                    message: 'Please complete all required fields marked with *',
                    type: 'error'
                });
            } else if (error.message.includes('business Registration Number already exists')) {
                setAlert({
                    message: 'An application with this business registration number already exists. Please use a different registration number.',
                    type: 'error'
                });
                setErrors(prev => ({ ...prev, businessRegistrationNumber: 'This registration number is already in use' }));
            } else if (error.message.includes('Invalid application type')) {
                setAlert({
                    message: 'Please select a valid application type',
                    type: 'error'
                });
                setErrors(prev => ({ ...prev, applyingAs: 'Invalid application type selected' }));
            } else {
                setAlert({
                    message: error.message || 'Failed to submit application. Please try again.',
                    type: 'error'
                });
            }
        }
    };

    // Clear backend errors when form data changes
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear field-specific error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        // Clear backend errors when user interacts with the form
        if (backendErrors.length > 0) {
            setBackendErrors([]);
        }
        if (alert?.type === 'error') {
            setAlert(null);
        }
    };

    return (
        <main className="w-full">
            <Hero bgImage={agentImage} heroName="New Agent Application" />


            {/* Display submission alert */}
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="inset-0 py-10 flex items-center justify-center">
                <div className="bg-white max-w-4xl p-4 md:p-6 w-full shadow-lg rounded-lg">
                    <h3 className="text-2xl text-midnight font-bold mb-6 border-b pb-2">
                        Agent Application Form
                        <span className="text-sm text-gray-500 ml-2 font-normal">
                            (All required fields are marked with *)
                        </span>
                    </h3>

                    {/* Backend validation errors summary */}
                    {backendErrors.length > 0 && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <h4 className="text-red-800 font-semibold mb-2">Please fix the following issues:</h4>
                            <ul className="list-disc list-inside text-red-700">
                                {backendErrors.map((errorMsg, index) => (
                                    <li key={index}>{errorMsg}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                        {/* Company Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">
                                Company Information
                                <FiHelpCircle
                                    className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                    title="Official company details as per business registration"
                                />
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Trading Name *
                                        {errors.tradingName && <span className="text-red-500 text-sm ml-2">{errors.tradingName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Official Trading Name"
                                        value={formData.tradingName}
                                        onChange={(e) => handleInputChange('tradingName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Business Registration Number *
                                        {errors.businessRegistrationNumber && <span className="text-red-500 inline-block text-sm">{errors.businessRegistrationNumber}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Registration Number"
                                        value={formData.businessRegistrationNumber}
                                        onChange={(e) => handleInputChange('businessRegistrationNumber', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Company Phone *
                                        {errors.companyPhone && <span className="text-red-500 text-sm ml-2">{errors.companyPhone}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.companyPhone}
                                        onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Country *
                                        {errors.country && <span className="text-red-500 text-sm ml-2">{errors.country}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Country of Operation"
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Company Email *
                                        {errors.emailAddress && <span className="text-red-500 text-sm ml-2">{errors.emailAddress}</span>}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="company@example.com"
                                        value={formData.emailAddress}
                                        onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Office Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Office Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Primary Office Location *
                                        {errors.primaryOfficeLocation && <span className="text-red-500 text-sm ml-2">{errors.primaryOfficeLocation}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Office Address"
                                        value={formData.primaryOfficeLocation}
                                        onChange={(e) => handleInputChange('primaryOfficeLocation', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Current Address *
                                        {errors.currentAddress && <span className="text-red-500 text-sm ml-2">{errors.currentAddress}</span>}
                                    </label>
                                    <textarea
                                        placeholder="Current Physical Address"
                                        value={formData.currentAddress}
                                        onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        rows={3}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">Website (optional)</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com"
                                        value={formData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Application Type */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Application Type</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Applying As *
                                        {errors.applyingAs && <span className="text-red-500 text-sm ml-2">{errors.applyingAs}</span>}
                                    </label>
                                    <select
                                        value={formData.applyingAs}
                                        onChange={(e) => handleInputChange('applyingAs', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    >
                                        <option value="" disabled>Select application type</option>
                                        <option value="Sub-Agent">Sub-Agent</option>
                                        <option value="Super-Agent">Super-Agent</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Personal Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        First Name *
                                        {errors.firstName && <span className="text-red-500 text-sm ml-2">{errors.firstName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your First Name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Last Name *
                                        {errors.lastName && <span className="text-red-500 text-sm ml-2">{errors.lastName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Position *
                                        {errors.position && <span className="text-red-500 text-sm ml-2">{errors.position}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Position"
                                        value={formData.position}
                                        onChange={(e) => handleInputChange('position', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Personal Phone *
                                        {errors.personalPhone && <span className="text-red-500 text-sm ml-2">{errors.personalPhone}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.personalPhone}
                                        onChange={(e) => handleInputChange('personalPhone', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Personal Email *
                                        {errors.personalEmail && <span className="text-red-500 text-sm ml-2">{errors.personalEmail}</span>}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="personal@example.com"
                                        value={formData.personalEmail}
                                        onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Application"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AgentApplicationForm;