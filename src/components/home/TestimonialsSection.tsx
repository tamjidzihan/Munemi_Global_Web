import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import amelieImage from "../../assets/amelie_peterson.jpg"
import boxerImage from "../../assets/Scott_boxer.jpg"
import evelynImage from "../../assets/Evelyn.jpg"


const testimonials = [
    {
        name: "Amelie Peterson",
        title: "France Working Visa",
        image: amelieImage,
        quote:
            "At sagittis congue augue egestas undo magna ipsum vitae purus ipsum primis in cubilia laoreet augue oclis at nullam tempor sapien gravida porta integer at odio velna auctor. An augue in cubilia laoreet magna suscipit egestas magna ipsum vitae purus ipsum primis cubilia laoreet augue ultrice ligula egestas",
    },
    {
        name: "Scott Boxer",
        title: "Germany Travel Visa",
        image: boxerImage,
        quote:
            "At sagittis congue augue egestas undo magna ipsum vitae purus ipsum primis in cubilia laoreet augue oclis at nullam tempor sapien gravida porta integer at odio velna auctor. An augue in cubilia laoreet magna suscipit egestas magna ipsum vitae purus ipsum primis cubilia laoreet augue ultrice ligula egestas",
    },
    {
        name: "Evelyn",
        title: "UK Business Visa",
        image: evelynImage,
        quote:
            "At sagittis congue augue egestas undo magna ipsum vitae purus ipsum primis in cubilia laoreet augue oclis at nullam tempor sapien gravida porta integer at odio velna auctor. An augue in cubilia laoreet magna suscipit egestas magna ipsum vitae purus ipsum primis cubilia laoreet augue ultrice ligula egestas",
    },
];
export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1,
        );
    };
    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1,
        );
    };
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-midnight text-center mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Cursus porta, feugiat primis in ultrice ligula risus auctor tempus
                    dolor feugiat, felis lacinia risus interdum auctor id viverra dolor
                    iaculis luctus placerat and massa
                </p>
                <div className="relative">
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`bg-white p-6 rounded-lg shadow-sm transition-opacity duration-300 ${index === currentIndex ? "opacity-100" : "opacity-50"}`}
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className={`font-semibold ${index === currentIndex ? "text-midnight" : "text-gray-800"}`}>{testimonial.name}</h3>
                                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{testimonial.quote}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 gap-4">
                        <button
                            onClick={handlePrevious}
                            className="p-2 cursor-pointer "
                        >
                            <ChevronLeft size={30} className=" hover:text-red-600" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 cursor-pointer"
                        >
                            <ChevronRight size={30} className=" hover:text-red-600" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
