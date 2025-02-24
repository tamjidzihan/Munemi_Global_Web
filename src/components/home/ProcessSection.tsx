import { Check } from "lucide-react";
import Approved from "../../assets/process_01.jpg";
import Hidden from "../../assets/process_02.jpg";
import Secure from "../../assets/process_03.jpg";
import { useState } from "react";

const sections = [
    {
        id: 1,
        sectionName: "Goverment Approved",
        title: "GETTING A VISA",
        image: Approved,
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
        image: Hidden,
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
        image: Secure,
        headLine: "Effortless visa application process",
        description: "We streamline the visa application process, making it quicker, easier, and more secure for you.",
        subTitle: "A Stress-Free Experience",
        point1: "Secure document handling ensures your information remains safe and confidential.",
        point2: "Our user-friendly platform guides you step-by-step, reducing processing times and eliminating confusion."
    }
];

export function ProcessSection() {
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Navigation Tabs (Scrollable on Mobile) */}
                <div className="flex justify-center space-x-8 mb-20 overflow-x-auto scrollbar-hide">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className="text-center cursor-pointer flex-shrink-0"
                            onClick={() => setActiveSection(section)}
                        >
                            <div className={`text-sm lg:text-lg transition-all duration-300 focus:outline-none  
                                ${activeSection.id === section.id ? "font-bold text-midnight" : "text-indigo-900"}`
                            }>
                                {section.sectionName}
                            </div>
                            <div className={`w-full h-1 mt-2 transition-all duration-300 
                                ${activeSection.id === section.id ? "bg-red-500" : "bg-gray-200"}`}>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Section Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Image Section */}
                    <div className="flex justify-center">
                        <img
                            src={activeSection.image}
                            alt={activeSection.title}
                            className="rounded-lg shadow-lg w-3/4 max-w-md md:max-w-lg"
                        />
                    </div>

                    {/* Text Content */}
                    <div>
                        <div className="text-sm text-gray-600 mb-2">{activeSection.title}</div>
                        <h2 className="text-2xl sm:text-3xl text-midnight font-bold mb-6">
                            {activeSection.headLine}
                        </h2>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base">
                            {activeSection.description}
                        </p>
                        <h3 className="font-semibold text-midnight mb-4 text-lg">
                            {activeSection.subTitle}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Check className="text-red-500 mt-1" size={18} />
                                <p className="text-gray-600 text-sm sm:text-base">
                                    {activeSection.point1}
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="text-red-500 mt-1" size={18} />
                                <p className="text-gray-600 text-sm sm:text-base">
                                    {activeSection.point2}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
