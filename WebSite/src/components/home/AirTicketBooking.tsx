/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../common/CalendarIcon/CalendarIcon';
import useFlightLocations from '../../hooks/useFlightLocations'; // Import the custom hook
import Select, { StylesConfig } from 'react-select'; // Import react-select
import PassengerCounter from '../AirTicketBooking/PassengerCounter';

interface AirTicketBookingProps {
    className?: string;
}

type OptionType = {
    label: string;
    value: string;
};

export default function AirTicketBooking({ className }: AirTicketBookingProps) {
    const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [adult, setAdult] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [origin, setOrigin] = useState<any>(null); // Use any for react-select
    const [destination, setDestination] = useState<any>(null); // Use any for react-select

    const navigate = useNavigate();
    const { flightLocations } = useFlightLocations(); // Use the custom hook to get flight locations

    // Transform flight locations for react-select
    const locationOptions = flightLocations.map(location => ({
        value: location.id,
        label: `(${location.airportCode})${location.cityName}, ${location.airportName} `, // Display format
    }));

    const handleBookFlight = () => {
        navigate('/booking', {
            state: {
                tripType,
                origin: origin?.label, // Get the selected label
                destination: destination?.label, // Get the selected label
                startDate,
                endDate,
                adult,
                children,
                infants
            },
        });
    };

    const customStyles: StylesConfig<OptionType, false> = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb', // blue-500 or gray-600
            boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
            '&:hover': {
                borderColor: '#3b82f6',
            },
            paddingLeft: '2rem',
            paddingTop: '0.4rem',   // Tailwind: py-2
            paddingBottom: '0.4rem',
            borderRadius: '0.5rem', // Tailwind: rounded-lg
        })

    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const passengerSummary = `${adult} Adult${adult > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`;


    return (
        <section className="pt-25 max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <div className="text-3xl sm:text-4xl font-medium mb-4 text-midnight">
                    Book Your Flight Tickets
                </div>
                <div className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Find the best deals on flight tickets. Enjoy seamless booking, exclusive offers, and explore destinations worldwide.
                </div>
            </div>
            <div
                className={`bg-white rounded-2xl p-6 mx-4 ${className}`}
                style={{
                    boxShadow: '0 0px 25px 5px rgba(0, 0, 0, 0.1)',
                }}
            >
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
                    {/* Origin Dropdown */}
                    <div className="relative">
                        <Select
                            options={locationOptions}
                            value={origin}
                            onChange={setOrigin}
                            placeholder="Flying From"
                            className="basic-single"
                            classNamePrefix="select"
                            styles={customStyles}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute left-3 top-3.5 text-blue-400 pointer-events-none"
                        >
                            <path d="M2 22h20" />
                            <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
                        </svg>
                    </div>

                    {/* Destination Dropdown */}
                    <div className="relative">
                        <Select
                            options={locationOptions}
                            value={destination}
                            onChange={setDestination}
                            placeholder="Flying To"
                            className="basic-single"
                            classNamePrefix="select"
                            styles={customStyles}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute left-3 top-3.5 text-blue-400 pointer-events-none"
                        >
                            <path d="M2 22h20" />
                            <path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z" />
                        </svg>
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
                            dateFormat="dd/MM/yyyy"
                        />
                        <CalendarIcon className="w-5 h-5 text-blue-400 absolute left-3 top-3.5" />
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
                                dateFormat="dd/MM/yyyy"
                            />
                            <CalendarIcon className="w-5 h-5 text-blue-400 absolute left-3 top-3.5" />
                        </div>
                    )}

                    {/* Passengers Dropdown */}
                    <div className="relative w-full" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="w-full text-left pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                        >
                            <span className="text-sm text-gray-500 absolute left-3 top-3">Passengers</span>
                            <span className="text-base pl-20 text-gray-800">{passengerSummary}</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg p-4 space-y-4">
                                <PassengerCounter
                                    value={adult}
                                    onIncrement={() => setAdult(prev => prev + 1)}
                                    onDecrement={() => setAdult(prev => Math.max(1, prev - 1))}
                                    label="Adults"
                                    tag='Above 12 years old'
                                />
                                <hr className="border-t-2 border-red-300 mx-auto " />
                                <PassengerCounter
                                    value={children}
                                    onIncrement={() => setChildren(prev => prev + 1)}
                                    onDecrement={() => setChildren(prev => Math.max(0, prev - 1))}
                                    label="Children"
                                    tag='2-12 years old'
                                />
                                <hr className="border-t-2 border-red-300 mx-auto " />
                                <PassengerCounter
                                    value={infants}
                                    onIncrement={() => setInfants(prev => prev + 1)}
                                    onDecrement={() => setInfants(prev => Math.max(0, prev - 1))}
                                    label="Infants"
                                    tag='Below 2 years old'
                                />
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleBookFlight}
                        disabled={!origin || !destination}
                        className="w-full place-self-center md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                        Book Flights
                    </button>
                </div>
            </div>
        </section>
    );
}