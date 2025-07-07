import { Search } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { Outlet } from 'react-router-dom'
import PageTitle from '../admin/components/PageTitle'
import useBlogPosts, { BlogPostProps } from '../hooks/useBlogPosts'
import { useEffect, useState } from 'react'

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
    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [filteredPosts, setFilteredPosts] = useState<BlogPostProps[]>([])

    useEffect(() => {
        if (blogPosts.length > 0) {
            // Extract unique categories
            const uniqueCategories = Array.from(
                new Set(blogPosts.map(post => post.category))
            ).filter(category => category) as string[]

            setCategories(uniqueCategories.sort())
            setFilteredPosts(blogPosts) // Initialize with all posts
        }
    }, [blogPosts])

    // Filter posts when category changes
    useEffect(() => {
        if (selectedCategory) {
            setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory))
        } else {
            setFilteredPosts(blogPosts) // Show all posts if no category selected
        }
    }, [selectedCategory, blogPosts])

    const handleCategoryClick = (category: string) => {
        // Toggle category selection
        setSelectedCategory(prev => prev === category ? null : category)
    }

    return (
        <>
            <PageTitle title='Blog | Munemi Global' />
            <section className="bg-red-500">
                <Breadcrumb />
            </section>
            <main className="w-full bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Outlet context={{
                            posts: filteredPosts,
                            loading,
                            error,
                            selectedCategory
                        }} />

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
                                {loading ? (
                                    <p>Loading categories...</p>
                                ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : (
                                    <ul className="space-y-2">
                                        <li>
                                            <button
                                                onClick={() => setSelectedCategory(null)}
                                                className={`text-gray-600 hover:text-red-500 ${!selectedCategory ? 'font-bold text-red-500' : ''}`}
                                            >
                                                → All Categories
                                            </button>
                                        </li>
                                        {categories.map((category) => (
                                            <li key={category}>
                                                <button
                                                    onClick={() => handleCategoryClick(category)}
                                                    className={`text-gray-600 hover:text-red-500 ${selectedCategory === category ? 'font-bold text-red-500' : ''}`}
                                                >
                                                    → {category}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Latest Posts */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-bold text-lg mb-4">
                                    {selectedCategory ? `${selectedCategory} Posts` : 'Latest Posts'}
                                </h3>
                                <div className="space-y-4">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p className="text-red-500">{error}</p>
                                    ) : (
                                        filteredPosts.slice(0, 3).map((post) => (
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