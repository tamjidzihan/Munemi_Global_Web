import { useState } from "react";
import useHealthInsurancePartners, { HealthInsurancePartner } from "../../../hooks/useHealthInsurancePartners";

type CreateHealthInsurancePartnerModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    addNewPartner: (newPartner: HealthInsurancePartner) => void;
}

const CreateHealthInsurancePartnerModal = ({
    isOpen,
    closeModal,
    addNewPartner,
}: CreateHealthInsurancePartnerModalProps) => {
    const { createHealthInsurancePartner, loading } = useHealthInsurancePartners();
    const [formData, setFormData] = useState({
        tradingName: '',
        businessRegistrationNumber: '',
        officePhoneNumber: '',
        countryLocated: '',
        primaryOfficeLocation: '',
        website: '',
        applyingAs: '',
        otherInsuranceType: '',
        firstName: '',
        lastName: '',
        position: '',
        contactEmail: '',
        contactCountryCode: '',
        contactPhoneNumber: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        const { tradingName, businessRegistrationNumber, officePhoneNumber, countryLocated, primaryOfficeLocation, applyingAs, firstName, lastName, position, contactEmail, contactCountryCode, contactPhoneNumber } = formData;
        if (!tradingName || !businessRegistrationNumber || !officePhoneNumber || !countryLocated || !primaryOfficeLocation || !applyingAs || !firstName || !lastName || !position || !contactEmail || !contactCountryCode || !contactPhoneNumber) {
            alert("All required fields must be filled.");
            return;
        }

        try {
            const newPartner = await createHealthInsurancePartner(formData);
            addNewPartner(newPartner);
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Failed to create health insurance partner.");
        } finally {
            // Reset form fields
            setFormData({
                tradingName: '',
                businessRegistrationNumber: '',
                officePhoneNumber: '',
                countryLocated: '',
                primaryOfficeLocation: '',
                website: '',
                applyingAs: '',
                otherInsuranceType: '',
                firstName: '',
                lastName: '',
                position: '',
                contactEmail: '',
                contactCountryCode: '',
                contactPhoneNumber: '',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <h3 className="text-xl font-semibold mb-4">Create New Health Insurance Partner</h3>
                <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Trading Name</label>
                        <input
                            type="text"
                            placeholder="Trading Name"
                            value={formData.tradingName}
                            onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Business Registration Number</label>
                        <input
                            type="text"
                            placeholder="Business Registration Number"
                            value={formData.businessRegistrationNumber}
                            onChange={(e) => setFormData({ ...formData, businessRegistrationNumber: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Office Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Office Phone Number"
                            value={formData.officePhoneNumber}
                            onChange={(e) => setFormData({ ...formData, officePhoneNumber: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Country Located</label>
                        <input
                            type="text"
                            placeholder="Country Located"
                            value={formData.countryLocated}
                            onChange={(e) => setFormData({ ...formData, countryLocated: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Primary Office Location</label>
                        <input
                            type="text"
                            placeholder="Primary Office Location"
                            value={formData.primaryOfficeLocation}
                            onChange={(e) => setFormData({ ...formData, primaryOfficeLocation: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <input
                            type="url"
                            placeholder="Website"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Applying As</label>
                        <input
                            type="text"
                            placeholder="Applying As"
                            value={formData.applyingAs}
                            onChange={(e) => setFormData({ ...formData, applyingAs: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Other Insurance Type</label>
                        <input
                            type="text"
                            placeholder="Other Insurance Type"
                            value={formData.otherInsuranceType}
                            onChange={(e) => setFormData({ ...formData, otherInsuranceType: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Position</label>
                        <input
                            type="text"
                            placeholder="Position"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Contact Email</label>
                        <input
                            type="email"
                            placeholder="Contact Email"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Contact Country Code</label>
                        <input
                            type="text"
                            placeholder="Contact Country Code"
                            value={formData.contactCountryCode}
                            onChange={(e) => setFormData({ ...formData, contactCountryCode: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Contact Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Contact Phone Number"
                            value={formData.contactPhoneNumber}
                            onChange={(e) => setFormData({ ...formData, contactPhoneNumber: e.target.value })}
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
                                "Create Partner"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateHealthInsurancePartnerModal;