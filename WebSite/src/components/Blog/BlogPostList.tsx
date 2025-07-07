import { Link, useOutletContext } from 'react-router-dom'
import useBlogPosts, { BlogPostProps } from '../../hooks/useBlogPosts'

const BlogPostList = () => {
    const { blogPosts, loading, error } = useBlogPosts()
    const { posts: filteredPosts, selectedCategory } = useOutletContext<{
        posts: BlogPostProps[]
        loading: boolean
        error: string | null
        selectedCategory: string | null
    }>()

    // Use filteredPosts if available, otherwise fall back to all blogPosts
    const displayPosts = filteredPosts || blogPosts

    return (
        <div className="lg:col-span-2 space-y-8">
            {selectedCategory && (
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-midnight">
                        Category: {selectedCategory}
                    </h2>
                    <Link
                        to="/blog"
                        className="text-sm text-red-500 hover:underline"
                        onClick={(e) => {
                            e.preventDefault()
                            window.history.back() // Or use navigate(-1) if using useNavigate
                        }}
                    >
                        ← Clear filter
                    </Link>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center py-8">{error}</p>
            ) : displayPosts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No posts found{selectedCategory ? ` in ${selectedCategory}` : ''}</p>
                    {selectedCategory && (
                        <Link
                            to="/blog"
                            className="text-red-500 hover:underline"
                        >
                            View all posts
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {displayPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white max-w-2xl rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            {post.featuredImage && (
                                <Link to={`/blog/${post.slug}`}>
                                    <img
                                        src={`${import.meta.env.VITE_APICLIENT}/uploads/${post.featuredImage}`}
                                        alt={post.title}
                                        className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                                    />
                                </Link>
                            )}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                        {post.category}
                                    </span>
                                    <span>•</span>
                                    <span>{Math.ceil(post.content.length / 1000)} min read</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-midnight hover:text-red-500 transition-colors">
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>

                                <div className="prose prose-sm text-gray-600 mb-4 line-clamp-3">
                                    <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '') }} />
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <div>
                                        <span>by </span>
                                        <span className="font-medium hover:text-red-500 cursor-pointer">
                                            {post.author}
                                        </span>
                                    </div>
                                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </article>
                    ))}

                    {/* Pagination - Only show if there are posts */}
                    {displayPosts.length > 0 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <span className="px-4 py-2 bg-red-500 text-white rounded">1</span>
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                disabled
                            >
                                2
                            </button>
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                disabled={displayPosts.length < 10}
                            >
                                →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default BlogPostList