import { MapPinIcon } from 'lucide-react'

const PackageSearchBar = () => {
    return (
        <div className="bg-white py-4 px-4 shadow-sm">
            <div className="container mx-auto flex justify-center">
                <div className="relative w-full max-w-3xl flex">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPinIcon className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Search by destination or keywords"
                        />
                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <button className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PackageSearchBar