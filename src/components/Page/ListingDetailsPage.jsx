import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ListingDetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [listing, setListing] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(`https://pawmart-server-sandy.vercel.app/listing-details/${id}`)
            .then(res => res.json())
            .then(data => setListing(data));
    }, [id]);

    if (!listing) return <p className="text-center py-10">Loading...</p>;

    const handleOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const order = {
            buyerName: user?.displayName,
            email: user?.email,
            productId: listing._id,
            productName: listing.name,
            quantity: listing.category === "Pets" ? 1 : form.quantity.value,
            price: listing.price,
            address: form.address.value,
            date: form.date.value,
            phone: form.phone.value,
            notes: form.notes.value
        };

        fetch("https://pawmart-server-sandy.vercel.app/orders", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(() => {
                alert("✅ Order placed successfully!");
                setShowModal(false);
            });
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-5 shadow-lg rounded-xl bg-white">
            <title>{listing.name}</title>
            <img src={listing.image} alt={listing.name} className="rounded-lg w-full h-64 object-cover" />
            <h2 className="text-2xl font-bold mt-3">{listing.name}</h2>
            <p>Category: {listing.category}</p>
            <p>Owner: {listing.email}</p>
            <p>Price: {listing.category === "Pets" ? "Free (Adoption)" : `$${listing.price}`}</p>
            <p>Location: {listing.location}</p>
            <p>{listing.description}</p>

            <button onClick={() => setShowModal(true)} className="btn btn-primary w-full mt-4">
                🛒 {listing.category === "Pets" ? "Adopt Now" : "Order Now"}
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <form onSubmit={handleOrder} className="bg-white p-5 rounded-xl w-96 space-y-3">
                        <h3 className="text-xl font-bold mb-2">Place Your Order</h3>
                        <input readOnly defaultValue={user?.displayName} className="input input-bordered w-full" />
                        <input readOnly defaultValue={user?.email} className="input input-bordered w-full" />
                        <input readOnly defaultValue={listing.name} className="input input-bordered w-full" />
                        <input name="quantity" type="number" defaultValue={listing.category === "Pets" ? 1 : 1} readOnly={listing.category === "Pets"} className="input input-bordered w-full" />
                        <input readOnly defaultValue={listing.price} className="input input-bordered w-full" />
                        <input name="address" placeholder="Address" className="input input-bordered w-full" required />
                        <input type="date" name="date" className="input input-bordered w-full" required />
                        <input name="phone" placeholder="Phone" className="input input-bordered w-full" required />
                        <textarea name="notes" placeholder="Additional Notes" className="textarea textarea-bordered w-full"></textarea>

                        <div className="pt-2">
                            <button type="submit" className="btn btn-success w-full">Confirm</button> 
                            <br />
                            <button type="button" onClick={() => setShowModal(false)} className="btn btn-error mt-4 w-full">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ListingDetailsPage;
