import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const BankingSupport = () => {
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
            <Hero bgImage={HeroImg} heroName="Banking Support" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <p className="mb-4">
                        When studying abroad, you need to set up a bank account. <strong>Munemi Global</strong> will help you select a bank and set up your account. Moving money between countries can be complicated and costly. <strong>Munemi Global</strong> will help you find the most secure and fastest way to access and move money globally with competitive exchange rates and low-to-no fees.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How We Help</h2>
                    <p className="mb-4">
                        Banking systems are extremely important but are complicated and differ from country to country. Here at <strong>Munemi Global</strong>, we’re here to help you with this. Our assistance includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Helping you find a suitable bank,</li>
                        <li>Opening up a bank account for you,</li>
                        <li>Transferring money from your home country to your destination,</li>
                        <li>Communicating with your banks directly if there are any problems or questions.</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Trusted Banking Partnerships</h2>
                    <p className="mb-4">
                        <strong>Munemi Global</strong> has partnered with one of Australia’s top banks to make sure students have their money safe before they arrive.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default BankingSupport;
