import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const MigrationServices = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="w-full">
            <Hero bgImage={HeroImg} heroName="Migration Services" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Migration Services</h2>
                    <p className="mb-4">
                        Migration Services works with foreign nationals to help them follow their aspirations of settling in Australia, reuniting with their family, and achieving their objectives.
                    </p>
                    <p className="mb-4">
                        With years of experience handling critical visa issues, we are here to provide our clients with all the help they need regarding migration to Australia.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What We Offer</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Which documents to provide</li>
                        <li>When and where to provide them</li>
                        <li>How and why to do so</li>
                    </ul>
                    <p className="mb-4">
                        We’ll assist you every step of the way when applying for a visa to your selected destination. We will give you an in-depth explanation of the steps, documentation, and requirements for obtaining the relevant visa, which is generally a student visa.
                    </p>
                    <p className="mb-4">
                        We then provide all the resources, forms, and information necessary for a successful submission and application. From preparation to submission, we will guide you, review everything, and ensure a smooth process.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Health Insurance Assistance</h2>
                    <p className="mb-4">
                        We’ll also assist you with the acquisition of the appropriate health insurance, which is a complex yet necessary requirement for arrival. This covers visits to the doctor, hospital services, ambulance services, and prescription medication.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Student Visa Requirements</h2>
                    <p className="mb-4">
                        Once accepted into an educational institution, you are eligible to apply for a student visa. The application process can vary significantly depending on the country you’re applying to. You may be required to provide the following:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Offer Letter from an educational institution</li>
                        <li>Passport</li>
                        <li>Police check</li>
                        <li>Health/Medical check</li>
                        <li>Proof of sufficient income for living costs</li>
                        <li>Attend interviews/appointments</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Our Support</h2>
                    <p className="mb-4">
                        Our counselors will assist you with the collection, completion, and submission of the documentation, ensuring it meets the highest standards. Processing time can range from a couple of months to almost a year, so it’s important to start early. Once you receive the student visa, you can begin your academic adventure of a lifetime!
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Contact Us</h2>
                    <p className="mb-4">
                        Our team is here to assist you. Contact us at <a href="tel:+8801978100105">+88 01978100105</a> for personalized support.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default MigrationServices;
