/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFlightBookings from '../../hooks/useFlightBookings';
import Alert from '../common/Alert/Alert';

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripType, origin, destination, startDate, endDate, adult, children, infants } = location.state || {};

    const { createBooking, loading } = useFlightBookings();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        if (!fullName || !email || !mobile) {
            setAlert({ message: 'Please fill out all required fields.', type: 'error' });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlert({ message: 'Please enter a valid email address.', type: 'error' });
            return;
        }

        // Validate mobile number format
        const mobileRegex = /^\+?[0-9]{10,15}$/;
        if (!mobileRegex.test(mobile)) {
            setAlert({ message: 'Please enter a valid mobile number.', type: 'error' });
            return;
        }

        // Create booking object
        const booking = {
            fullName,
            email,
            mobile,
            tripType,
            origin,
            destination,
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
            adult,
            children,
            infants,
        };

        try {
            // Save booking to backend
            await createBooking(booking);
            setAlert({ message: 'Booking confirmed successfully!', type: 'success' });

            // Clear form fields
            setFullName('');
            setEmail('');
            setMobile('');

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setAlert({ message: 'Failed to confirm booking. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl mt-8">
            <h1 className="text-3xl font-bold text-midnight mb-6">Booking Confirmation</h1>

            {/* Alert Notification */}
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            <section className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Trip Summary</h2>
                <ul className="space-y-2 text-gray-700">
                    <li><span className="font-medium">Trip Type:</span> {tripType}</li>
                    <li><span className="font-medium">Origin:</span> {origin}</li>
                    <li><span className="font-medium">Destination:</span> {destination}</li>
                    <li><span className="font-medium">Departure Date:</span> {startDate?.toLocaleDateString()}</li>
                    {tripType === 'round-trip' && (
                        <li><span className="font-medium">Return Date:</span> {endDate?.toLocaleDateString()}</li>
                    )}
                    <li><span className="font-medium">Adult:</span> {adult}</li>
                    {children && <li><span className="font-medium">Children:</span> {children}</li>}
                    {infants && <li><span className="font-medium">Infants:</span> {infants}</li>}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email < span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your mobile number"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Confirming...
                            </>
                        ) : (
                            'Confirm Booking'
                        )}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default BookingConfirmation;