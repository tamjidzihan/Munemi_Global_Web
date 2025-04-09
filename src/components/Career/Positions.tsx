import {
    ArrowRight,
    Building2,
    Clock,
    MapPin,
    Briefcase,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const openings = [
    {
        title: 'Senior Immigration Consultant',
        type: ['Full Time', 'Part Time', 'Casual', 'Internship'],
        location: 'Dhaka, Bangladesh',
        department: 'Immigration Services',
        experience: '1-5 years',
        links: '/career/job-application'
    },
    {
        title: 'Become an Agent',
        type: ['Full Time'],
        location: 'Dhaka, Bangladesh',
        department: 'Visa Services',
        experience: '1-5 years',
        links: '#'
    },
    {
        title: 'Become an Institute Partner',
        type: ['Full Time'],
        location: 'Dhaka, Bangladesh',
        department: 'Visa Services',
        experience: '1-5 years',
        links: '#'
    },
    {
        title: "Become a Health Insurance Partner",
        type: ['Full Time'],
        location: 'Dhaka, Bangladesh',
        department: 'Visa Services',
        experience: '1-5 years',
        links: '#'
    },
]


const Positions = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    return (
        <section className="py-20 px-4" id='positions'>
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-3xl font-bold text-midnight text-center mb-4"
                >
                    Open Positions
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
                >
                    Explore current opportunities and find your perfect role
                </motion.p>
                <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {openings.map((job, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.001 }}
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                            style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl text-midnight font-bold mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Building2 size={16} />
                                            {job.department}
                                        </span>
                                        {job.type.map((jobs, index) =>
                                            <span key={index} className="flex items-center gap-1">
                                                <Clock size={16} />
                                                {jobs}
                                            </span>
                                        )}

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
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    )
}

export default Positions


