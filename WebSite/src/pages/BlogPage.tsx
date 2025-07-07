import { Search } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { Outlet } from 'react-router-dom'
import PageTitle from '../admin/components/PageTitle'
import useBlogPosts from '../hooks/useBlogPosts'

const categories = ['Immigration Visa', 'PR Visa', 'Working Visa']
const tags = ['Consultations', 'Education', 'Embassy', 'Immigration', 'Tourism']
const countries = [
    {
        name: 'Canada',
        image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225',
    },
    {
        name: 'United Kingdom',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    }
]

const BlogPage = () => {
    const { blogPosts, loading, error } = useBlogPosts()

    return (
        <>
            <PageTitle title='Blog | Munemi Global' />
            <section className="bg-red-500">
                <Breadcrumb />
            </section>
            <main className="w-full bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Outlet />

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Search */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                    <Search
                                        className="absolute right-3 top-2.5 text-gray-400"
                                        size={20}
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-bold text-lg mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <a href="#" className="text-gray-600 hover:text-red-500">
                                                → {category}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Latest Posts */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-bold text-lg mb-4">Latest Posts</h3>
                                <div className="space-y-4">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p className="text-red-500">{error}</p>
                                    ) : (
                                        blogPosts.slice(0, 3).map((post) => (
                                            <div key={post.id} className="flex items-start gap-4">
                                                <div className="text-sm text-gray-600">
                                                    <p className="text-gray-900 font-medium hover:text-red-500">
                                                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                                                    </p>
                                                    <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Tags Cloud */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-bold text-lg mb-4">Tags Cloud</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <a
                                            key={tag}
                                            href="#"
                                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-red-500 hover:text-white"
                                        >
                                            {tag}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Countries */}
                            {countries.map((country) => (
                                <div
                                    key={country.name}
                                    className="bg-white p-6 rounded-xl shadow-sm"
                                >
                                    <h3 className="font-bold text-lg mb-4">{country.name}</h3>
                                    <img
                                        src={country.image}
                                        alt={country.name}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BlogPage