/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useCareer from "../../../hooks/useCareer";
import Hero from "../../common/Hero/Hero";
import careerImage from '../../../assets/career.jpg'
import { FiHelpCircle } from "react-icons/fi";
import { OctagonX } from "lucide-react";


const JobApplicationForm = () => {
    const { createCareer, loading } = useCareer();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: '',
        currentAddress: '',
        jobType: 'Full Time' as 'Full Time' | 'Part Time' | 'Casual' | 'Internship',
    });
    const [selectedIdCard, setSelectedIdCard] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedResume, setSelectedResume] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    // Enhanced validation function
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.phone || !phoneRegex.test(formData.phone))
            newErrors.phone = "Valid phone number is required";
        if (!formData.email || !emailRegex.test(formData.email))
            newErrors.email = "Valid email is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.currentAddress) newErrors.currentAddress = "Address is required";
        if (!selectedIdCard) newErrors.idCard = "ID card is required";
        if (!selectedResume) newErrors.resume = "Resume is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedIdCard(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedResume(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage(null);
        if (!validateForm()) return;

        // Validate form fields
        const { firstName, lastName, phone, email, country, currentAddress, jobType } = formData;
        if (!firstName || !lastName || !phone || !email || !country || !currentAddress || !jobType || !selectedIdCard || !selectedResume) {
            alert("All fields are required.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("firstName", firstName);
        formDataToSend.append("lastName", lastName);
        formDataToSend.append("phone", phone);
        formDataToSend.append("email", email);
        formDataToSend.append("country", country);
        formDataToSend.append("currentAddress", currentAddress);
        formDataToSend.append("jobType", jobType);
        formDataToSend.append("idCard", selectedIdCard);  // Image File
        formDataToSend.append("resume", selectedResume); // PDF File
        try {
            await createCareer(formDataToSend);
            setSuccessMessage("Application submitted successfully!");
        } catch (error) {
            console.error(error);
            setErrors({ form: "Failed to submit application. Please try again." });
        } finally {
            // Reset form fields
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                country: '',
                currentAddress: '',
                jobType: 'Full Time',
            });
            setSelectedIdCard(null);
            setSelectedResume(null);
            setPreviewImage(null);
        }
    };
    // Add drag and drop functionality
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'idCard' | 'resume') => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (type === 'idCard' && file.type.startsWith('image/')) {
            handleImageChange({ target: { files: [file] } } as any);
        } else if (type === 'resume' && file.type === 'application/pdf') {
            handleResumeChange({ target: { files: [file] } } as any);
        }
    };



    return (
        <main className="w-full">
            <Hero bgImage={careerImage} heroName="Job Application" />
            {/* Success/Error Messages */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-auto max-w-4xl mt-4">
                    <span className="block sm:inline pr-8">{successMessage}</span>
                    <button
                        onClick={() => setSuccessMessage(null)}
                        className="absolute cursor-pointer top-0 right-0 px-3 py-2 hover:text-green-900"
                        aria-label="Close success message"
                    >
                        <OctagonX />
                    </button>
                </div>
            )}
            {errors.form && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto max-w-4xl mt-4">
                    <span className="block sm:inline pr-8">{errors.form}</span>
                    <button
                        onClick={() => setErrors(prev => ({ ...prev, form: '' }))}
                        className="absolute top-0 right-0 px-3 py-2 hover:text-red-900  cursor-pointer"
                        aria-label="Close error message"
                    >
                        <OctagonX />
                    </button>
                </div>
            )}
            <div className="inset-0  py-10 flex items-center justify-center">
                <div className="bg-white max-w-4xl p-4 md:p-6 w-full shadow-lg rounded-lg">
                    <h3 className="text-2xl text-midnight font-bold mb-6 border-b pb-2">
                        Application Form
                        <span className="text-sm text-gray-500 ml-2 font-normal">
                            (All fields are required)
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                        {/* Form Sections */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4 flex items-center">
                                Personal Information
                                <FiHelpCircle className="ml-2 text-gray-400 hover:text-blue-500 cursor-help"
                                    title="Please provide your legal name as it appears on official documents" />
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        First Name
                                        {errors.firstName &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.firstName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your First Name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Last Name
                                        {errors.lastName &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.lastName}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Contact Information Section */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold mb-4  text-midnight">Contact Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Phone Number
                                        {errors.phone &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.phone}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email Address
                                        {errors.email &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.email}</span>}
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Country Name"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Your Current Address</label>
                                    <textarea
                                        required
                                        value={formData.currentAddress}
                                        onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                        rows={3}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 space-x-5">
                            <div className="col-span-2 mb-4">
                                <div className="rounded-sm border border-stroke bg-white shadow-default">
                                    <div className="border-b border-stroke py-4 px-7">
                                        <h3 className="font-medium text-black">Upload ID card</h3>
                                    </div>
                                    <div className="p-7">
                                        {previewImage && (
                                            <div className="relative mb-5">
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className={`rounded w-full max-h-[300px] object-contain`}
                                                />
                                            </div>
                                        )}
                                        <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 sm:py-7.5">
                                            <input
                                                required
                                                type="file"
                                                accept="image/jpeg"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 focus:outline-blue-500"
                                            />
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white ">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white ">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                                fill="#3C50E0"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                                fill="#3C50E0"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                                fill="#3C50E0"
                                                            />
                                                        </svg>
                                                    </span>
                                                </span>
                                                <p>
                                                    <span className="text-primary">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="mt-1.5">PNG, JPG</p>
                                                <p>(max, 800 X 800px)</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4.5">
                                            <button
                                                className="flex justify-center rounded border hover:bg-gray-50 border-stroke py-2 px-6 font-medium text-black hover:shadow-1 cursor-pointer"
                                                type="button"
                                                onClick={() => {
                                                    setSelectedIdCard(null);
                                                    setPreviewImage(null);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div className=" mb-8">
                            <label className="block text-sm font-medium mb-2">
                                Resume/CV
                                {errors.resume &&
                                    <span className="text-red-500 text-sm ml-2">*{errors.resume}</span>}
                            </label>
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
                                onDrop={(e) => handleDrop(e, 'resume')}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleResumeChange}
                                    className="hidden"
                                    id="resumeUpload"
                                />
                                <label
                                    htmlFor="resumeUpload"
                                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                                >
                                    Click to upload PDF
                                </label>
                                <p className="text-sm text-gray-500 mt-2">
                                    PDF only (max 5MB)
                                </p>
                                {selectedResume && (
                                    <p className="text-sm mt-2 text-green-600">
                                        ✓ {selectedResume.name}
                                    </p>
                                )}
                            </div>
                        </div>


                        {/* Job Type Selection */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold mb-4  text-midnight">Position Details</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Employment Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Full Time', 'Part Time', 'Casual', 'Internship'].map((type) => (
                                            <label
                                                key={type}
                                                className="flex items-center space-x-2 p-3 border rounded-lg hover:border-blue-500 cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    checked={formData.jobType === type}
                                                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value as any })}
                                                    className="form-radio text-blue-500"
                                                />
                                                <span className="text-sm">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full py-3 px-6 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
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

                </div >
            </div >
        </main >

    )
}

export default JobApplicationForm