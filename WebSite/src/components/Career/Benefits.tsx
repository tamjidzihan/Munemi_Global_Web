const benefits = [
    {
        title: 'Professional Growth',
        description:
            'Regular training sessions, workshops, and opportunities to enhance your skills and advance your career',
    },
    {
        title: 'Work-Life Balance',
        description:
            'Flexible working hours, remote work options, and generous paid time off to help you maintain a healthy balance',
    },
    {
        title: 'Health & Wellness',
        description:
            'Comprehensive health insurance, wellness programs, and gym membership reimbursements',
    },
    {
        title: 'Global Exposure',
        description:
            'Opportunities to work with international clients and partners across multiple countries',
    },
]

const Benefits = () => {
    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl text-midnight font-bold text-center mb-4">
                    Why Work With Us?
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Join a team that values innovation, growth, and work-life balance
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm 
                                      hover:-translate-y-2 hover:shadow-lg transition-all 
                                      duration-300 ease-out animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <h3 className="font-bold text-midnight text-xl mb-3">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Benefits