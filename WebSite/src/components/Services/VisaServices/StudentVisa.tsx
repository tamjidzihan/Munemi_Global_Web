import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const StudentVisa = () => {
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
            <Hero bgImage={HeroImg} heroName="Student Visa" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Student Visa</h2>
                    <p className="mb-4">
                        With a versatile group of expert counselors who have many years of experience in student counseling and visa processing and with alignment with more than 100 institutions, we are one of the best in education counselling.
                    </p>
                    <p className="mb-4">
                        Munemi Global offers educational immigration services in Australia that are geared toward helping students to get over their challenges and prov
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Student Counseling</h2>
                    <p className="mb-4 font-semibold">“Education is the most powerful weapon which you can use to change the world.” -Nelson Mandela</p>
                    <p className="mb-4">
                        You deserve an education counselor that knows what you need from your degree and how it fits into your life objectives, not just someone who advises you where to study for the least amount of money. We help with the application process for student visas as well as applying for and being admitted to World-class universities and institutions. We are dedicated to assisting you in reaching your goals. Our organization seeks to make your ambition of studying, living, and working in countries such as Australia, the United States, the United Kingdom, New Zealand, and Canada a reality.
                    </p>
                    <p className="mb-4">
                        Munemi Global offers a staff of highly skilled education experts to provide the best possible outcomes for overseas students.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How We Can Assist You</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Assess your present eligibility.</li>
                        <li>Decide what actions you should do next to study and relocate to abroad</li>
                        <li>Plan out how you're going to pursue your interests.</li>
                        <li>Look at courses abroad that suit your needs.</li>
                        <li>Inquire about student visas.</li>
                        <li>Maintain your financial stability.</li>
                        <li>Describe the costs associated with studying abroad.</li>
                        <li>Determine your travel requirements.</li>
                        <li>To help you feel more motivated to immigrate, enroll in a PR Pathway course.</li>
                    </ul>
                    <p className="mt-4">
                        A student visa to a desirable country is a dream for many. We are here to make this dream true with our dedicated visa team with smooth documentation service.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default StudentVisa;
