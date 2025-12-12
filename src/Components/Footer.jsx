// Footer.jsx
import React, { useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

export default function Footer() {
    const { user } = useContext(AuthContext)
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-bold text-orange-500 mb-4">ChefBazar</h2>
                    <p className="text-gray-300 text-sm">
                        Delicious meals delivered to your door. Fresh ingredients, expert chefs, and affordable prices.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="text-gray-300 hover:text-orange-500"><FaFacebookF /></a>
                        <a href="#" className="text-gray-300 hover:text-orange-500"><FaTwitter /></a>
                        <a href="#" className="text-gray-300 hover:text-orange-500"><FaInstagram /></a>
                        <a href="#" className="text-gray-300 hover:text-orange-500"><FaLinkedinIn /></a>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-lg font-bold mb-4 text-orange-500">Quick Links</h3>
                    <Link to='/' className="text-gray-300 hover:text-orange-500 mb-2">Home</Link>
                    <Link to='/meals' className="text-gray-300 hover:text-orange-500 mb-2">Meals</Link>
                    {
                        user && <Link to='/dashboard' className="text-gray-300 hover:text-orange-500 mb-2">Dashboard</Link>
                    }
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-lg font-bold mb-4 text-orange-500">Contact</h3>
                    <p className="text-gray-300 text-sm mb-2">123 Chef Street, Dhaka, Bangladesh</p>
                    <p className="text-gray-300 text-sm mb-2">Phone: +880 1234 567890</p>
                    <p className="text-gray-300 text-sm">Email: info@chefbazar.com</p>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-lg font-bold mb-4 text-orange-500">Working Hours</h3>
                    <p className="text-gray-300 text-sm mb-2">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-300 text-sm mb-2">Saturday: 10:00 AM - 6:00 PM</p>
                    <p className="text-gray-300 text-sm">Sunday: Closed</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} ChefBazar. All rights reserved.
            </div>
        </footer>
    );
}
