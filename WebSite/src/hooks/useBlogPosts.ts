/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface BlogPostProps {
    id: string;
    title: string;
    author: string;
    content: string;
    category: string;
    featuredImage?: string;
    slug: string;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: string;
    updatedAt: string;
    createdAt: string;
}

const useBlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPostProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const totalPosts = blogPosts.length;
    const publishedPosts = blogPosts.filter(post => post.status === 'published');

    useEffect(() => {
        setLoading(true);
        const fetchBlogPosts = async () => {
            try {
                const response = await apiClient.get("/blogs");
                setBlogPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch blog posts");
                setLoading(false);
            }
        };
        fetchBlogPosts();
    }, []);

    const createBlogPost = async (blogData: FormData | Omit<BlogPostProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPostProps> => {
        setLoading(true);
        try {
            const config = blogData instanceof FormData
                ? { headers: { 'Content-Type': 'multipart/form-data' } }
                : { headers: { 'Content-Type': 'application/json' } };

            const response = await apiClient.post("/blogs", blogData, config);
            setBlogPosts(prev => [response.data, ...prev]);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError("Failed to create blog post");
            setLoading(false);
            throw err;
        }
    };


    const getCategories = (): string[] => {
        const categories = new Set<string>();
        blogPosts.forEach(post => {
            if (post.category) {
                categories.add(post.category);
            }
        });
        return Array.from(categories).sort();
    };


    const updateBlogPost = async (id: string, updatedData: Partial<BlogPostProps> | FormData): Promise<BlogPostProps> => {
        setLoading(true);
        try {
            const config = updatedData instanceof FormData
                ? { headers: { 'Content-Type': 'multipart/form-data' } }
                : { headers: { 'Content-Type': 'application/json' } };

            const response = await apiClient.put(`/blogs/${id}`, updatedData, config);
            setBlogPosts(prev => prev.map(post =>
                post.id === id ? response.data : post
            ));
            setLoading(false);
            return response.data;
        } catch (err) {
            setError("Failed to update blog post");
            setLoading(false);
            throw err;
        }
    };

    const deleteBlogPost = async (id: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`/blogs/${id}`);
            setBlogPosts(prev => prev.filter(post => post.id !== id));
            setLoading(false);
        } catch (err) {
            setError("Failed to delete blog post");
            setLoading(false);
            throw err;
        }
    };

    const updateBlogStatus = async (id: string, status: 'draft' | 'published' | 'archived') => {
        setLoading(true);
        try {
            const response = await apiClient.patch(`/blogs/${id}/status`, { status });
            setBlogPosts(prev => prev.map(post =>
                post.id === id ? { ...post, status } : post
            ));
            setLoading(false);
            return response.data;
        } catch (err) {
            setError("Failed to update blog status");
            setLoading(false);
            throw err;
        }
    };

    return {
        blogPosts,
        publishedPosts,
        totalPosts,
        loading,
        error,
        getCategories,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,
        updateBlogStatus,
        setBlogPosts
    };
};

export default useBlogPosts;