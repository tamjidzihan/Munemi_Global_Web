import { useState } from "react";
import useFlightLocations, { FlightLocation } from "../../../../hooks/useFlightLocations";

type CreateFlightLocationModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    addNewLocation: (newLocation: FlightLocation) => void;
};

const CreateFlightLocationModal = ({
    isOpen,
    closeModal,
    addNewLocation,
}: CreateFlightLocationModalProps) => {
    const { createFlightLocation, loading } = useFlightLocations();
    const [formData, setFormData] = useState<FlightLocation>({
        cityName: '',
        airportCode: '',
        airportName: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = ['airportCode', 'airportName'];
        const isValid = requiredFields.every(field => !!formData[field as keyof typeof formData]);

        if (!isValid) {
            alert("All required fields must be filled.");
            return;
        }

        try {
            const newLocation = await createFlightLocation(formData);
            addNewLocation(newLocation);
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Failed to create flight location.");
        } finally {
            // Reset form fields
            setFormData({
                cityName: '',
                airportCode: '',
                airportName: '',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <h3 className="text-xl font-semibold mb-4">New Flight Location</h3>
                <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">City Name (Optional)</label>
                        <input
                            type="text"
                            placeholder="City Name"
                            value={formData.cityName}
                            onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Airport Code</label>
                        <input
                            type="text"
                            placeholder="Airport Code"
                            value={formData.airportCode}
                            onChange={(e) => setFormData({ ...formData, airportCode: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Airport Name</label>
                        <input
                            type="text"
                            placeholder="Airport Name"
                            value={formData.airportName}
                            onChange={(e) => setFormData({ ...formData, airportName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717  44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                "Submit Location"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFlightLocationModal;