import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Accommodation = () => {
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
            <Hero bgImage={HeroImg} heroName="Accommodation" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">HOMESTAYS IN AUSTRALIA</h2>
                    <p className="mb-4">
                        Over 25 years experience providing quality homestay accommodation for over 30,000 international students attending leading education institutions across Australia and New Zealand. A trusted under 18 homestay provider for some of Australia’s largest universities and colleges.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What is Homestay?</h2>
                    <p className="mb-4">
                        Homestay is a popular choice for international students of all ages. When you live with a local family, you benefit from the care and support of your hosts.
                    </p>
                    <p className="mb-4">Your host family:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Introduces you to local customs and cultures,</li>
                        <li>Paid visa application fee.</li>
                        <li>Helps you enhance your social and communication skills.</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How much does homestay cost?</h2>
                    <p className="mb-4">
                        You book our homestays for 4 weeks and have the option to extend bookings at any time. The weekly price for homestays varies in each city. Please visit our website for the most up-to-date pricing information.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Homestay?</h2>
                    <p className="mb-4">
                        Homestay offers you a unique opportunity to immerse yourself in Australian and New Zealand society.
                    </p>
                    <p className="mb-4">You will:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Experience an authentic local lifestyle,</li>
                        <li>Improve your English daily,</li>
                        <li>Make lifelong friends.</li>
                    </ul>
                    <p className="mb-4">You also enjoy these great benefits:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Flexible bookings of 4-week stays. Give 2 weeks’ notice when you are ready to move on.</li>
                        <li>50% off rentals when you go on holidays for 2 weeks or more,</li>
                        <li>24/7 support from Munemi Global’s multilingual student care team.</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What else is Included?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Private bedroom with a single (or larger) bed,</li>
                        <li>Study desk, lamp and wardrobe,</li>
                        <li>Breakfast and dinner on weekdays and 3 meals on weekends,</li>
                        <li>All utilities – water, gas, electricity and unlimited Wi-Fi,</li>
                        <li>Access to laundry facilities.</li>
                        <li>Our homestay families are completely safe. They hold Working With Children Checks and police background checks.</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Student Apartments</h2>
                    <p className="mb-4">
                        Student apartments are a fantastic choice if you are looking for convenience, affordability, and the chance to share your experience with students from all over the world. Everything you need is in one place and you can move in straight away.
                    </p>
                    <p className="mb-4">Why choose a Student Apartment?</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It's easy to make friends and socialise</li>
                        <li>Support staff are available if you need help or are unsure about anything</li>
                        <li>Apartments are usually close to campus, so you spend less time travelling</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">About Munemi Global</h2>
                    <p className="mb-4">
                        Munemi Global has been an industry leader for 25 years:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>We specialise in arranging homestays, student accommodation and airport transfers,</li>
                        <li>We run tailored study tours, school immersion programs and university workshops,</li>
                        <li>We are approved partners for leading universities and colleges.</li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default Accommodation;
