import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const VisitorVisa = () => {
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
            <Hero bgImage={HeroImg} heroName="Visitor Visa" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Visitor Visa</h2>
                    <p className="mb-4">
                        Visas for visiting Australia are provided by Australia to people who are visiting Australia for different purposes.
                    </p>
                    <p className="mb-4">
                        Australia's Tourist visas make it easier for non-immigrants to visit. Foreign nationals can travel to Australia temporarily under this arrangement.
                    </p>
                    <p className="mb-4">
                        You can be qualified to apply for a visitor visa (Subcl).
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Eligibility for Visitor Visa</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>On a trip with a licensed travel agent from the People's Republic of China</li>
                        <li>As a guest</li>
                        <li>For business visitor activities</li>
                        <li>To see relatives</li>
                        <li>As a frequent traveler</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What this Visa Permits</h2>
                    <p className="mb-4">
                        One entry may be permitted for you. If so, you'll have to apply for a new visa if you wish to come back to Australia after your initial visit.
                    </p>
                    <p className="mb-4">
                        You may travel to and from Australia as often as you like while your visa is still in effect, but the total amount of time you spend there cannot exceed the length of stay you have been given.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Choose Munemi Global?</h2>
                    <p className="mb-4">
                        Team Munemi Global is eagerly awaiting to help you throughout the whole process. Our expert guidance ensures your application is handled smoothly and efficiently.
                    </p>
                    <p className="mb-4">
                        For more information, feel free to reach out to us at <a href="tel:+8801978100105">+88 01978100105</a>.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default VisitorVisa;
