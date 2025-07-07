import { Link } from 'react-router-dom'
import useBlogPosts from '../../hooks/useBlogPosts'

const BlogList = () => {
    const { blogPosts, loading, error } = useBlogPosts()

    return (
        <div className="lg:col-span-2 space-y-8">
            {loading ? (
                <p>Loading blog posts...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white max-w-2xl rounded-lg overflow-hidden shadow-sm"
                        >
                            {post.featuredImage && (
                                <img
                                    src={`${import.meta.env.VITE_APICLIENT}/uploads/${post.featuredImage}`}
                                    alt={post.title}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <span>{post.category}</span>
                                    <span>—</span>
                                    <span>{Math.ceil(post.content.length / 1000)} min read</span>
                                </div>
                                <h2 className="text-2xl  font-bold mb-3 text-midnight">
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>

                                <p className="text-gray-600 prose mb-4"
                                    dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }}>
                                </p>

                                <div className="text-sm text-gray-600">
                                    <span>by </span>
                                    <a href="#" className="font-medium hover:text-red-500">
                                        {post.author}
                                    </a>
                                    <span> — {new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </article>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center gap-2">
                        <span className="px-4 py-2 bg-red-500 text-white rounded">1</span>
                        <a
                            href="#"
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            →
                        </a>
                    </div>
                </>
            )}
        </div>
    )
}

export default BlogList