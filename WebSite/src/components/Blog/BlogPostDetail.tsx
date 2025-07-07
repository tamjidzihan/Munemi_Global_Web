import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { useParams } from 'react-router-dom'
import useBlogPosts from '../../hooks/useBlogPosts'

export function BlogPostDetail() {
    const { slug } = useParams()
    console.log(slug)
    const { blogPosts, loading, error } = useBlogPosts()
    const post = blogPosts.find(post => post.slug === slug)

    if (loading) return <p>Loading post...</p>
    if (error) return <p className="text-red-500">{error}</p>
    if (!post) return <p>Post not found</p>

    return (
        <div className="lg:col-span-2">
            <article className="bg-white max-w-2xl rounded-xl overflow-hidden shadow-sm">
                {post.featuredImage && (
                    <img
                        src={`${import.meta.env.VITE_APICLIENT}/uploads/${post.featuredImage}`}
                        alt="Featured"
                        className="w-full h-96 object-cover"
                    />
                )}
                <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{post.category}</span>
                        <span>—</span>
                        <span>{Math.ceil(post.content.length / 1000)} min read</span>
                    </div>
                    <h1 className="text-3xl text-midnight font-bold mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                        <span>by </span>
                        <a href="#" className="font-medium hover:text-red-500">
                            {post.author}
                        </a>
                        <span>— {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Post Content */}
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                    {/* Share Buttons */}
                    <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                        <span className="text-gray-600">Share:</span>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-red-500">
                                <Facebook size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500">
                                <Twitter size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500">
                                <Linkedin size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}