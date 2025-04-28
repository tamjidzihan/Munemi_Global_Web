
const PackageFilters = () => {
    return (
        <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-medium text-gray-900">Filters</div>
                <button className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
                    RESET
                </button>
            </div>
            <div className="mb-6">
                <div className="text-sm font-medium text-orange-500 mb-2">
                    Price Range
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>10.5K</span>
                    <span>25.0K</span>
                </div>
                <div className="relative">
                    <div className="h-1 bg-gray-200 rounded-full">
                        <div
                            className="absolute h-1 bg-green-500 rounded-full"
                            style={{
                                width: '60%',
                                left: '10%',
                            }}
                        ></div>
                    </div>
                    <div
                        className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full -mt-1.5"
                        style={{
                            left: '10%',
                        }}
                    ></div>
                    <div
                        className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full -mt-1.5"
                        style={{
                            left: '70%',
                        }}
                    ></div>
                </div>
            </div>
            <div>
                <div className="text-sm font-medium text-orange-500 mb-3">Duration</div>
                <div className="space-y-2">
                    {['Day Tour', 'One Day', 'Two Day', 'Three Day'].map((option) => (
                        <label key={option} className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
                <button className="text-sm text-blue-500 mt-3 flex items-center">
                    SHOW MORE
                    <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default PackageFilters