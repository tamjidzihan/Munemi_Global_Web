import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const FamilyParentVisa = () => {
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
            <Hero bgImage={HeroImg} heroName="Family/Parent Visa" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Family Visa</h2>
                    <p className="mb-4">
                        This visa allows people to enter and stay in Australia with their families for a fixed amount of time.
                    </p>
                    <p className="mb-4">
                        This visa is often given by the local government and functions as a short-term authorization that permits you to visit the nation for a specific amount of time. Normal family visas seldom result in permanent residency.
                    </p>
                </section>

                {/* Parent Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Parent Visa</h2>
                    <p className="mb-4">
                        A parent must have a kid or children, be eligible for a Parent visa, and be either Australian citizens, permanent residents, or eligible New Zealand citizens. The kid already living in Australia must sponsor their family's immigration to Australia under this family visa category.
                    </p>
                    <p className="mb-4">
                        Parent visas for Australia are available to working and elderly parents. Those who choose this visa option for immigration may be able to obtain jobs in Australia. The temporary settlement visas for parents that are initially provided can be changed to permanent ones based on your application. A "Contributory Parent Visa" option guarantees faster immigration processing at a greater fee.
                    </p>
                    <p className="mb-4">
                        Parent Visas are only granted by the Australian immigration authorities on a very irregular basis. As a result, there is a backlog of applications that need to be handled.
                    </p>
                </section>

                {/* Partner Category Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Partner Category Visa</h2>
                    <p className="mb-4">
                        Those who fall under this category are eligible to come to Australia and reside there with their spouses or fiancées. With this visa, immigrants can first remain in this nation for a brief period of time before converting to permanent residents after a few years.
                    </p>
                    <p className="mb-4">
                        The following partner categories are included:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Spouses or married couples</li>
                        <li>A companion who is engaged or engaged to be married</li>
                        <li>A willing accomplice, preferably of the same gender</li>
                        <li>An immigrant's spouse must be a permanent resident of Australia</li>
                        <li>Either an eligible citizen of New Zealand or Australia</li>
                    </ul>
                </section>

                {/* Contact Information */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Contact Us</h2>
                    <p className="mb-4">
                        If you need assistance with any visa applications, our team is here to help. Contact us at <a href="tel:+8801978100105">+88 01978100105</a> for guidance and support.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default FamilyParentVisa;
