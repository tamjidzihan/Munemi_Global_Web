import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const SkilledMigrantVisa = () => {
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
            <Hero bgImage={HeroImg} heroName="Skilled/Migrant Visa" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Skilled/Migrant Visa</h2>
                    <p className="mb-4">
                        For filling skill shortages, the Australian government offers skilled visas to foreign families who are eyeing to migrate to Australia.
                    </p>
                </section>

                {/* Skilled Independent Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Skilled Independent Visa</h2>
                    <p className="mb-4">
                        In order to address its skill shortages, Australia grants skilled visas to individuals and families wishing to immigrate permanently. Following points testing, General Skilled Migration only grants permanent visas to independent candidates.
                    </p>
                </section>

                {/* Choosing Munemi Global for a Skilled Migrant Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Choosing Munemi Global for a Skilled Migrant Visa</h2>
                    <p className="mb-4">
                        In Australia, there are several skill shortages that necessitate the immigration of trained and experienced workers. There are several routes to Australian residences that people in diverse situations might use. Using our experience and knowledge, the staff at Munemi Global assists those searching for skilled visas in Australia in selecting the right visa option for them and realizing their aspirations.
                    </p>
                    <p className="mb-4">
                        We make sure clients have the appropriate visa and the required paperwork so they have the highest chance of success. If you're worried that your application will be turned down or unclear if you match the standards, we can provide you the assurance that comes from knowing you're in capable hands.
                    </p>
                    <p className="mb-4">
                        We provide a variety of services on our website for individuals looking for a more in-depth explanation of which skilled migrant visa is best for them, or potential clients may schedule an appointment to have any questions answered. From our free skilled workers' professions list, which you can download to discover if your profession is in demand, to our points calculator to determine your eligibility, you can find all the materials you need to decide on your next move. When you're ready to get in touch with our staff in Sydney, we can assist you in creating and submitting your application with the best possibility of being accepted.
                    </p>
                    <p className="mb-4">
                        The following list of skilled visa subclasses includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Skilled independent visa (Subclass 189)</li>
                        <li>Skilled Nominated visa (Subclass 190)</li>
                        <li>Permanent Residence (Skilled Regional) visa (Subclass 191)</li>
                        <li>Skilled Work Regional (Provisional) visa (Subclass 491)</li>
                    </ul>
                </section>

                {/* Working Visa */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Working Visa</h2>
                    <p className="mb-4">
                        The Australian Government allows migrants to have a working visa for a certain period of time on the basis of their skills and experience.
                    </p>
                    <p className="mb-4">
                        As the world becomes more accessible to international trade, entrepreneurs have had several opportunities. Working permits make international trade and business easier.
                    </p>
                    <p className="mb-4">
                        The prospects for achievement are excellent in Australia, both for residents and for workers. Due to its thriving cities, high employment rate, and breathtaking natural beauty, millions of people choose to live and work in Australia.
                    </p>
                </section>

                {/* How to Work in Australia */}
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How to Work in Australia</h2>
                    <p className="mb-4">
                        Verify that you fulfill the visa criteria before starting to work in Australia. Making sure your profession is listed on the applicable Skilled Occupation List is the first step (SOL). In Australia, there is a great demand for jobs on the SOL.
                    </p>
                    <p className="mb-4">
                        Your eligibility for Australia's General Skilled Migration Program (GSM) is established by a points system that takes into account a variety of variables, such as age, education, English language ability, substantial work experience, etc. These elements require that you obtain at least 65 points. The following paperwork is necessary for your application:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>You have to get an assessment report that has been authorized, such as an ACS, AACA, VETASSESS, etc.</li>
                        <li>IELTS, a test of English competence.</li>
                        <li>Records relating to skilled work, etc.</li>
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

export default SkilledMigrantVisa;
