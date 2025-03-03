import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const FreeCareerCounseling = () => {
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
            <Hero bgImage={HeroImg} heroName="Free Career Counseling" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Expert Career Counseling</h2>
                    <p className="mb-4">
                        Our wonderful counselors are qualified experts eager to assist clients in learning and developing by
                        sharing their knowledge and insights. Before applying for any course or visa, it is crucial to decide
                        what to study, which educational institution to attend, and which country to choose.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What to Study?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>What are you good at?</li>
                        <li>What do you like doing?</li>
                        <li>What are you passionate about?</li>
                        <li>What do you want to do with your life?</li>
                        <li>How do you get to where you want to be?</li>
                        <li>What should you study?</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Where to Study?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>What activities do you like to do?</li>
                        <li>What weather do you prefer?</li>
                        <li>What are you looking for in an institution?</li>
                        <li>Where have you been before?</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Student Admission Assistance</h2>
                    <p className="mb-4">
                        Our dynamic admission team is always ready to help students apply and secure enrollment confirmation
                        from their desired institutions. These questions and more will be explored by our professional
                        counselors during your initial consultation with Munemi Global.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default FreeCareerCounseling;