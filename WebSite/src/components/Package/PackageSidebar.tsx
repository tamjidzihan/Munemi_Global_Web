import { MapPinIcon, ClockIcon, UsersIcon, TruckIcon } from 'lucide-react'
export const PackageSidebar = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-sm text-gray-500">Starting From</div>
            <div className="text-2xl font-bold text-green-600">BDT 19,500</div>
            <div className="text-sm text-gray-500">Per person</div>
            <div className="mt-6 space-y-4">
                <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Holiday Package Spots
                        </div>
                        <ul className="text-sm text-gray-600 mt-1">
                            <li>Marina Bay</li>
                            <li>Clarke Quay</li>
                            <li>Bugis Street</li>
                            <li>Little India</li>
                            <li>Gardens by the Bay and Leisure</li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-start">
                    <ClockIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Holiday Package Duration
                        </div>
                        <div className="text-sm text-gray-600">3 Days, 2 Nights</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <UsersIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Number of People
                        </div>
                        <div className="text-sm text-gray-600">2</div>
                    </div>
                </div>
                <div className="flex items-start">
                    <TruckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">Pickup</div>
                        <div className="text-sm text-gray-600">Not Applicable</div>
                    </div>
                </div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md mt-6 uppercase text-sm tracking-wide">
                Book this day package
            </button>
        </div>
    )
}
