import { PiChefHatBold } from "react-icons/pi";
import { Link, NavLink } from "react-router";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-3 mt-3 mx-4 rounded-xl shadow-md border border-gray-200">
            <Link to='/'
                className="flex items-center gap-1">
                <PiChefHatBold className="text-3xl text-purple-800" />
                <h1
                    className="text-2xl font-extrabold bg-linear-to-br from-purple-500 to-purple-400 bg-clip-text text-transparent">
                    ChefBazar</h1>
            </Link>
            <div className="flex items-center gap-4 font-semibold">
                <NavLink to='/'
                    className={({ isActive }) => `${isActive ? 'font-bold bg-purple-400 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Home</NavLink>
                <NavLink to='/meals'
                    className={({ isActive }) => `${isActive ? 'font-bold bg-purple-400 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Meals</NavLink>
            </div>
            <div className="flex items-center gap-4 text-white font-semibold">
                <Link to='/login'
                    className="px-3 py-1 rounded-xl bg-linear-to-br from-purple-500 to-purple-400">
                    Log In
                </Link>
                <Link to='/register'
                    className="px-3 py-1 rounded-xl bg-linear-to-br from-purple-500 to-purple-400">
                    Register
                </Link>
            </div>
        </nav>
    )
}