import { Link } from 'react-router-dom'
const blogPosts = [
    {
        category: 'Immigration Visa',
        slag: 'what-isa-do-you-need-to-work-legally-in-singapore?',
        readTime: '2 min read',
        title: 'What visa do you need to work legally in Singapore?',
        excerpt:
            'Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien. Quaerat neque purus ipsum neque dolor primis',
        image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170',
        author: 'Jhon doe',
        date: 'February 26, 2020',
    },
    {
        category: 'Working Visa',
        slag: 'top-reasons-for-australian-working-visa-rejection',
        readTime: '2 min read',
        title: 'Top reasons for Australian working visa rejection',
        excerpt:
            'Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien libero tempus impedit tempor blandit sapien gravida',
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
        author: 'Jhon doe',
        date: 'February 26, 2020',
    }

]

const BlogList = () => {
    return (
        <div className=" lg:col-span-2 space-y-8">
            {blogPosts.map((post, index) => (
                <article
                    key={index}
                    className="bg-white max-w-2xl rounded-lg overflow-hidden shadow-sm"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>{post.category}</span>
                            <span>—</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-midnight">
                            <Link to={'/blog/blog-post'}>{post.title}</Link>
                        </h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="text-sm text-gray-600">
                            <span>by </span>
                            <a href="#" className="font-medium hover:text-red-500">
                                {post.author}
                            </a>
                            <span> — {post.date}</span>
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
        </div>
    )
}

export default BlogList