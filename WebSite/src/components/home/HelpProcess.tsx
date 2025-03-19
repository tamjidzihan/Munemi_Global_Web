import { CheckCircle, Search, BookOpen } from 'lucide-react'
import HelpProcess_IMG from '../../assets/helpprocess.jpg'


export function HelpProcess() {
    const steps = [
        {
            number: 1,
            title: 'Counseling',
            description:
                'Counseling sessions allow us to find out more about you, and you to find out what information you need to know.',
        },
        {
            number: 2,
            title: 'Document Collection',
            description:
                'We will assist you with making sure that every necessary document and is ready or completed.',
        },
        {
            number: 3,
            title: 'Document Validation',
            description:
                'We will verify the authenticity of all the documentation collected during your application processes.',
        },
        {
            number: 4,
            title: 'Submission',
            description:
                'Upon collecting and verifying all documentation, Embark Global will lodge the applications on your behalf.',
        },
        {
            number: 5,
            title: 'Track your progress',
            description:
                'Upon Completing submission you will be able to track your application in real-time.',
        },
    ]
    return (
        <main className="w-full min-h-screen bg-white px-4 md:px-8 lg:px-16 py-8 md:py-16">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-midnight">
                        How do we help?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Five Easy Steps to Follow
                    </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-7">
                        <div className="space-y-8">
                            {steps.map((step) => (
                                <div key={step.number} className="flex gap-4">
                                    <div className="min-w-fit">
                                        <div className="  text-midnight font-bold text-2xl">
                                            {step.number}.
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="  text-midnight font-bold text-2xl mb-1">
                                            {step.title}
                                        </h2>
                                        <p className="text-gray-800">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right Content */}
                    <div className="lg:col-span-5 flex flex-col items-center gap-6">
                        {/* Process Steps Card */}
                        <div className="bg-indigo-950 rounded-lg p-6 w-full max-w-sm">
                            <div className="space-y-4">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex items-center gap-3">
                                        <div className="bg-orange-500 rounded-full p-1">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="text-white">{step.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Student Image */}
                        <div className="relative">
                            <div className="bg-pink-300 rounded-full w-64 h-64 md:w-80 md:h-80 relative overflow-hidden">
                                <img
                                    src={HelpProcess_IMG}
                                    alt="Student with headphones and books"
                                    className="absolute bottom-0 right-0 h-full w-auto"
                                />
                                {/* Decorative elements */}
                                <div className="absolute top-2 right-2 bg-white rounded-full p-2 border-2 border-orange-500">
                                    <Search className="h-5 w-5 text-midnight" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 border-2 border-orange-500">
                                    <BookOpen className="h-5 w-5 text-midnight" />
                                </div>
                                {/* Decorative curved lines */}
                                <div className="absolute inset-0">
                                    <div className="border-2 border-white rounded-full w-[110%] h-[110%] opacity-30 absolute -top-[5%] -left-[5%]"></div>
                                    <div className="border-2 border-white rounded-full w-[130%] h-[130%] opacity-20 absolute -top-[15%] -left-[15%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
