/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import useNewsHeadlines, { NewsHeadline } from "../../../hooks/useNewsHeadlines";

type CreateNewsHeadlineModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    addNewHeadline: (newHeadline: NewsHeadline) => void;
};

const CreateNewsHeadlineModal = ({ isOpen, closeModal, addNewHeadline }: CreateNewsHeadlineModalProps) => {
    const { createHeadline, loading } = useNewsHeadlines();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (data: any) => {
        try {
            const headlineData: NewsHeadline = {
                title: data.title,
                link: data.link,
                category: data.category || null,
                isBreaking: data.isBreaking || false,
                isActive: data.isActive !== undefined ? data.isActive : true
            };

            const newHeadline = await createHeadline(headlineData);
            addNewHeadline(newHeadline);
            closeModal();
            reset();
        } catch (error) {
            console.error("Failed to create news headline:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Create New News Headline</h3>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link*</label>
                        <input
                            {...register("link", {
                                required: "Link is required",
                                pattern: {
                                    value: /^https?:\/\/.+/,
                                    message: "Please enter a valid URL"
                                }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message as string}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            {...register("category")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("isBreaking")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Breaking News
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("isActive")}
                                defaultChecked
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Active
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                "Create Headline"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewsHeadlineModal;