import { ArrowRight } from 'lucide-react'

const steps = [
    {
        number: '01',
        title: 'Submit Application',
        description: 'Fill out our online application form and upload your resume',
    },
    {
        number: '02',
        title: 'Initial Screening',
        description:
            "Our HR team will review your application and reach out",
    },
    {
        number: '03',
        title: 'Interviews',
        description: 'Multiple rounds of interviews with the team and leadership',
    },
    {
        number: '04',
        title: 'Final Offer',
        description:
            "If selected, you'll receive an offer letter with complete details",
    },
]

const ApplicationProcess = () => {
    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-midnight text-center mb-4">
                    Application Process
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Our streamlined application process makes it easy to join our team
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white p-6 rounded-lg border-gray-200 hover:shadow-lg shadow-md">
                                <span className="text-4xl font-bold text-red-500">
                                    {step.number}
                                </span>
                                <h3 className="font-bold text-midnight text-xl my-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <ArrowRight
                                    className="hidden lg:block absolute top-1/2 -right-4 text-red-300"
                                    size={24}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ApplicationProcess