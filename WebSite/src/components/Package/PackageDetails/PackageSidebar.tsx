import { ClockIcon, UsersIcon, TruckIcon, MapPinIcon } from 'lucide-react'
import { Link } from 'react-router-dom';

interface PackageSidebarProps {
    price?: number;
    duration?: string;
    numberOftraveller?: number;
    destination?: string;
}


export const PackageSidebar = ({ price, duration, numberOftraveller, destination }: PackageSidebarProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-sm text-gray-500">Starting From</div>
            <div className="text-2xl font-bold text-green-600">BDT {price}</div>
            <div className="text-sm text-gray-500">Per person</div>
            <hr className="border-t-2 border-red-200 mx-auto my-3" />
            <div className="mt-6 space-y-4">
                <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Package Destination
                        </div>
                        <div className='text-gray-600 mt-1'>{destination}</div>
                        {/* <ul className="text-sm ">
                            <li>Marina Bay</li>
                            <li>Clarke Quay</li>
                            <li>Bugis Street</li>
                            <li>Little India</li>
                            <li>Gardens by the Bay and Leisure</li>
                        </ul> */}
                    </div>
                </div>
                <div className="flex items-start">
                    <ClockIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Holiday Package Duration
                        </div>
                        <div className="text-sm text-gray-600">{duration}</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <UsersIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Number of People
                        </div>
                        <div className="text-sm text-gray-600">{numberOftraveller}</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <TruckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">Pickup</div>
                        <div className="text-sm text-gray-600">Not Applicable</div>
                    </div>
                </div>

                {/* Appointment Button */}
                <div className="flex justify-content-center pt-4 md:pt-8">
                    <Link to="/about/appointment-booking" className="w-full sm:w-auto ">
                        <button className="w-full text-center cursor-pointer py-1.5 px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.05] shadow-lg hover:shadow-xl sm:text-sm">
                            Book An Appointment
                        </button>
                    </Link>
                </div>

            </div>

            {/* <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md mt-6 uppercase text-sm tracking-wide">
                Book this package
            </button> */}
        </div>
    )
}
