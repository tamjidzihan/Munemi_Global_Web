import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-2.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const OSHC = () => {
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
            <Hero bgImage={HeroImg} heroName="Overseas Student Health Cover (OSHC)" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Overseas Student Health Cover (OSHC)</h2>
                    <p className="mb-4">
                        If you are a student from overseas on a temporary student visa, it is a condition of your visa to maintain adequate health insurance for the duration of your stay in Australia.
                        This means you need to purchase Overseas Student Health Cover (OSHC) and keep your policy up to date whilst you are in Australia and holding a student visa. OSHC assists international students to meet the overseas health insurance requirements.
                    </p>
                    <p className="mb-4">
                        As holding OSHC is a visa requirement, take care to maintain your cover at all times. If you do fall behind in payments or renewing your cover, you will be able to continue your cover but you may not be able to claim for services you received while you were in arrears.
                    </p>
                    <p className="mb-4">
                        If your visa status or Medicare eligibility changes at any time, inform your insurer as soon as possible to find out whether your level of cover is still suitable.
                        When your student visa expires, then you are no longer eligible to hold OSHC. You can then swap over to a residents’ cover or to an Overseas Visitors Health Cover plan.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What does OSHC cover?</h2>
                    <p className="mb-4">
                        OSHC policies assist to cover the cost of hospital and medical treatment. Benefits are also paid for ambulance services.
                    </p>
                    <p className="mb-4">
                        The minimum requirements of an OSHC policy are set out in the OSHC Deed. The Department of Health also provides Explanatory Guidelines for the Deed and a One-Page Fact Sheet about what is included under the Deed and how OSHC works. For further information, check with your OSHC insurer.
                    </p>
                    <p className="mb-4">
                        OSHC does not pay for general treatment (ancillary, or extras cover) such as dental, optical, or physiotherapy. If you require cover for these treatments, you may take Extras OSHC provided by an OSHC provider or general treatment cover with any Australian private health insurer. You can also choose to supplement OSHC with other insurance such as international travel insurance.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Medicare and OSHC</h2>
                    <p className="mb-4">
                        If you are in Australia on a student visa from the United Kingdom, Sweden, the Netherlands, Belgium, Slovenia, Italy or New Zealand, you can also apply for Medicare under your country’s Reciprocal Health Care Agreements.
                        (Students from Norway, Finland, Malta and the Republic of Ireland are not covered by the agreements with those countries.)
                    </p>
                    <p className="mb-4">
                        Any Medicare coverage you are entitled to under a Reciprocal Health Care Agreement will be in addition to OSHC. Having reciprocal access to Medicare does not exempt you from needing to take out OSHC.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">OSHC and COVID-19</h2>
                    <p className="mb-4">
                        OSHC includes cover for Coronavirus (COVID-19) related illnesses, principally “Lung and chest”, “Kidney and bladder” and “Dialysis for chronic kidney failure” clinical categories.
                    </p>
                    <p className="mb-4">
                        International students who are stranded in Australia, due to mandated travel restrictions put in place by the Australian Government in response to the global pandemic, are recommended to contact their private health insurer for further assistance to ensure continuity of cover during this time.
                    </p>
                    <p className="mb-4">
                        International students who are offshore due to Coronavirus (COVID-19) while holding a student visa are recommended to contact their private health insurer about available options during this time.
                    </p>
                    <p className="mb-4">
                        For more information see the Department of Health.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">OSHC and Pharmaceuticals</h2>
                    <p className="mb-4">
                        Only limited benefits for pharmaceuticals apply, limited to $50 per pharmaceutical item to a maximum of $300 a year for single membership ($600 for a family membership). You may face significant out-of-pocket costs if you need treatment with pharmaceuticals, particularly oncology (cancer) treatment, which can cost tens of thousands of dollars.
                    </p>
                    <p className="mb-4">
                        Travellers entering Australia may bring in medicines and medical devices for immediate use and to import small quantities for personal use. For more information see the Therapeutic Goods Administration website – Entering Australia and Personal Importation Scheme.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Where can I purchase OSHC?</h2>
                    <p className="mb-4">
                        OSHC is offered by certain insurers under a Deed of Agreement with the Department of Health to provide adequate health insurance to students at a reasonable cost. Only a small number of registered health insurers offer OSHC:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            ahm OSHC: <a className=" hover:text-red-600 hover:underline" href="http://www.ahmoshc.com" target="_blank" rel="noopener noreferrer">www.ahmoshc.com</a>
                        </li>
                        <li>
                            Allianz Global Assistance (Peoplecare Health): <a className=" hover:text-red-600 hover:underline" href="http://www.allianzassistancehealth.com.au/en/student-visa-oshc/" target="_blank" rel="noopener noreferrer">www.allianzassistancehealth.com.au/en/student-visa-oshc/</a>
                        </li>
                        <li>
                            BUPA Australia: <a className=" hover:text-red-600 hover:underline" href="http://www.bupa.com.au/health-insurance/oshc" target="_blank" rel="noopener noreferrer">www.bupa.com.au/health-insurance/oshc</a>
                        </li>
                        <li>
                            CBHS International Health: <a className=" hover:text-red-600 hover:underline" href="http://www.cbhsinternationalhealth.com.au/overseas-students-oshc" target="_blank" rel="noopener noreferrer">www.cbhsinternationalhealth.com.au/overseas-students-oshc</a>
                        </li>
                        <li>
                            Medibank Private: <a className=" hover:text-red-600 hover:underline" href="http://www.medibank.com.au" target="_blank" rel="noopener noreferrer">www.medibank.com.au</a>
                        </li>
                        <li>
                            NIB OSHC: <a className=" hover:text-red-600 hover:underline" href="http://www.nib.com.au" target="_blank" rel="noopener noreferrer">www.nib.com.au</a>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default OSHC;
