import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState("light");

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

            {/* MOBILE MENU (Hamburger) */}
            <div className="flex-none lg:hidden">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow dropdown-start"
                    >
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/pet-listings">Pets & Supplies</Link></li>
                        {user && (
                            <>
                                <li><Link to="/listings">Add Listing</Link></li>
                                <li><Link to="/my-listings">My Listings</Link></li>
                                <li><Link to="/my-orders">My Orders</Link></li>
                            </>
                        )}
                        {user && (
                            <li className="flex justify-center">
                                {/* 🌗 Dark/Light toggle for mobile */}
                                <button
                                    onClick={() =>
                                        setTheme(theme === "light" ? "dark" : "light")
                                    }
                                    className="btn btn-sm mb-1"
                                >
                                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                                </button>
                            </li>
                        )}
                        {user ? (
                            <li className="flex justify-center">
                                <button
                                    onClick={handleLogOut}
                                    className="btn btn-sm text-red-500"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/auth/login" className="btn btn-outline btn-sm w-full">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/auth/register" className="btn btn-primary btn-sm w-full text-white">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex justify-center flex-1">
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

            {/* RIGHT: Auth/Profile for Desktop */}
            <div className="hidden lg:flex items-center gap-3">
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
                            <li className="flex justify-center">
                                {/* 🌗 Dark/Light toggle for desktop */}
                                <button
                                    onClick={() =>
                                        setTheme(theme === "light" ? "dark" : "light")
                                    }
                                    className="btn btn-sm mb-1"
                                >
                                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                                </button>
                            </li>
                            <li className="flex justify-center">
                                <button onClick={handleLogOut} className="btn btn-sm text-red-500">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/auth/login"
                            className="btn btn-outline btn-sm btn-primary"
                        >
                            Login
                        </Link>
                        <Link
                            to="/auth/register"
                            className="btn btn-primary btn-sm text-white"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
