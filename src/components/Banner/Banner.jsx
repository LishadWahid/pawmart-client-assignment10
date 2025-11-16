import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import pet3 from "../../assets/Pet3.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/P4.jpg";

const slides = [
    {
        id: 1,
        img: p3,
        title: "Find Your Furry Friend Today! 🐾",
        desc: "Adopt, don’t shop — give a pet a loving home and a forever family.",
        btnText: "Explore Pets",
        btnLink: "/pet-listings",
        btnStyle: "btn-primary",
    },
    {
        id: 2,
        img: p4,
        title: "Everything Your Pet Needs 🐕",
        desc: "From nutritious food to fun toys — get all your pet essentials at PawMart.",
        btnText: "Browse Supplies",
        btnLink: "/pet-listings",
        btnStyle: "btn-secondary",
    },
    {
        id: 3,
        img: pet3,
        title: "Because Every Pet Deserves Love ❤️",
        desc: "Join our mission to make adoption easier and caring for pets simpler.",
        btnText: "Get Started",
        btnLink: "/pet-listings",
        btnStyle: "btn-accent",
    },
];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    // 🔁 Auto slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(interval);
    }, []);

    // Manual navigation (optional)
    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    const slide = slides[current];

    return (
        <div className="flex justify-center mt-8">
            {/* ⬇️ slightly narrower width than full screen */}
            <div className="relative w-[90%] md:w-[80%] lg:w-[75%] rounded-2xl overflow-hidden shadow-2xl">

                {/* Image */}
                <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] object-cover object-center transition-all duration-700"
                />

                {/* Overlay text */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center px-6 sm:px-10 md:px-16 text-white transition-all duration-700">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                        {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-5 opacity-90 max-w-lg">
                        {slide.desc}
                    </p>
                    <Link
                        to={slide.btnLink}
                        className={`btn btn-primary ${slide.btnStyle} w-fit rounded-full bg-red-500 px-6 shadow-md hover:scale-105 transition-transform`}
                    >
                        {slide.btnText}
                    </Link>
                </div>

                {/* Manual controls */}
                <div className="absolute flex justify-between items-center w-full px-4 top-1/2 -translate-y-1/2">
                    <button onClick={prevSlide} className="btn btn-circle btn-outline">
                        ❮
                    </button>
                    <button onClick={nextSlide} className="btn btn-circle btn-outline">
                        ❯
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 w-full flex justify-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-3 h-3 rounded-full ${current === i ? "bg-white" : "bg-gray-400"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
