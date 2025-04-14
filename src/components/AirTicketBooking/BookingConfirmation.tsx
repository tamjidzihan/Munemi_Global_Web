import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { tripType, origin, destination, startDate, endDate, travelers } = location.state || {};

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl mt-8">
            <h1 className="text-3xl font-bold text-midnight mb-6">Booking Confirmation</h1>

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
                    <li><span className="font-medium">Travelers:</span> {travelers}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
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
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your mobile number"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Confirm Booking
                    </button>
                </form>
            </section>
        </div>
    );
};

export default BookingConfirmation;
