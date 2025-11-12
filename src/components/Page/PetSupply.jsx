import React, { useState, useEffect } from 'react';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';

const PetSupply = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/pet-listings')
            .then((res) => res.json())
            .then((data) => {
                setListings(data);
                setFilteredListings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pet listings:', error);
                setLoading(false);
            });
    }, []);

    // Handle Category Filter
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        applyFilters(searchTerm, category);
    };

    // Handle Search
    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        applyFilters(term, selectedCategory);
    };

    // Apply Filters and Search Together
    const applyFilters = (term, category) => {
        let filtered = listings;

        if (category) {
            filtered = filtered.filter(
                (item) => item.category?.toLowerCase() === category.toLowerCase()
            );
        }

        if (term) {
            filtered = filtered.filter(
                (item) =>
                    item.name?.toLowerCase().includes(term) ||
                    item.location?.toLowerCase().includes(term)
            );
        }

        setFilteredListings(filtered);
    };

    const handleOpenModal = (listing) => {
        setSelectedListing(listing);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedListing(null);
        setModalOpen(false);
    };

    if (loading) {
        return <p className="text-center text-lg mt-8">Loading pet listings...</p>;
    }

    return (
        <>  
            <Navbar></Navbar>
            <div className="py-12 bg-gradient-to-r from-teal-50 to-lime-50 min-h-screen">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                    🐶 Pets & Supplies
                </h2>

                {/* Search + Filter */}
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 px-4">
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full sm:w-1/2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full sm:w-1/4 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Toys">Toys</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Listings Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {filteredListings.length === 0 ? (
                        <p className="text-center text-xl text-gray-500 col-span-3">
                            No pet listings found.
                        </p>
                    ) : (
                        filteredListings.map((listing) => (
                            <div
                                key={listing._id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105"
                            >
                                <img
                                    src={listing.image || 'default-image.jpg'}
                                    alt={listing.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {listing.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Category: {listing.category}
                                    </p>
                                    <p className="text-lg font-semibold text-teal-600 mt-2">
                                        {listing.price ? `$${listing.price}` : 'Free for Adoption'}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Location: {listing.location}
                                    </p>
                                    <button
                                        onClick={() => handleOpenModal(listing)}
                                        className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all"
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
                            <h3 className="font-bold text-lg mb-2">
                                {selectedListing.name}
                            </h3>
                            <img
                                src={selectedListing.image || 'default-image.jpg'}
                                alt={selectedListing.name}
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                            <p className="text-sm text-gray-500">
                                Category: {selectedListing.category}
                            </p>
                            <p className="text-lg text-gray-600 mt-2">
                                {selectedListing.description}
                            </p>
                            <p className="text-lg font-semibold text-teal-700 mt-3">
                                {selectedListing.price
                                    ? `$${selectedListing.price}`
                                    : 'Free for Adoption'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Location: {selectedListing.location}
                            </p>
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
            <Footer></Footer>
        </>
    );
};

export default PetSupply;
