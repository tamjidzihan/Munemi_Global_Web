import { CalendarIcon, MapPin, UsersIcon } from 'lucide-react'
import { PackageProps } from '../../../hooks/usePackage'
import { truncateText } from '../../../helpers/helpers'

interface PackageListCardProps {
    pkg: PackageProps
}

export function PackageListCard({ pkg }: PackageListCardProps) {
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-md overflow-hidden shadow-sm mb-6">
            <div className="relative md:w-1/3 h-48 md:h-auto">
                <img
                    src={`${import.meta.env.VITE_APICLIENT}/uploads/${pkg.images[0].url}`}
                    alt={pkg.destination}
                    className="w-full h-full object-cover"
                />
                {/* <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 text-white px-3 py-1 text-sm rounded">
                    {pkg.destination}
                </div> */}
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white font-bold px-3 py-1 z-20 rounded-md flex items-center">
                    <MapPin size={20} className="text-green-500 mr-2" />
                    <span> {pkg.destination}</span>
                </div>
            </div>
            <div className="p-4 md:w-2/3 flex flex-col justify-between">
                <div>
                    <div className="text-2xl font-medium text-midnight mb-2">{pkg.title}</div>
                    <div className="text-sm text-gray-600 mb-4"
                        dangerouslySetInnerHTML={{ __html: truncateText(pkg.description) }}
                    />
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>
                            {pkg.duration}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <UsersIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>{pkg.numberOftraveller}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <div className="text-lg font-bold text-green-600">
                            BDT {pkg.price}
                        </div>
                        <div className="text-xs text-gray-500">Per person</div>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                        PACKAGE DETAILS
                    </button>
                </div>
            </div>
        </div>
    )
}
