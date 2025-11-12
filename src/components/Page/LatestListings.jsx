import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LatestListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the latest 6 listings from the backend
        fetch('http://localhost:3000/latest-listings')
            .then((res) => res.json())
            .then((data) => {
                setListings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching latest listings:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading latest listings...</p>;
    }

    return (
        <div className="py-12 bg-gradient-to-r from-indigo-50 to-pink-50">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                🛍️ Latest Listings
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {listings.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">No listings available</p>
                ) : (
                    listings.map((listing) => (
                        <div key={listing._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
                            <img
                                src={listing.image || 'default-image.jpg'} // Default image if none provided
                                alt={listing.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
                                <p className="text-sm text-gray-500 mt-2">Category: {listing.category}</p>
                                <p className="text-lg font-semibold text-gray-800 mt-2">
                                    {listing.price ? `$${listing.price}` : 'Free for Adoption'}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Location: {listing.location}</p>
                                <button
                                    onClick={() => navigate(`/listing-details/${listing._id}`)} // Navigate to details page
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestListings;
