import { useState } from "react";
import useInstitutionPartners, { InstitutionPartner } from "../../../hooks/useInstitutionPartners";
import Hero from "../../common/Hero/Hero";
import institutionImage from '../../../assets/slide-3.jpg';
import { FiHelpCircle } from "react-icons/fi";
import Alert from "../../common/Alert/Alert";

const validCourses = [
    'English Courses', 'Certificate III', 'Pathway Program', 'RPL Course',
    'Year 12', 'Certificate IV', 'Bachelor\'s Degree',
    'International Year One', 'Diploma', 'Master\'s Degree', 'Foundation',
    'Advance Diploma', 'Post Graduate Diploma', 'Others'
];

const InstitutionPartnerForm = () => {
    const { createInstitutionPartner, loading } = useInstitutionPartners();
    const [formData, setFormData] = useState({
        fullNameOfInstitute: '',
        category: '' as InstitutionPartner['category'],
        coursesProviding: [] as string[],
        otherCourses: '',
        businessRegistrationNumber: '',
        countryLocated: '',
        campusLocations: '',
        primaryEmailAddress: '',
        website: '',
        firstName: '',
        lastName: '',
        position: '',
        contactEmail: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

        if (!formData.fullNameOfInstitute) newErrors.fullNameOfInstitute = "Institute name is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (formData.coursesProviding.length === 0) newErrors.coursesProviding = "At least one course is required";
        if (formData.coursesProviding.includes('Others') && !formData.otherCourses) newErrors.otherCourses = "Other courses specification is required";
        if (!formData.businessRegistrationNumber) newErrors.businessRegistrationNumber = "Business registration number is required";
        if (!formData.countryLocated) newErrors.countryLocated = "Country is required";
        if (!formData.campusLocations) newErrors.campusLocations = "Campus locations are required";
        if (!formData.primaryEmailAddress || !emailRegex.test(formData.primaryEmailAddress)) newErrors.primaryEmailAddress = "Valid primary email is required";
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.contactEmail || !emailRegex.test(formData.contactEmail)) newErrors.contactEmail = "Valid contact email is required";
        if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = "Valid phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setAlert(null);

        if (!validateForm()) return;

        try {
            await createInstitutionPartner({
                ...formData,
                coursesProviding: formData.coursesProviding
            });

            setAlert({ message: "Institution partner created successfully!", type: 'success' });
            setFormData({
                fullNameOfInstitute: '',
                category: '' as InstitutionPartner['category'],
                coursesProviding: [],
                otherCourses: '',
                businessRegistrationNumber: '',
                countryLocated: '',
                campusLocations: '',
                primaryEmailAddress: '',
                website: '',
                firstName: '',
                lastName: '',
                position: '',
                contactEmail: '',
                phoneNumber: '',
            });
        } catch (error) {
            console.error(error);
            setAlert({ message: "Failed to create institution partner.", type: 'error' });
        }
    };

    return (
        <main className="w-full">
            <Hero bgImage={institutionImage} heroName="New Institution Partner" />
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
                        Institution Partner Application Form
                        <span className="text-sm text-gray-500 ml-2 font-normal">
                            (All required fields are marked with *)
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                        {/* Institution Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">
                                Institution Details
                                <FiHelpCircle
                                    className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                    title="Official institution details as per business registration" />
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Full Name of Institute *
                                        {errors.fullNameOfInstitute &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.fullNameOfInstitute}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Official Institute Name"
                                        value={formData.fullNameOfInstitute}
                                        onChange={(e) => setFormData({ ...formData, fullNameOfInstitute: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Category *
                                        {errors.category &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.category}</span>}
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as InstitutionPartner['category'] })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="University">University</option>
                                        <option value="Institute">Institute</option>
                                        <option value="Professional Year Provider">Professional Year Provider</option>
                                        <option value="RPL Provider">RPL Provider</option>
                                    </select>
                                </div>
                                <div>
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
                                <div>
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
                                        Campus Locations *
                                        {errors.campusLocations &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.campusLocations}</span>}
                                    </label>
                                    <textarea
                                        placeholder="List all campus locations"
                                        value={formData.campusLocations}
                                        onChange={(e) => setFormData({ ...formData, campusLocations: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        rows={3}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Primary Email Address *
                                        {errors.primaryEmailAddress && (
                                            <span className="text-red-500 text-sm ml-2">{errors.primaryEmailAddress}</span>
                                        )}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="institute@example.com"
                                        value={formData.primaryEmailAddress}
                                        onChange={(e) => setFormData({ ...formData, primaryEmailAddress: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-2">
                                        Website
                                        {errors.website && (
                                            <span className="text-red-500 text-sm ml-2">{errors.website}</span>
                                        )}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Courses Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Courses Offered</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Courses Providing *
                                        {errors.coursesProviding &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.coursesProviding}</span>}
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {validCourses.map(course => (
                                            <label key={course} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.coursesProviding.includes(course)}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            coursesProviding: isChecked
                                                                ? [...prev.coursesProviding, course]
                                                                : prev.coursesProviding.filter(c => c !== course)
                                                        }));
                                                        if (course === 'Others' && !isChecked) {
                                                            setFormData(prev => ({ ...prev, otherCourses: '' }));
                                                        }
                                                    }}
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                    disabled={loading}
                                                />
                                                <span className="text-sm">{course}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {formData.coursesProviding.includes('Others') && (
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">
                                            Specify Other Courses *
                                            {errors.otherCourses &&
                                                <span className="text-red-500 text-sm ml-2">*{errors.otherCourses}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Describe other courses offered"
                                            value={formData.otherCourses}
                                            onChange={(e) => setFormData({ ...formData, otherCourses: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                )}
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
                                        Phone Number *
                                        {errors.phoneNumber &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.phoneNumber}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* {/* Form Actions */}
                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    fullNameOfInstitute: '',
                                    category: '' as InstitutionPartner['category'],
                                    coursesProviding: [],
                                    otherCourses: '',
                                    businessRegistrationNumber: '',
                                    countryLocated: '',
                                    campusLocations: '',
                                    primaryEmailAddress: '',
                                    website: '',
                                    firstName: '',
                                    lastName: '',
                                    position: '',
                                    contactEmail: '',
                                    phoneNumber: '',
                                })}
                                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                                disabled={loading}
                            >
                                Cancel
                            </button>
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
                                        Submitting...
                                    </>
                                ) : (
                                    "Create Partner"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default InstitutionPartnerForm;