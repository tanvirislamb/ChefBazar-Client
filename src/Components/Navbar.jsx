import { useContext } from "react";
import { PiChefHatBold } from "react-icons/pi";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)

    return (
        <nav className="flex justify-between items-center px-10 py-3 rounded-b-xl shadow border-b border-gray-200 sticky top-0 z-10 bg-white">
            <Link to='/'
                className="flex items-center gap-1">
                <PiChefHatBold className="text-3xl text-orange-500" />
                <h1
                    className="text-2xl font-extrabold text-orange-500">
                    Chef<span className="text-black">Bazar</span></h1>
            </Link>
            <div className="flex items-center gap-4 font-semibold">
                <NavLink to='/'
                    className={({ isActive }) => `${isActive ? 'font-bold bg-orange-500 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Home</NavLink>
                <NavLink to='/meals'
                    className={({ isActive }) => `${isActive ? 'font-bold bg-orange-500 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Meals</NavLink>
                {
                    user && <NavLink to='/dashboard'
                        className={({ isActive }) => `${isActive ? 'font-bold bg-orange-500 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Dashboard</NavLink>
                }
            </div>
            <div>
                {
                    user ?
                        (
                            <div className="flex items-center gap-4">
                                <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full object-cover" />
                                <button
                                    onClick={logout}
                                    className="px-3 py-1 rounded-xl bg-orange-500 text-white font-semibold">Log Out</button>
                            </div>
                        )
                        : (
                            <div className="flex items-center gap-4 text-white font-semibold">
                                <Link to='/login'
                                    className="px-3 py-1 rounded-xl bg-orange-500">
                                    Log In
                                </Link>
                                <Link to='/register'
                                    className="px-3 py-1 rounded-xl bg-orange-500">
                                    Register
                                </Link>
                            </div>
                        )
                }
            </div>

        </nav>
    )
}