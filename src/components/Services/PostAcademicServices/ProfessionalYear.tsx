import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-2.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const ProfessionalYear = () => {
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
            <Hero bgImage={HeroImg} heroName="Professional Year Program" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Professional Year Program</h2>
                    <p className="mb-4">
                        Job readiness, often known as the professional year, is an educational program for increasing a student's skills and career development that is intended to assist students to be ready for the workforce in Australia.
                    </p>
                    <p className="mb-4">
                        PY is an organized course that gives prospective students enough hands-on experience and presents them with a potential career path.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Program Benefits</h2>
                    <p className="mb-4">
                        This Department of Home Affairs-approved 44-week (minimum) program will help you accomplish your professional objectives and overcome barriers to employment.
                    </p>
                    <p className="mb-4">By the completion of the program, you will have learned:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Comprehend the Australian labor market and workplace culture</li>
                        <li>Learn how to interact successfully and professionally with coworkers, bosses, and customers</li>
                        <li>Acquire significant job experience by participating in an internship</li>
                        <li>Be able to apply for additional migration points for Australian permanent residency</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How to Apply</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Choose a curriculum based on your interests and professional objectives</li>
                        <li>Determine your eligibility based on the course and program</li>
                        <li>Keep track of program costs as they vary regularly</li>
                    </ul>
                    <p className="mt-4">You will require the following documents:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Your curriculum vitae/resumé</li>
                        <li>A certified copy of your passport</li>
                        <li>The application form</li>
                        <li>Documentation showing the validity of your visa</li>
                        <li>A certified copy of your IELTS certificate</li>
                        <li>Academic certification and other documentation</li>
                        <li>An evaluation by an assessing body related to your skill level (For Accounting and Engineering only)</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Choose Embark Global?</h2>
                    <p className="mb-4">
                        Team Embark Global is eagerly awaiting to help you throughout the whole process. Such programs are useful for students wishing to apply for permanent residency in Australia, as they contribute points towards the Department of Immigration and Border Protection (DIBP) ‘points test’ for visa applications.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default ProfessionalYear;
