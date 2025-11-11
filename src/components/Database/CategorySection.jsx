import React from "react";
import { useNavigate } from "react-router";
import CategoryFilteredProduct from "./CategoryFilteredProduct";


const categories = [
    { icon: "🐶", title: "Pets (Adoption)", slug: "pets" },
    { icon: "🍖", title: "Pet Food", slug: "pet-food" },
    { icon: "🧸", title: "Accessories", slug: "accessories" },
    { icon: "💊", title: "Pet Care Products", slug: "pet-care" },
];

const CategorySection = () => {
    const navigate = useNavigate();

    return (
        <div className="py-12 bg-gradient-to-r from-indigo-50 to-pink-50">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                🛍️ Shop by Category
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {categories.map((cat) => (
                    <div
                        key={cat.slug}
                        onClick={() => navigate(`/category-filtered-product/${cat.slug}`)}
                        className="cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-white rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl"
                    >
                        <div className="text-6xl mb-4">{cat.icon}</div>
                        <h3 className="text-2xl font-medium text-gray-800">{cat.title}</h3>
                        <p className="text-gray-500 mt-2">Explore various listings</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
};

export default CategorySection;
