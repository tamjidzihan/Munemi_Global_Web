import { useState } from "react";
import usePackage, { PackageProps } from "../../../hooks/usePackage";

type CreatePackageModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    addNewPackage: (newPackage: PackageProps) => void;
}

const CreatePackageModal = ({
    isOpen,
    closeModal,
    addNewPackage,
}: CreatePackageModalProps) => {
    const { createPackage, loading } = usePackage();

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        price: '',
        duration: '',
        description: '',
        startDate: '',
        endDate: '',
        termsAndConditions: '',
        isActive: true,
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { title, type, price, duration, description, startDate, endDate, termsAndConditions, isActive } = formData;
        if (!title || !type || !description || !price || !startDate || !endDate) {
            alert("All required fields must be filled.");
            return;
        }
        const formDataToSend = new FormData();
        if (selectedImage) {
            formDataToSend.append("title", title);
            formDataToSend.append("type", type);
            formDataToSend.append("price", price);
            formDataToSend.append("duration", duration);
            formDataToSend.append("description", description);
            formDataToSend.append("startDate", startDate);
            formDataToSend.append("endDate", endDate);
            formDataToSend.append("termsAndConditions", termsAndConditions);
            formDataToSend.append("isActive", isActive.toString());
            formDataToSend.append("image", selectedImage);
        }
        try {
            const newPackage = await createPackage(formDataToSend);
            addNewPackage(newPackage);
            closeModal();
        } catch (error) {
            console.log(error);
            alert("Failed to create package.");
        } finally {
            setFormData({
                title: '',
                type: '',
                price: '',
                duration: '',
                description: '',
                startDate: '',
                endDate: '',
                termsAndConditions: '',
                isActive: true,
            });
            setSelectedImage(null);
            setPreviewImage(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <h3 className="text-xl font-semibold mb-4">Create New Package</h3>
                <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Destination / Type</label>
                        <input
                            type="text"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Duration</label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            rows={3}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 space-x-5">
                        <div className="col-span-1 mb-4">
                            <label className="block text-sm font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="col-span-1 mb-4">
                            <label className="block text-sm font-medium mb-2">End Date</label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="col-span-2 mb-4">
                            <div className="rounded-sm border border-stroke bg-white shadow-default">
                                <div className="border-b border-stroke py-4 px-7">
                                    <h3 className="font-medium text-black">Upload Cover Photo</h3>
                                </div>
                                <div className="p-7">
                                    {previewImage && (
                                        <div className="relative mb-5">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className={`rounded w-full max-h-[300px] object-contain ${loading ? "opacity-50 blur-sm" : ""}`}
                                            />
                                            {loading && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded">
                                                    <div className="loader border-4 border-t-primary rounded-full w-12 h-12 animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 sm:py-7.5">
                                        <input
                                            type="file"
                                            required
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 focus:outline-blue-500"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white">
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                            fill="#3C50E0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                            fill="#3C50E0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                            fill="#3C50E0"
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                            <p>
                                                <span className="text-primary">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                            <p>(max, 800 X 800px)</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border hover:bg-gray-50 border-stroke py-2 px-6 font-medium text-black hover:shadow-1 cursor-pointer"
                                            type="button"
                                            onClick={() => {
                                                setSelectedImage(null);
                                                setPreviewImage(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Terms And Conditions</label>
                        <input
                            type="text"
                            value={formData.termsAndConditions}
                            onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="default-checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            disabled={loading}
                        />
                        <label className="ms-2 text-sm font-medium">Package Status</label>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center  cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082  100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            ) : (
                                "Create Package"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePackageModal;