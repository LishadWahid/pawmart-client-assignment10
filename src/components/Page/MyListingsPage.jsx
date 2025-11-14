import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const MyListingsPage = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);

    // Load user's own listings
    useEffect(() => {
        fetch(`https://pawmart-server-sandy.vercel.app/listings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setListings(data.filter(l => l.email === user?.email)));
    }, [user]);

    // Delete listing
    const handleDelete = id => {
        if (confirm("Delete this listing?")) {
            fetch(`https://pawmart-server-sandy.vercel.app/listings/${id}`, { method: "DELETE" })
                .then(() => setListings(listings.filter(l => l._id !== id)));
        }
    };

    // Update listing (redirect or open modal — adjust as needed)
    const handleUpdate = id => {
        // Example: redirect to update page
        window.location.href = `/update-listing/${id}`;
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 bg-white p-5 rounded shadow">
                <title>Pawmart-client - My listings</title>
                <h2 className="text-2xl font-bold text-center mb-4">My Listings</h2>

                {listings.length === 0 ? (
                    <p className="text-center">No listings found.</p>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((l, index) => (
                                <tr key={l._id}>
                                    <td>{index + 1}</td> {/* Serial number */}
                                    <td>{l.name}</td>
                                    <td>{l.category}</td>
                                    <td>${l.price}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleUpdate(l._id)}
                                            className="btn btn-sm btn-info"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(l._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyListingsPage;
