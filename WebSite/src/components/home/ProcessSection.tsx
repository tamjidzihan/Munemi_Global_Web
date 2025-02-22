import { Check } from "lucide-react";
import image1 from "../../assets/Image_1.png";
import image2 from "../../assets/Image_2.jpg";
import image3 from "../../assets/Image_3.jpg";
import { useState } from "react";

const sections = [
    {
        id: 1,
        sectionName: "Goverment Approved",
        title: "GETTING A VISA",
        image: image1,
        headLine: "We make the visa process faster",
        description: "Semper lacus cursus porta, feugiat primis ligula risus auctor and rhoncus in ultrice ligula purus ipsum primis in cubilia augue vitae laoreet augue in cubilia augue egestas an ipsum turpis",
        subTitle: "Cubilia augue vitae laoreet",
        point1: "Fringilla risus nec, luctus mauris orci auctor purus euismod at pretium purus pretium ligula rutrum viverra tortor apien sodales congue magna undo pretium purus pretium an magnis nulla",
        point2: "Quaerat sodales sapien undo euismod risus auctor egestas augue mauri undo viverra tortor sapien sodales sapien and vitae donec dolor sapien augue erat iaculis euismod"
    },
    {
        id: 2,
        sectionName: "No Hidden Costs",
        title: "We love our clients",
        image: image2,
        headLine: "Transparent pricing with no additional fees",
        description: "Our service ensures that what you see is what you pay. No extra fees, no surprises, just clear and upfront pricing for your visa process.",
        subTitle: "Clear and Honest Pricing",
        point1: "Every fee is disclosed upfront, so you never have to worry about unexpected charges.",
        point2: "We prioritize honesty and fairness, ensuring you get the best service without overpaying."
    },
    {
        id: 3,
        sectionName: "Fast, Easy & Secure",
        title: "Professional Advisors",
        image: image3,
        headLine: "Effortless visa application process",
        description: "We streamline the visa application process, making it quicker, easier, and more secure for you.",
        subTitle: "A Stress-Free Experience",
        point1: "Secure document handling ensures your information remains safe and confidential.",
        point2: "Our user-friendly platform guides you step-by-step, reducing processing times and eliminating confusion."
    }
];

export function ProcessSection() {
    const [activeSection, setActiveSection] = useState(sections[0])



    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center space-x-8 mb-16">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className="text-center cursor-pointer"
                            onClick={() => setActiveSection(section)}
                        >
                            <div className={`t-2   transition-all duration-300 focus:outline-none  ${activeSection.id === section.id ? "text-xl font-bold text-midnight" : "text-lg text-indigo-900"}`}>{section.sectionName}</div>
                            <div className={`w-50 h-1 mt-2 transition-all duration-300 ${activeSection.id === section.id ? "bg-red-500" : "bg-gray-200"}`}></div>
                        </button>

                    ))}

                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src={activeSection.image}
                            alt={activeSection.title}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-2">{activeSection.title}</div>
                        <h2 className="text-3xl text-midnight font-bold mb-8">
                            {activeSection.headLine}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {activeSection.description}
                        </p>
                        <h3 className="font-semibold text-midnight mb-4">{activeSection.subTitle}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <Check className="text-red-500 mt-1" size={20} />
                                <p className="text-gray-600">
                                    {activeSection.point1}
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <Check className="text-red-500 mt-1" size={20} />
                                <p className="text-gray-600">
                                    {activeSection.point2}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section >
    );
}
