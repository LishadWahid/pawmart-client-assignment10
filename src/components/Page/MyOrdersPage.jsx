import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
const MyOrdersPage = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://pawmart-server-sandy.vercel.app/orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    }, [user]);

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.text("My Orders Report", 14, 15);

        const tableData = orders.map((order, index) => [
            index + 1,
            order.productName || "N/A",
            order.buyerName || user?.displayName || "Me",
            `$${order.price || 0}`,
            order.quantity || 1,
            order.address || "N/A",
            order.phone || "N/A",
            order.date || "N/A",
        ]);

        autoTable(doc, {
            head: [["#", "Product", "Buyer", "Price", "Qty", "Address", "Phone", "Date"]],
            body: tableData,
            startY: 25,
        });

        doc.save("My_Orders_Report.pdf");
    };

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto mt-10 bg-white p-5 rounded shadow">
                <title>Pawmart-client - My orders</title>
                <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-500">No orders found.</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Buyer</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o, index) => (
                                        <tr key={o._id}>
                                            <td>{index + 1}</td>
                                            <td>{o.productName}</td>
                                            <td>{o.buyerName || user?.displayName || "Me"}</td>
                                            <td>${o.price}</td>
                                            <td>{o.quantity}</td>
                                            <td>{o.address}</td>
                                            <td>{o.phone}</td>
                                            <td>{o.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-center mt-6">
                            <button
                                onClick={handleDownloadReport}
                                className="btn btn-primary"
                            >
                                📄 Download Report (PDF)
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyOrdersPage;
