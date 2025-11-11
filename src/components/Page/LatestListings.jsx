import React, { useState, useEffect } from 'react';

const LatestListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing for the modal
    const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

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

    const handleOpenModal = (listing) => {
        setSelectedListing(listing);  // Set the selected listing
        setModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
        setSelectedListing(null); // Clear the selected listing
    };

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
                        <div
                            key={listing._id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
                        >
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
                                    onClick={() => handleOpenModal(listing)} // Open modal with the selected listing
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {modalOpen && selectedListing && (
                <dialog
                    open
                    className="modal modal-bottom sm:modal-middle"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleCloseModal();
                        }
                    }}
                >
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Listing Details</h3>
                        <img
                            src={selectedListing.image || 'default-image.jpg'}
                            alt={selectedListing.name}
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                        <p className="text-xl font-semibold text-gray-800">{selectedListing.name}</p>
                        <p className="text-sm text-gray-500">Category: {selectedListing.category}</p>
                        <p className="text-lg text-gray-600 mt-2">{selectedListing.description}</p>
                        <p className="text-xl font-semibold text-gray-800 mt-4">
                            {selectedListing.price ? `$${selectedListing.price}` : 'Free for Adoption'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Location: {selectedListing.location}</p>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default LatestListings;
