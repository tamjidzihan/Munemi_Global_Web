import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const OtherTypeVisa = () => {
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
            <Hero bgImage={HeroImg} heroName="Other Type Visa" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Other Type Visa</h2>
                    <p className="mb-4">
                        Australia offers different types of visas based on specific needs, including Training Visa, Care Visa, and Protection Visa.
                    </p>
                </section>

                {/* Training Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Training Visa</h2>
                    <p className="mb-4">
                        A Training Visa allows individuals to gain professional training in Australia. The objective of this visa is to provide the opportunity to participate in professional development programs or workplace-based occupational training activities to enhance skills for employment or tertiary education.
                    </p>
                </section>

                {/* Care Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Care Visa</h2>
                    <p className="mb-4">
                        A Care Visa allows individuals to migrate to Australia to take care of someone who has a chronic medical condition and does not have reasonable access to care options.
                    </p>
                    <h3 className="text-xl font-semibold mt-4">What You Can Do with This Visa:</h3>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Migrate to Australia or remain there permanently</li>
                        <li>Work and study in Australia</li>
                        <li>Travel for five years to and from Australia</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Requirements:</h3>
                    <h4 className="text-lg font-medium mt-2">Subclass 116 (Offshore)</h4>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Be outside of Australia at the time of application</li>
                        <li>Be sponsored by a relative or their partner for your first two years</li>
                        <li>Take care of a family member who has no reasonable access to care options</li>
                    </ul>

                    <h4 className="text-lg font-medium mt-4">Subclass 836 (Onshore)</h4>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Be inside Australia at the time of application</li>
                        <li>Be sponsored by an eligible sponsor</li>
                        <li>Take care of a family member who has no reasonable access to care options</li>
                    </ul>
                </section>

                {/* Protection Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Protection Visa</h2>
                    <p className="mb-4">
                        The Protection Visa is designed for people who have been forced to leave their home country due to persecution, war, or violence. It allows them to seek refuge and protection in Australia.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Who Can Apply?</h3>
                    <p className="mb-4">
                        A refugee is someone who has been compelled to leave their native country due to persecution, war, or violence for one or more of the following reasons:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Race</li>
                        <li>Religion</li>
                        <li>Nationality</li>
                        <li>Political opinion</li>
                        <li>Membership of a particular social group</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Protection Visa Requirements:</h3>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Engage in Australia’s protection obligations (or be a member of the same family unit as someone who does)</li>
                        <li>Have arrived in Australia legally on a valid visa</li>
                        <li>Fulfill all other visa conditions, including health, character, and security requirements</li>
                    </ul>

                    <p className="mt-4">
                        You can apply for this visa if you fear persecution or serious harm in your home country, regardless of whether you entered Australia legally or without immigration clearance.
                    </p>
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

export default OtherTypeVisa;
