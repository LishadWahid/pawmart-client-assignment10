import React from "react";
import { Link } from "react-router";
import { FaInstagram, FaXTwitter, FaGithub, FaFacebook } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-12">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* --------- Column 1: Logo & Description --------- */}
                <div>
                    <Link to="/" className="text-3xl font-extrabold text-primary flex items-center gap-2">
                        🐾 PawMart
                    </Link>
                    <p className="mt-3 text-sm leading-relaxed">
                        PawMart connects local pet owners and buyers for adoption and pet care products.
                    </p>

                    <div className="flex gap-4 mt-4 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary"><FaFacebook /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary"><FaInstagram /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary"><FaXTwitter /></a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary"><FaGithub /></a>
                    </div>
                </div>

                {/* --------- Column 2: Useful Links --------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/pets" className="hover:text-primary">Pets & Supplies</Link></li>
                        <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                        <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* --------- Column 3: Contact Info --------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p>Email: <a href="mailto:support@pawmart.com" className="text-primary">support@pawmart.com</a></p>
                    <p>Phone: +880 1700 000 000</p>
                    <p>Location: Dhaka, Bangladesh</p>
                </div>
            </div>

            {/* --------- Bottom Bar --------- */}
            <div className="border-t border-base-300 text-center py-4 text-sm">
                © {new Date().getFullYear()} <span className="text-primary font-semibold">PawMart</span>. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
