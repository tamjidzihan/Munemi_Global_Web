import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import HeroImg from "../../assets/slide-1.jpg";
import Hero from "../common/Hero/Hero";

const Scholarship = () => {
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
            <Hero bgImage={HeroImg} heroName="Scholarship" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What is a Scholarship?</h2>
                    <p className="mb-4">
                        Scholarships, bursaries, and grants are financial assistance provided to students to support their education. These financial aids are typically awarded based on merit, personal circumstances, academic achievements, or specific criteria, such as the country of origin, financial need, or the course of study. Scholarships usually focus on academic accomplishments, while bursaries or grants may also consider other factors, such as financial hardship or community involvement.
                    </p>
                    <p className="mb-4">
                        A scholarship can be a substantial financial aid that reduces the overall cost of tuition, living expenses, and other study-related costs. Bursaries or grants, on the other hand, are usually awarded to students who have demonstrated a need for financial support or who meet certain specific requirements set by the funding institution. Both forms of financial assistance are invaluable resources for students seeking to further their education without the burden of overwhelming debt.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How Munemi Global Can Help</h2>
                    <p className="mb-4">
                        At Munemi Global, we are committed to helping you find and secure the perfect scholarship to support your academic journey. Whether you are seeking a government-sponsored scholarship or a private institution's grant, our team of professionals is here to guide you through every step of the process. We have extensive experience working with students from various backgrounds and qualifications, which means we can provide you with tailored advice that aligns with your academic goals and personal circumstances.
                    </p>
                    <p className="mb-4">
                        Our expert team will help you research a wide range of scholarships available worldwide. We’ll assist you in selecting the best opportunities based on your qualifications, career goals, desired course of study, and choice of institution. We understand the complexities of the scholarship application process and will provide guidance on writing compelling personal statements, securing strong recommendation letters, and preparing all the required documentation.
                    </p>
                    <p className="mb-4">
                        Scholarships come in many forms, and each has its own eligibility criteria, application procedures, and deadlines. By working with Munemi Global, you gain access to our extensive network of educational institutions, scholarship providers, and key decision-makers who can provide insight into the latest opportunities. We stay up to date with scholarship availability to ensure you never miss an opportunity.
                    </p>
                    <p className="mb-4">
                        It's important to note that scholarships can be highly competitive, and the process can sometimes be lengthy and detailed. With our help, you’ll have a higher chance of success by ensuring that your applications stand out to scholarship committees. We take the time to understand your individual needs, ensuring that the scholarship options we recommend align with your personal, academic, and career aspirations.
                    </p>
                    <p className="mb-4">
                        Whether you're looking for a merit-based scholarship, a needs-based bursary, or an institution-specific grant, Munemi Global has the resources and expertise to assist you. We work with various types of scholarships from both government and non-government organizations worldwide. Some scholarships may cover full tuition fees, while others may cover partial expenses, accommodation, or living costs. No matter the type of scholarship you are seeking, we will provide personalized support to ensure you find the right fit.
                    </p>
                    <p className="mb-4">
                        To learn more about available scholarships and how Munemi Global can support your application process, feel free to contact one of our offices around the world or inquire online through our website. Let us help you take the next step in your academic career with the financial support you deserve.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Scholarship;
