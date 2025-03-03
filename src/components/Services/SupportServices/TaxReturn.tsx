import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const TaxReturn = () => {
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
            <Hero bgImage={HeroImg} heroName="Tax Return Service" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Tax Return Service</h2>
                    <p className="mb-4">
                        Many countries take tax from an individual’s payment before it’s paid. A tax return occurs when you pay more tax than you should, given your level of income. Different countries have different ways of processing tax, and it’s a complicated and time-consuming process for anyone. Munemi Global is here to help you get through the stressful method of tax return!
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How to Apply</h2>
                    <p className="mb-4">
                        You can download the Electronic Fill PDF form and mandatory signature on the form at the bottom of the document. Once fully completed, please send it to the email: accounts@munemiglobal.com or reach us on +88 01978100105 (WhatsApp or text message only). We endeavor to get back to you within two business days during the financial year only.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Important Notes</h2>
                    <p className="mb-4">
                        PS: This Tax Return Service is valid for Domestic and International Students only. Available from 1st of June to 1st of September every financial year.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default TaxReturn;
