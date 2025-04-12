// src/types/blog.ts
export interface BlogPost {
    category: string;
    slug: string;
    readTime: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    content?: string;
}

export interface Country {
    name: string;
    image: string;
}

export interface BlogData {
    blogPosts: BlogPost[];
    categories: string[];
    tags: string[];
    countries: Country[];
}