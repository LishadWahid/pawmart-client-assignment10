import React from 'react';

const WhyAdopt = () => {
    return (
        <section className="adopt-section py-16 bg-gray-100">
            <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-800">
                    Why Adopt from PawMart?
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 mb-4">
                    Adopting a pet is one of the most rewarding decisions you can make. When you adopt, you're not just giving a pet a home — you're changing their life for the better.
                </p>
                <p className="text-lg sm:text-xl text-gray-700 mb-6">
                    Every year, thousands of pets are abandoned or in need of a new home. Adopting from PawMart helps reduce this number, giving a second chance to pets who deserve love and care.
                </p>
                
                {/* Flexbox for images */}
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <img
                        src="https://i.ibb.co/qLHpHW9S/c2.jpg"
                        alt="Happy adopted pet"
                        className="w-full sm:w-1/2 md:w-1/3 rounded-md shadow-lg object-cover"
                    />
                    <img
                        src="https://i.ibb.co/tT1RRRCp/a1.jpg"
                        alt="Adopted pets with their owners"
                        className="w-full sm:w-1/2 md:w-1/3 rounded-md shadow-lg object-cover"
                    />
                </div>

                {/* Adopt button */}
                <a
                    href="/pet-listings"
                    className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary-dark transition duration-300"
                >
                    Adopt Today!
                </a>
            </div>
        </section>
    );
};

export default WhyAdopt;
