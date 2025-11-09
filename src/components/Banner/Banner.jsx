import React from "react";
import { Link } from "react-router";
import pet1 from '../../assets/Pet1.jpg'
import pet2 from '../../assets/Pet2.jpg'
import pet3 from '../../assets/Pet3.jpg'
import pet4 from '../../assets/Pet4.jpg'
import pet5 from '../../assets/Pet5.jpg'


const Banner = () => {
    return (
        <div className="carousel w-full rounded-lg overflow-hidden shadow-lg mt-6">

            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src={pet1}
                    className="w-full object-cover h-[500px]"
                    alt="Pet Adoption"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-20 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Find Your Furry Friend Today! 🐾
                    </h2>
                    <p className="text-lg mb-6">
                        Adopt, don’t shop — give a pet a loving home and a forever family.
                    </p>
                    <Link
                        to="/pets"
                        className="btn btn-primary w-fit"
                    >
                        Explore Pets
                    </Link>
                </div>

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src={pet2}
                    className="w-full object-cover h-[500px]"
                    alt="Pet Supplies"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-20 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Everything Your Pet Needs 🐕
                    </h2>
                    <p className="text-lg mb-6">
                        From nutritious food to fun toys — get all your pet essentials at PawMart.
                    </p>
                    <Link
                        to="/pets"
                        className="btn btn-secondary w-fit"
                    >
                        Browse Supplies
                    </Link>
                </div>

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src={pet3}
                    className="w-full object-cover h-[500px]"
                    alt="Pet Care Products"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-20 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Because Every Pet Deserves Love ❤️
                    </h2>
                    <p className="text-lg mb-6">
                        Join our mission to make adoption easier and caring for pets simpler.
                    </p>
                    <Link
                        to="/auth/register"
                        className="btn btn-accent w-fit"
                    >
                        Get Started
                    </Link>
                </div>

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
