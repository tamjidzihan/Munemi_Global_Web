import { useState } from "react";
import useHealthInsurancePartners from "../../../hooks/useHealthInsurancePartners";
import Hero from "../../common/Hero/Hero";
import healthInsuranceImage from '../../../assets/health-insurance.png';
import { FiHelpCircle } from "react-icons/fi";
import Alert from "../../common/Alert/Alert";



const HealthInsurancePartnerForm = () => {
    const { createHealthInsurancePartner, loading } = useHealthInsurancePartners();
    const [formData, setFormData] = useState({
        tradingName: '',
        businessRegistrationNumber: '',
        officePhoneNumber: '',
        countryLocated: '',
        primaryOfficeLocation: '',
        website: '',
        applyingAs: '',
        otherInsuranceType: '',
        firstName: '',
        lastName: '',
        position: '',
        contactEmail: '',
        contactPhoneNumber: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

        if (!formData.tradingName) newErrors.tradingName = "Trading name is required";
        if (!formData.businessRegistrationNumber) newErrors.businessRegistrationNumber = "Business registration number is required";
        if (!formData.officePhoneNumber || !phoneRegex.test(formData.officePhoneNumber)) newErrors.officePhoneNumber = "Valid phone number is required";
        if (!formData.countryLocated) newErrors.countryLocated = "Country is required";
        if (!formData.primaryOfficeLocation) newErrors.primaryOfficeLocation = "Office location is required";
        if (!formData.applyingAs) newErrors.applyingAs = "Applying as is required";
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.contactEmail || !emailRegex.test(formData.contactEmail)) newErrors.contactEmail = "Valid email is required";
        if (!formData.contactPhoneNumber || !phoneRegex.test(formData.contactPhoneNumber)) newErrors.contactPhoneNumber = "Valid phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setAlert(null);

        if (!validateForm()) return;

        try {
            await createHealthInsurancePartner(formData);

            setAlert({ message: "Application created successfully!", type: 'success' });

        } catch (error) {
            console.error(error);
            setAlert({ message: "Failed to create health insurance partner.", type: 'error' });
        } finally {
            setFormData({
                tradingName: '',
                businessRegistrationNumber: '',
                officePhoneNumber: '',
                countryLocated: '',
                primaryOfficeLocation: '',
                website: '',
                applyingAs: '',
                otherInsuranceType: '',
                firstName: '',
                lastName: '',
                position: '',
                contactEmail: '',
                contactPhoneNumber: '',
            });
        }
    };

    return (
        <main className="w-full">
            <Hero bgImage={healthInsuranceImage} heroName="New Health Insurance Partner" />
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
                        Health-Insurance Partner Application Form
                        <span className="text-sm text-gray-500 ml-2 font-normal">
                            (All required fields are marked with *)
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                        {/* Company Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">
                                Company Information
                                <FiHelpCircle
                                    className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                    title="Official company details as per business registration" />
                            </h4>
                            <div className="grid  md:grid-cols-2 gap-4">
                                <div className=" col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Trading Name *
                                        {errors.tradingName &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.tradingName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Official Trading Name"
                                        value={formData.tradingName}
                                        onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className=" col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Business Registration Number *
                                        {errors.businessRegistrationNumber &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.businessRegistrationNumber}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Registration Number"
                                        value={formData.businessRegistrationNumber}
                                        onChange={(e) => setFormData({ ...formData, businessRegistrationNumber: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className=" col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Office Phone *
                                        {errors.officePhoneNumber &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.officePhoneNumber}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.officePhoneNumber}
                                        onChange={(e) => setFormData({ ...formData, officePhoneNumber: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className=" col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Country Located *
                                        {errors.countryLocated &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.countryLocated}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Country Name"
                                        value={formData.countryLocated}
                                        onChange={(e) => setFormData({ ...formData, countryLocated: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Primary Office Location *
                                        {errors.primaryOfficeLocation &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.primaryOfficeLocation}</span>}
                                    </label>
                                    <textarea
                                        placeholder="Full Office Address"
                                        value={formData.primaryOfficeLocation}
                                        onChange={(e) => setFormData({ ...formData, primaryOfficeLocation: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        rows={3}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Contact Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        First Name *
                                        {errors.firstName &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.firstName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contact First Name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Last Name *
                                        {errors.lastName &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.lastName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contact Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Position *
                                        {errors.position &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.position}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contact Position"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Contact Email *
                                        {errors.contactEmail &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.contactEmail}</span>}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="contact@example.com"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Contact Phone *
                                        {errors.contactPhoneNumber &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.contactPhoneNumber}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.contactPhoneNumber}
                                        onChange={(e) => setFormData({ ...formData, contactPhoneNumber: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Additional Details</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Website (optional)</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Applying As *
                                        {errors.applyingAs &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.applyingAs}</span>}
                                    </label>
                                    <select
                                        value={formData.applyingAs}
                                        onChange={(e) => setFormData({ ...formData, applyingAs: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    >
                                        <option value="" disabled>Select application type</option>
                                        <option value="Singles">Singles</option>
                                        <option value="Single Couples">Single Couples</option>
                                        <option value="Overseas Visitors">Overseas Visitors</option>
                                        <option value="Overseas Student">Overseas Student</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {formData.applyingAs === 'Other' && (
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Specify Insurance Type</label>
                                        <input
                                            type="text"
                                            placeholder="Describe insurance type"
                                            value={formData.otherInsuranceType}
                                            onChange={(e) => setFormData({ ...formData, otherInsuranceType: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            disabled={loading}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-8 flex justify-between">

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
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

export default HealthInsurancePartnerForm;