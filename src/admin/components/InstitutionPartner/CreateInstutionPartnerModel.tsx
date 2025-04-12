import { useState } from "react";
import useInstitutionPartners, { InstitutionPartner } from "../../../hooks/useInstitutionPartners";

type CreateInstitutionPartnerModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    addNewPartner: (newPartner: InstitutionPartner) => void;
}

const validCourses = [
    'English Courses', 'Certificate III', 'Pathway Program', 'RPL Course',
    'Year 12', 'Certificate IV', 'Bachelor\'s Degree', 'Others',
    'International Year One', 'Diploma', 'Master\'s Degree', 'Foundation',
    'Advance Diploma', 'Post Graduate Diploma'
];

const CreateInstitutionPartnerModal = ({
    isOpen,
    closeModal,
    addNewPartner,
}: CreateInstitutionPartnerModalProps) => {
    const { createInstitutionPartner, loading } = useInstitutionPartners();
    const [formData, setFormData] = useState({
        fullNameOfInstitute: '',
        category: '' as InstitutionPartner['category'], // Add type assertion here
        coursesProviding: [] as string[],
        otherCourses: '',
        businessRegistrationNumber: '',
        countryLocated: '',
        campusLocations: '',
        primaryEmailAddress: '',
        website: '',
        firstName: '',
        lastName: '',
        position: '',
        contactEmail: '',
        phoneNumber: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {
            fullNameOfInstitute,
            category,
            coursesProviding,
            otherCourses,
            businessRegistrationNumber,
            countryLocated,
            campusLocations,
            primaryEmailAddress,
            firstName,
            lastName,
            position,
            contactEmail,
            phoneNumber,
        } = formData;

        if (!fullNameOfInstitute || !category || coursesProviding.length === 0 || !businessRegistrationNumber || !countryLocated || !campusLocations || !primaryEmailAddress || !firstName || !lastName || !position || !contactEmail || !phoneNumber) {
            alert("All required fields must be filled.");
            return;
        }

        if (coursesProviding.includes('Others') && !otherCourses) {
            alert("Please specify other courses.");
            return;
        }

        try {
            const newPartner = await createInstitutionPartner({
                ...formData,
                coursesProviding: formData.coursesProviding,
            });
            addNewPartner(newPartner);
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Failed to create institution partner.");
        } finally {
            setFormData({
                fullNameOfInstitute: '',
                category: '' as InstitutionPartner['category'],
                coursesProviding: [],
                otherCourses: '',
                businessRegistrationNumber: '',
                countryLocated: '',
                campusLocations: '',
                primaryEmailAddress: '',
                website: '',
                firstName: '',
                lastName: '',
                position: '',
                contactEmail: '',
                phoneNumber: '',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <h3 className="text-xl font-semibold mb-4">Create New Institution Partner</h3>
                <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Full Name of Institute</label>
                        <input
                            type="text"
                            placeholder="Full Name of Institute"
                            value={formData.fullNameOfInstitute}
                            onChange={(e) => setFormData({ ...formData, fullNameOfInstitute: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({
                                ...formData,
                                category: e.target.value as InstitutionPartner['category'] // Add type assertion here
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="University">University</option>
                            <option value="Institute">Institute</option>
                            <option value="Professional Year Provider">Professional Year Provider</option>
                            <option value="RPL Provider">RPL Provider</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Courses Providing (Select all that apply)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {validCourses.map(course => (
                                <label key={course} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.coursesProviding.includes(course)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setFormData(prev => ({
                                                ...prev,
                                                coursesProviding: isChecked
                                                    ? [...prev.coursesProviding, course]
                                                    : prev.coursesProviding.filter(c => c !== course)
                                            }));
                                            if (course === 'Others' && !isChecked) {
                                                setFormData(prev => ({ ...prev, otherCourses: '' }));
                                            }
                                        }}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                        disabled={loading}
                                    />
                                    <span className="ml-2">{course}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {formData.coursesProviding.includes('Others') && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Other Courses</label>
                            <input
                                type="text"
                                placeholder="Specify other courses"
                                value={formData.otherCourses}
                                onChange={(e) => setFormData({ ...formData, otherCourses: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                disabled={loading}
                                required={formData.coursesProviding.includes('Others')}
                            />
                        </div>
                    )}
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
                        <label className="block text-sm font-medium mb-2">Campus Locations</label>
                        <input
                            type="text"
                            placeholder="Campus Locations"
                            value={formData.campusLocations}
                            onChange={(e) => setFormData({ ...formData, campusLocations: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Primary Email Address</label>
                        <input
                            type="email"
                            placeholder="Primary Email Address"
                            value={formData.primaryEmailAddress}
                            onChange={(e) => setFormData({ ...formData, primaryEmailAddress: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <input
                            type="text"
                            placeholder="Website"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                    </div >
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
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15. 
2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
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

export default CreateInstitutionPartnerModal;