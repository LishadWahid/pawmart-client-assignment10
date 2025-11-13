import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState("light");

    // Apply theme change
    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleLogOut = () => {
        logOut()
            .then(() => alert("You Logged Out successfully"))
            .catch((error) => console.log(error));
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-6 justify-between">
            {/* LEFT: Logo */}
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    PawMart
                </Link>
            </div>

            {/* CENTER: Menu */}
            <div className="flex justify-center flex-1">
                <ul className="menu menu-horizontal text-center gap-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pet-listings">Pets & Supplies</Link></li>

                    {user && (
                        <>
                            <li><Link to="/listings">Add Listing</Link></li>
                            <li><Link to="/my-listings">My Listings</Link></li>
                            <li><Link to="/my-orders">My Orders</Link></li>
                        </>
                    )}
                </ul>
            </div>

            {/* RIGHT: Auth / Profile / Theme Toggle */}
            <div className="flex items-center gap-3">
                {/* 🌗 Simple Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="btn btn-sm"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li><button onClick={handleLogOut} className="text-red-500">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/auth/login" className="btn btn-outline btn-sm btn-primary">Login</Link>
                        <Link to="/auth/register" className="btn btn-primary btn-sm text-white">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
