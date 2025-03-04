import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-2.jpg"; // Update this path
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const GlobalCareerPathway = () => {
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
            <Hero bgImage={HeroImg} heroName="Global Career Pathway" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Global Career Pathway</h2>
                    <p className="mb-4">
                        In order to get by in this world, people need jobs: this is why people, such as yourself, study and train in certain skills and professions. Kangaroo Global wants to help you with your international career, not just with your studies and training abroad – this means that we not only ensure you get the best education and training to suit your needs and goals but that you are also equipped with the necessary experience and skills to thrive in your career.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Get experience!</h3>
                    <p className="mb-4">
                        Your employability immediately improves if you can demonstrate that you have experience in the field for which you are seeking work. Work experience instantly distinguishes graduates from others who only have academic experience and shows employers that you are committed to the field, proactive, and familiar with the work environment.
                    </p>
                    <p className="mb-4">
                        It also gives you an opportunity to see if that type of work really is suited to you. Studying something and actually doing it as part of your employment may be extremely different experiences, and just because you like the theory does not mean you will enjoy the practical application.
                    </p>
                    <p className="mb-4">
                        Experience can come in a number of ways but is usually in the form of internships, traineeships, volunteering, or placements. Your work does not even have to be in the field which you are studying – employers will appreciate seeing that you are a capable worker no matter what work you actually do.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Develop your soft skills</h3>
                    <p className="mb-4">
                        “Soft Skills” refers to personal traits and skills which enhance your capacity to contribute to and engage in work and the workplace. These are vitally important because they affect the interpersonal relations between employees and their customers and co-workers, which in turn affects workplace productivity and morale. These are being increasingly recognized as important to the success of an organization and are highly valued as a result. They include reliability, honesty, teamwork, collaboration, adaptability, empathy, and communication skills.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Practice your English</h3>
                    <p className="mb-4">
                        English is the most widely spoken language in the world and is considered the international language for all businesses and organizations. It is an extremely useful language and skill to have, bordering on necessary. In order to keep your English at a decent level and to improve it, ensure that you practice and expose yourself as often as possible, such as through conversations, classes, and entertainment.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Immerse yourself in your passion</h3>
                    <p className="mb-4">
                        If this is something that you want to do for the rest of your life and to make a living, you should do everything in your power to know as much about it and have as much experience in it as possible. Do your own research at home, attend extracurricular seminars and workshops, network and connect with people involved in the industry, and always take the extra steps available to get more exposure, experience, and education in the field that you have chosen.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default GlobalCareerPathway;
