import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const MyOrdersPage = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/orders")
            .then(res => res.json())
            .then(data => setOrders(data.filter(o => o.email === user?.email)));
    }, [user]);

    // Download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("My Orders Report", 10, 10);
        doc.autoTable({
            head: [["Product", "Price", "Qty", "Address"]],
            body: orders.map(o => [o.productName, `$${o.price}`, o.quantity, o.address]),
        });
        doc.save("MyOrders.pdf");
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 bg-white p-5 rounded shadow">
                <h2 className="text-2xl font-bold text-center mb-4">My Orders</h2>
                {orders.length === 0 ? <p>No orders found.</p> : (
                    <>
                        <table className="table w-full">
                            <thead>
                                <tr><th>Product</th><th>Price</th><th>Qty</th><th>Address</th></tr>
                            </thead>
                            <tbody>
                                {orders.map((o, i) => (
                                    <tr key={i}>
                                        <td>{o.productName}</td>
                                        <td>${o.price}</td>
                                        <td>{o.quantity}</td>
                                        <td>{o.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={downloadPDF} className="btn btn-primary mt-4 w-full">📄 Download Report</button>
                    </>
                )}
            </div>
            <Footer/>
        </>
    );
};
export default MyOrdersPage;
