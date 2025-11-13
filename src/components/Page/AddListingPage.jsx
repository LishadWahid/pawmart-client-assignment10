import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const AddListingPage = () => {
    const { user } = useContext(AuthContext);

    const handleAddListing = (e) => {
        e.preventDefault();
        const form = e.target;

        const newListing = {
            name: form.name.value,
            category: form.category.value,
            price: form.category.value === "Pets" ? 0 : parseFloat(form.price.value),
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            date: form.date.value,
            email: user?.email,
        };

        fetch("http://localhost:3000/listings", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newListing),
        })
            .then((res) => res.json())
            .then(() => {
                alert("✅ Listing added successfully!");
                form.reset();
            });
    };

    return (
        <>
            <Navbar />
            <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Add New Listing</h2>

                <form onSubmit={handleAddListing} className="space-y-3">
                    <input name="name" placeholder="Product/Pet Name" className="input input-bordered w-full" required />

                    <select name="category" className="select select-bordered w-full" required>
                        <option value="">Select Category</option>
                        <option>Pets</option>
                        <option>Food</option>
                        <option>Accessories</option>
                        <option>Care Products</option>
                    </select>

                    <input name="price" type="number" placeholder="Price" className="input input-bordered w-full" required />

                    <input name="location" placeholder="Location" className="input input-bordered w-full" required />

                    <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required></textarea>

                    <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />

                    <input name="date" type="date" className="input input-bordered w-full" required />

                    <input readOnly defaultValue={user?.email} className="input input-bordered w-full bg-gray-100" />

                    <button type="submit" className="btn btn-primary w-full">Add Listing</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default AddListingPage;
