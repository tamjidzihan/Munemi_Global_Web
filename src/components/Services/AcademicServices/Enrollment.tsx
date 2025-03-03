import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";
const Enrollment = () => {
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
            <Hero bgImage={HeroImg} heroName="Enrollment" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Prepare for Your Applications</h2>
                    <p className="mb-4">
                        The following documents and demonstrations will be required for your enrolment and visa applications.
                        It’s advised that you have prepared or to have everything organized to procure them to make the
                        application processes as smooth as possible.
                    </p>

                    <ul className="list-disc list-inside space-y-2">
                        <li>Check enrolment dates</li>
                        <li>Passport</li>
                        <li>Grades, marks, and/or results</li>
                        <li>Police record</li>
                        <li>Health check</li>
                        <li>English proficiency check</li>
                        <li>Cover letters/Personal statement</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Submit Your Application for Enrolment</h2>
                    <p className="mb-4">
                        This is usually the first application to be submitted because, in order to apply for a student visa,
                        you must have been accepted into an institution and received a letter of acceptance.
                    </p>
                    <p className="mb-4">
                        This step depends on the institution and country you wish to reside in. The application for enrolment generally requires the following documentation:
                    </p>

                    <ul className="list-disc list-inside space-y-2">
                        <li>Academic record</li>
                        <li>Cover Letter/Personal Statement</li>
                        <li>Passport</li>
                        <li>English Proficiency test results</li>
                        <li>Proof of sufficient income for academic costs</li>
                    </ul>
                    <p className="mt-4">
                        Our counselors will assist you in making sure that every single document and demonstration is completed.
                        This can take anywhere between a month to almost a year to be processed, so it’s important to give yourself enough time.
                        Once you receive a positive response, you may proceed.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Enrollment;
