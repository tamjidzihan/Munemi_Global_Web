/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Editor } from '@tinymce/tinymce-react';
import { BlogPostProps } from "../../../hooks/useBlogPosts";
import { slugify } from "../../../helpers/helpers";

type EditBlogModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    blogData: BlogPostProps;
    updateBlog: (id: string, formData: FormData) => Promise<BlogPostProps>;
};

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    content: yup.string().required("Content is required"),
    category: yup.string().required("Category is required"),
    slug: yup.string()
        .required("Slug is required")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (lowercase, hyphens)"),
    status: yup.string().required("Status is required").oneOf(["draft", "published", "archived"], "Invalid status"),
});

const EditBlogModal = ({ isOpen, closeModal, blogData, updateBlog }: EditBlogModalProps) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
        resolver: yupResolver(schema),
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const contentEditorRef = useRef(null);

    useEffect(() => {
        if (isOpen && blogData) {
            reset({
                title: blogData.title,
                author: blogData.author,
                category: blogData.category,
                slug: blogData.slug,
                status: blogData.status,
                content: blogData.content
            });

            setExistingImage(blogData.featuredImage || null);
            setSelectedImage(null);
            setPreviewImage(null);
        }
    }, [isOpen, blogData, reset]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    // Watch the title field to auto-generate slug
    const titleValue = watch("title");
    useEffect(() => {
        if (titleValue) {
            setValue("slug", slugify(titleValue));
        }
    }, [titleValue, setValue]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        const formData = new FormData();

        Object.keys(data).forEach(key => formData.append(key, data[key]));
        if (selectedImage) {
            formData.append("featuredImage", selectedImage);
        }

        try {
            await updateBlog(blogData.id, formData);
            closeModal();
        } catch (error) {
            console.error("Failed to update blog post:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="inset-0 py-10 flex items-center justify-center bg-gray-200 shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Edit Blog Post</h3>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                            <input
                                {...register("title")}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
                            <input
                                {...register("author")}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                            <input
                                {...register("category")}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug*</label>
                            <input
                                {...register("slug")}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                        <select
                            {...register("status")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                        <div className="mt-1 flex flex-col space-y-4">
                            {existingImage && (
                                <div className="relative">
                                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                                    <img
                                        src={`${import.meta.env.VITE_APICLIENT}/uploads/${existingImage}`}
                                        alt="Current featured"
                                        className="h-48 w-full object-cover rounded-md"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/png, image/jpeg"
                                    />
                                </label>
                            </div>

                            {previewImage && (
                                <div className="relative">
                                    <p className="text-sm text-gray-500 mb-2">New Image Preview:</p>
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="h-48 w-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setPreviewImage(null);
                                        }}
                                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                                    >
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                        <Editor
                            apiKey='szvsb3j972bv6ztvs28hf4r9kd9gz63sa203op71yb7mbxoo'
                            onInit={(_evt, editor) => {
                                contentEditorRef.current = editor;
                                editor.setContent(blogData.content);
                            }}
                            initialValue={blogData.content}
                            init={{
                                height: 400,
                                menubar: true,
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
                            onEditorChange={(content) => setValue("content", content)}
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
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
                                    Updating...
                                </>
                            ) : (
                                "Update Blog Post"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogModal;