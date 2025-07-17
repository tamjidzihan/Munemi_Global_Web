import { useState } from "react";
import useAppointments, { Appointment } from "../../../hooks/useAppointments";
import Hero from "../../common/Hero/Hero";
import heroImage from "../../../assets/slide-2.jpg";
import { FiHelpCircle } from "react-icons/fi";
import Alert from "../../common/Alert/Alert";

const AppointmentBookingForm = () => {
    const { createAppointment } = useAppointments();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        appointmentOffice: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Validation function
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
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.appointmentOffice) newErrors.appointmentOffice = "Office selection is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setAlert(null);

        if (!validateForm()) return;

        setLoading(true);
        const newAppointment: Appointment = {
            ...formData,
            updatedAt: "",
            id: "",
        };

        try {
            await createAppointment(newAppointment);
            setAlert({ message: "Appointment booked successfully!", type: 'success' });
        } catch (error) {
            console.error(error);
            setAlert({ message: "Failed to book appointment. Please try again.", type: 'error' });
        } finally {
            setLoading(false);
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                city: '',
                appointmentOffice: '',
                message: '',
            });
        }
    };

    return (
        <main className="w-full">
            <Hero bgImage={heroImage} heroName="Get Free Assessment" />
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
            <div className="max-w-4xl container mx-auto p-4 md:p-8">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-midnight mb-6 border-b pb-2">
                        Appointment Form
                        <span className="text-sm text-gray-500 ml-2 font-normal">
                            (All fields are required)
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                        {/* Personal Information Section */}
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
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
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
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Contact Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Phone Number
                                        {errors.phone &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.phone}</span>}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
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
                                        placeholder="your.email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Location Details</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        City
                                        {errors.city &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.city}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your City"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Appointment Office
                                        {errors.appointmentOffice &&
                                            <span className="text-red-500 text-sm ml-2">*{errors.appointmentOffice}</span>}
                                    </label>
                                    <select
                                        value={formData.appointmentOffice}
                                        onChange={(e) => setFormData({ ...formData, appointmentOffice: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                    >
                                        <option value="" disabled>Choose an office</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        {/* Add more office options as needed */}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Message Section */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-midnight mb-4">Additional Information</h4>
                            <div>
                                <label className="block text-sm font-medium mb-2">How can we help you?</label>
                                <textarea
                                    placeholder="Your message..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Send Request"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AppointmentBookingForm;