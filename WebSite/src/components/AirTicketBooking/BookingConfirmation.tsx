/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFlightBookings from '../../hooks/useFlightBookings';
import Alert from '../common/Alert/Alert';
import { sendConfirmationSms } from '../../services/sendConfirmationSms';

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
        const mobileRegex = /^01\d{9}$/; // Must start with 01 and have exactly 11 digits
        if (!mobileRegex.test(mobile)) {
            setAlert({ message: 'Please enter a valid mobile number starting with 01 and exactly 11 digits.', type: 'error' });
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

            // Prepare SMS message
            const smsMessage = `প্রিয় ${fullName}, আপনার বুকিং MunemiGlobal.com এর পক্ষ হতে নিশ্চিত করা হয়েছে।
ভ্রমণের বিবরণ:
- থেকে: ${origin}
- পর্যন্ত: ${destination}
- তারিখ: ${startDate?.toLocaleDateString('en-GB')}
${tripType === 'round-trip' ? `- প্রত্যাবর্তন: ${endDate?.toLocaleDateString('en-GB')}` : ''} 
আমাদের একজন টিম সদস্য অতি শীঘ্রই আপনার সঙ্গে যোগাযোগ করবেন, ভ্রমণ সংক্রান্ত বিস্তারিত নিশ্চিত করতে এবং প্রয়োজনীয় সহায়তা প্রদান করতে। ধন্যবাদ।`;

            // Send confirmation SMS
            await sendConfirmationSms(`+88${mobile}`, smsMessage);

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

            <section className="mb-8 bg-white shadow-md p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Summary</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Detail</th>
                                <th className="py-3 px-6 text-left">Information</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6">Trip Type</td>
                                <td className="py-3 px-6">{tripType}</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6">Origin</td>
                                <td className="py-3 px-6">{origin}</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6">Destination</td>
                                <td className="py-3 px-6">{destination}</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6">Departure Date</td>
                                <td className="py-3 px-6">{startDate?.toLocaleDateString('en-GB')}</td>
                            </tr>
                            {tripType === 'round-trip' && (
                                <tr className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6">Return Date</td>
                                    <td className="py-3 px-6">{endDate?.toLocaleDateString('en-GB')}</td>
                                </tr>
                            )}
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6">Adults</td>
                                <td className="py-3 px-6">{adult}</td>
                            </tr>
                            {children > 0 && (
                                <tr className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6">Children</td>
                                    <td className="py-3 px-6">{children}</td>
                                </tr>
                            )}
                            {infants > 0 && (
                                <tr className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6">Infants</td>
                                    <td className="py-3 px-6">{infants}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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
                    <div className="mt-4 p-4 border-l-4 border-blue-600 bg-blue-50">
                        <p className="font-semibold text-gray-800">* Note:</p>
                        <p className="text-gray-700">
                            Thank you for your booking! Our team will reach out to you shortly to confirm your booking details and provide any further assistance you may need.
                            If you have any questions or require additional information, please do not hesitate to contact us.
                        </p>
                        <p className="text-gray-700 mt-2">
                            For assistance, you can reach us via email at {" "}
                            <a href="mailto:info@munemiglobal.com" className="text-blue-600 hover:underline">
                                info@munemiglobal.com
                            </a>
                            {" "}  or call us at{" "}
                            <a href="tel:+8801600300877" className="text-blue-600 hover:underline">
                                +880 160 0300877.
                            </a>
                        </p>
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