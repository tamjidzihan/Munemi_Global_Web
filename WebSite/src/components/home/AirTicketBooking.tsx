import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PaperAirplaneIcon, UserIcon } from '@heroicons/react/24/outline';
import CalendarIcon from '../common/CalendarIcon/CalendarIcon';

interface AirTicketBookingProps {
    className?: string;
}

export default function AirTicketBooking({ className }: AirTicketBookingProps) {
    const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [travelers, setTravelers] = useState(1);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleBookFlight = () => {
        // Navigate to the booking page with the selected data
        navigate('/booking', {
            state: {
                tripType,
                origin,
                destination,
                startDate,
                endDate,
                travelers,
            },
        });
    };

    return (
        <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-4">
            <div className={`bg-white rounded-2xl p-6 shadow-xl mx-4 ${className}`}>
                <div className="flex gap-4 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tripType"
                            value="one-way"
                            checked={tripType === 'one-way'}
                            onChange={(e) => setTripType(e.target.value as 'one-way')}
                            className="w-5 h-5 text-blue-600"
                        />
                        One Way
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tripType"
                            value="round-trip"
                            checked={tripType === 'round-trip'}
                            onChange={(e) => setTripType(e.target.value as 'round-trip')}
                            className="w-5 h-5 text-blue-600"
                        />
                        Round Trip
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Origin */}
                    <div className="relative flex items-center">
                        <PaperAirplaneIcon className="w-5 h-5 text-gray-400 absolute left-3" />
                        <input
                            type="text"
                            placeholder="Flying From"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Destination */}
                    <div className="relative flex items-center">
                        <PaperAirplaneIcon className="w-5 h-5 text-gray-400 absolute left-3 rotate-45" />
                        <input
                            type="text"
                            placeholder="Flying To"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Departure Date */}
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={(date: SetStateAction<Date | null>) => setStartDate(date)}
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Journey Date"
                            className="w-full pl-10 pr-20 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            minDate={new Date()}
                        />
                        <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>

                    {/* Return Date */}
                    {tripType === 'round-trip' && (
                        <div className="relative">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="Return Date"
                                className="w-full pl-10 pr-20 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                minDate={startDate || new Date()}
                            />
                            <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                    )}

                    {/* Travelers */}
                    <div className="relative flex items-center">
                        <UserIcon className="w-5 h-5 text-gray-400 absolute left-3" />
                        <select
                            value={travelers}
                            onChange={(e) => setTravelers(Number(e.target.value))}
                            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}

                    <button
                        onClick={handleBookFlight}
                        className="w-xl place-self-center md:col-span-4 bg-blue-600 hover:bg-blue-700  text-white text-xl font-semibold py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                        Book Flights
                    </button>

                </div>
            </div>
        </section>
    );
}