import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const CategoryFilteredProduct = () => {
    const { categoryName } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pawmart-server-sandy.vercel.app/category-filtered-product/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [categoryName]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="py-12 bg-gradient-to-r from-indigo-50 to-pink-50">
            <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                🛍️ {capitalizeFirstLetter(categoryName)}
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {products.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">No products found in this category</p>
                ) : (
                    products.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                            <h3 className="text-xl font-medium text-gray-800">{product.name}</h3>
                            <p className="text-gray-500 mt-2">{product.description}</p>
                            <p className="text-xl font-semibold text-gray-800 mt-2">Price: ${product.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryFilteredProduct;
