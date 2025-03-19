import { Search } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { Outlet } from 'react-router-dom'

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

const categories = ['Immigration Visa', 'PR Visa', 'Working Visa']

const tags = [
    'Consultations',
    'Education',
    'Embassy',
    'Immigration',
    'Tourism',
    'Timeline',
    'Travel Tips',
    'Visa',
]
const countries = [
    {
        name: 'Canada',
        image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225',
    },
    {
        name: 'United Kingdom',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    },
    {
        name: 'United States of America',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74',
    },
]

const BlogPage = () => {
    return (
        <>
            <section className=" bg-red-500 ">
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
                                    {blogPosts.slice(0, 3).map((post, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="text-sm text-gray-600">
                                                <p className="text-gray-900 font-medium hover:text-red-500">
                                                    <a href="#">{post.title}</a>
                                                </p>
                                                <p>{post.date}</p>
                                            </div>
                                        </div>
                                    ))}
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

