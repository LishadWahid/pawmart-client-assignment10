import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";


const MyListingsPage = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);

    // Load user's own listings
    useEffect(() => {
        fetch(`http://localhost:3000/listings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setListings(data.filter(l => l.email === user?.email)));
    }, [user]);

    // Delete listing
    const handleDelete = id => {
        if (confirm("Delete this listing?")) {
            fetch(`http://localhost:3000/listings/${id}`, { method: "DELETE" })
                .then(() => setListings(listings.filter(l => l._id !== id)));
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-5 rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-4">My Listings</h2>
            {listings.length === 0 ? <p>No listings found.</p> : (
                <table className="table w-full">
                    <thead>
                        <tr><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {listings.map(l => (
                            <tr key={l._id}>
                                <td>{l.name}</td>
                                <td>{l.category}</td>
                                <td>${l.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(l._id)} className="btn btn-sm btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default MyListingsPage;
