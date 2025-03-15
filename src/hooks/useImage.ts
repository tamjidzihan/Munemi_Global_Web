/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import axios from 'axios';

interface UploadImageResponse {
    secure_url: string;
    public_id: string;
}

interface UseImageUploadDelete {
    imageUrl: string | null;
    publicId: string | null;
    loading: boolean;
    error: string | null;
    uploadImage: (file: File) => void;
    deleteImage: (publicId: string) => void;
}

const CLOUDINARY_UPLOAD_URL = import.meta.env.CLOUDINARY_UPLOAD_URL
const CLOUDINARY_DESTROY_URL = import.meta.env.CLOUDINARY_DESTROY_URL
const CLOUDINARY_API_KEY = import.meta.env.CLOUDINARY_API_KEY
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET

export const useImageUploadDelete = (): UseImageUploadDelete => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [publicId, setPublicId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Upload image to Cloudinary
    const uploadImage = async (file: File) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = response.data as UploadImageResponse;
            setImageUrl(data.secure_url);
            setPublicId(data.public_id);
        } catch (err) {
            setError('Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    // Delete image from Cloudinary
    const deleteImage = async (publicId: string) => {
        setLoading(true);
        setError(null);

        try {
            await axios.post(
                CLOUDINARY_DESTROY_URL,
                {
                    public_id: publicId,
                    api_key: CLOUDINARY_API_KEY,
                }
            );
            setImageUrl(null);
        } catch (err) {
            setError('Error deleting image');
        } finally {
            setLoading(false);
        }
    };

    return {
        imageUrl,
        publicId,
        loading,
        error,
        uploadImage,
        deleteImage,
    };
};
