import ApplicationProcess from "./ApplicationProcess"
import Benefits from "./Benefits"
import CareerHero from "./CareerHero"
import Positions from "./Positions"

const Career = () => {
    return (
        <main className="w-full">
            {/* Hero Section */}
            <CareerHero />

            {/* Benefits Section */}
            <Benefits />

            {/* Open Positions */}
            <Positions />

            {/* Application Process */}
            <ApplicationProcess />

            {/* Contact Section */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl text-midnight font-bold mb-4">Have Questions?</h2>
                    <p className="text-gray-600 mb-8">
                        Our recruitment team is here to help you with any questions about
                        our open positions or application process
                    </p>
                    <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600">
                        Contact Recruitment Team
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Career