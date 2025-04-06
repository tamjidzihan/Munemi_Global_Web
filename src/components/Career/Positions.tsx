import {
    ArrowRight,
    Building2,
    Clock,
    MapPin,
    Briefcase,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const openings = [
    {
        title: 'Senior Immigration Consultant',
        type: 'Full Time',
        location: 'Melbourne, Australia',
        department: 'Immigration Services',
        experience: '5-8 years',
        links: '/career/job-application'
    },
    {
        title: 'Become an Agent',
        type: 'Full Time',
        location: 'Dhaka, Bangladesh',
        department: 'Visa Services',
        experience: '1-5 years',
        links: '#'
    },
    {
        title: 'Become an Institute Partner',
        type: 'Full Time',
        location: 'Dhaka, Bangladesh',
        department: 'Visa Services',
        experience: '1-5 years',
        links: '#'
    },
    {
        title: "Become a Health Insurance Partner",
        type: 'Full Time',
        location: 'Dhaka, Bangladesh',
        department: 'Visa Services',
        experience: '1-5 years',
        links: '#'
    },
]

const Positions = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-midnight text-center mb-4">
                    Open Positions
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Explore current opportunities and find your perfect role
                </p>
                <div className="space-y-6">
                    {openings.map((job, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl text-midnight font-bold mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Building2 size={16} />
                                            {job.department}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {job.type}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            {job.experience}
                                        </span>
                                    </div>
                                </div>
                                <Link to={job.links}>
                                    <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                                        Apply Now
                                        <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Positions


