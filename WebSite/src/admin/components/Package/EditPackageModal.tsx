/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Editor } from '@tinymce/tinymce-react';
import { PackageProps } from "../../../hooks/usePackage";

type EditPackageModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    packageData: PackageProps;
    updatePackage: (id: string, formData: FormData) => Promise<PackageProps>; // Changed return type
};

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    type: yup.string().required("Package type is required").oneOf(["International", "Domestic"], "Package type must be either International or Domestic"),
    price: yup.number().required("Price is required").positive("Price must be positive"),
    destination: yup.string().required("Destination is required"),
    numberOftraveller: yup.number().required("Number of travellers is required").positive("Number of travellers must be positive"),
    days: yup.string().required("Days is required"),
    nights: yup.string().required("Nights is required"),
    description: yup.string().required("Description is required"),
    startDate: yup.string().required("Start date is required").test('is-date', 'Start date is invalid', (value) => {
        if (!value) return false;
        return !isNaN(new Date(value).getTime());
    }),
    endDate: yup.string().required("End date is required").test('is-date', 'End date is invalid', (value) => {
        if (!value) return false;
        return !isNaN(new Date(value).getTime());
    }),
    termsAndConditions: yup.string().required("Terms and conditions are required"),
    isActive: yup.boolean().required("Package status is required"),
});

const EditPackageModal = ({ isOpen, closeModal, packageData, updatePackage }: EditPackageModalProps) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const descriptionEditorRef = useRef(null);
    const termsEditorRef = useRef(null);

    useEffect(() => {
        if (isOpen && packageData) {
            // Parse duration into days and nights
            const durationParts = packageData.duration?.split(/ days?,? /) || ['', ''];
            const days = durationParts[0] || '';
            const nights = durationParts[1]?.replace(' nights', '') || '';

            // Set form values
            reset({
                title: packageData.title,
                type: packageData.type,
                price: packageData.price,
                destination: packageData.destination,
                numberOftraveller: packageData.numberOftraveller,
                days: days,
                nights: nights,
                startDate: packageData.startDate,
                endDate: packageData.endDate,
                description: packageData.description,
                termsAndConditions: packageData.termsAndConditions,
                isActive: packageData.isActive
            });

            // Set existing images
            setExistingImages(packageData.images.map(img => img.url));
            setSelectedImages([]);
            setPreviewImages([]);
        }
    }, [isOpen, packageData, reset]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files).slice(0, 5);
            setSelectedImages(fileArray);
            const previewUrls = fileArray.map(file => URL.createObjectURL(file));
            setPreviewImages(previewUrls);
        }
    };

    const onSubmit = async (data: any) => {
        setLoading(true);
        const duration = `${data.days} days, ${data.nights} nights`;
        const formData = new FormData();

        // Append all form data
        Object.keys(data).forEach(key => {
            if (key !== 'days' && key !== 'nights') {
                formData.append(key, data[key]);
            }
        });
        formData.append("duration", duration);
        selectedImages.forEach((img) => formData.append(`images`, img));

        try {
            await updatePackage(packageData.id, formData);
            closeModal();
        } catch (error) {
            console.error("Failed to update package:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
                <h3 className="text-xl font-semibold mb-4">Edit Package</h3>
                <form onSubmit={handleSubmit(onSubmit)} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-md text-midnight font-medium mb-2">Title</label>
                        <input {...register("title")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500" />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="mb-4">
                            <label className="block text-md text-midnight font-medium mb-2">Package Type</label>
                            <select {...register("type")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500">
                                <option value="">Select Package Type</option>
                                <option value="International">International</option>
                                <option value="Domestic">Domestic</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-md text-midnight font-medium mb-2">Price</label>
                            <input type="number" {...register("price")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500" />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                        <div className="mb-4">
                            <label className="block text-md text-midnight font-medium mb-2">Destination</label>
                            <input {...register("destination")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500" />
                            {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-md text-midnight font-medium mb-2">Number Of Traveller</label>
                            <input type="number" {...register("numberOftraveller")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500" />
                            {errors.numberOftraveller && <p className="text-red-500 text-sm">{errors.numberOftraveller.message}</p>}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-md text-midnight font-medium mb-2">Package Duration</label>
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-1/2">
                                <label className="block text-sm font-medium mb-1">Days</label>
                                <select {...register("days")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500">
                                    {[...Array(30).keys()].map((day) => (
                                        <option key={day + 1} value={day + 1}>{day + 1}</option>
                                    ))}
                                </select>
                                {errors.days && <p className="text-red-500 text-sm">{errors.days.message}</p>}
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="block text-sm font-medium mb-1">Nights</label>
                                <select {...register("nights")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500">
                                    {[...Array(30).keys()].map((night) => (
                                        <option key={night + 1} value={night + 1}>{night + 1}</option>
                                    ))}
                                </select>
                                {errors.nights && <p className="text-red-500 text-sm">{errors.nights.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-md text-midnight font-medium mb-2">Offer Duration</label>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <input type="date" {...register("startDate")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500" />
                                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">End Date</label>
                                <input type="date" {...register("endDate")} className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500" />
                                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center mb-8">
                        <input type="checkbox" {...register("isActive")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                        <label className="ms-2 text-midnight text-md font-medium">Package Status</label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-md text-midnight font-medium mb-2">Existing Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {existingImages.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={`${import.meta.env.VITE_APICLIENT}/uploads/${url}`}
                                        alt={`Existing ${index + 1}`}
                                        className="rounded-lg w-full h-32 object-cover shadow-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-md text-midnight font-medium mb-2">Add New Images</label>
                        <div className="relative mb-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    ></path>
                                </svg>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-blue-500">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF (max 5 images)</p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {previewImages.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="rounded-lg w-full h-32 object-cover shadow-sm hover:shadow-md transition-shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newImages = [...previewImages];
                                            newImages.splice(index, 1);
                                            setPreviewImages(newImages);
                                            const newFiles = [...selectedImages];
                                            newFiles.splice(index, 1);
                                            setSelectedImages(newFiles);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 text-red-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-md text-midnight font-medium mb-2">Description</label>
                        <Editor
                            apiKey='szvsb3j972bv6ztvs28hf4r9kd9gz63sa203op71yb7mbxoo'
                            onInit={(_evt, editor) => {
                                descriptionEditorRef.current = editor;
                                editor.setContent(packageData.description);
                            }}
                            initialValue={packageData.description}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content) => setValue("description", content)}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-md text-midnight font-medium mb-2">Terms And Conditions</label>
                        <Editor
                            apiKey='szvsb3j972bv6ztvs28hf4r9kd9gz63sa203op71yb7mbxoo'
                            onInit={(_evt, editor) => {
                                termsEditorRef.current = editor;
                                editor.setContent(packageData.termsAndConditions || '');
                            }}
                            initialValue={packageData.termsAndConditions}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content) => setValue("termsAndConditions", content)}
                        />
                        {errors.termsAndConditions && <p className="text-red-500 text-sm">{errors.termsAndConditions.message}</p>}
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer" disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center cursor-pointer" disabled={loading}>
                            {loading ? (
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                "Update Package"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPackageModal;