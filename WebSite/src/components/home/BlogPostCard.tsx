import { Link } from 'react-router-dom'
import useBlogPosts from '../../hooks/useBlogPosts'
import { formatDate } from '../../helpers/helpers'

interface BlogPostCardProps {
    post: {
        id: string
        title: string
        author: string
        content: string
        category: string
        featuredImage?: string
        slug: string
        createdAt: string
    }
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
    const readTime = Math.ceil(post.content.length / 1000)

    return (
        <div className={`group md:col-span-1`}>
            <div className="mb-4 overflow-hidden rounded-lg">
                <Link to={`/blog/${post.slug}`}>
                    {post.featuredImage ? (
                        <img
                            src={`${import.meta.env.VITE_APICLIENT}/uploads/${post.featuredImage}`}
                            alt={post.title}
                            className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105`}
                        />
                    ) : (
                        <div className={`h-48 bg-gray-200 flex items-center justify-center`}>
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {post.category}
                </span>
                <span>–</span>
                <span>{readTime} min read</span>
            </div>

            <h3 className={`font-bold mb-3 group-hover:text-red-500 $text-2xl`}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <div className="prose prose-sm text-gray-600 mb-4 line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '') }} />
            </div>

            <div className="text-sm text-gray-600">
                <span>by </span>
                <span className="font-medium hover:text-red-500">
                    {post.author}
                </span>
                <span> – {formatDate(post.createdAt)}</span>
            </div>
        </div>
    )
}

export function BlogPostGrid() {
    const { blogPosts, loading, error } = useBlogPosts()

    if (loading) return (
        <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
        </div>
    )

    if (error) return (
        <div className="py-20 text-center text-red-500">
            {error}
        </div>
    )

    // Get the last three posts
    const lastThreePosts = blogPosts.slice(-3)

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-midnight">
                        Latest News  & Blogs
                    </h2>
                </div>
                {lastThreePosts.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {lastThreePosts.map((post) => (
                            <BlogPostCard
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-600">
                        No blog posts available yet.
                    </div>
                )}
            </div>
        </section>
    )
}