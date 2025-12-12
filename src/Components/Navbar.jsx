import { useContext } from "react";
import { PiChefHatBold } from "react-icons/pi";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { LuMenu } from "react-icons/lu";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)

    return (
        <nav className="flex justify-between items-center px-5 md:px-10 py-3 rounded-b-xl shadow border-b border-gray-200 sticky top-0 z-10 bg-white">
            <div className="flex items-center gap-2">
                <div className="flex md:hidden items-center">
                    <button popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
                        <LuMenu className="text-2xl text-orange-500"></LuMenu>
                    </button>

                    <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                        popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
                        <li><Link to='/'><a>Home</a></Link></li>
                        <li><Link to='/meals'><a>Meals</a></Link></li>
                        <li><Link to='/dashboard/profile'><a>Dashboard</a></Link></li>
                    </ul>
                </div>
                <Link to='/'
                    className="flex items-center gap-1">
                    <PiChefHatBold className="text-3xl text-orange-500" />
                    <h1
                        className="text-2xl font-extrabold text-orange-500">
                        Chef<span className="text-black">Bazar</span></h1>
                </Link>
            </div>
            <div className="hidden md:flex items-center gap-4 font-semibold">
                <NavLink to='/'
                    className={({ isActive }) => `${isActive ? 'font-bold bg-orange-500 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Home</NavLink>
                <NavLink to='/meals'
                    className={({ isActive }) => `${isActive ? 'font-bold bg-orange-500 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Meals</NavLink>
                {
                    user && <NavLink to='/dashboard/profile'
                        className={({ isActive }) => `${isActive ? 'font-bold bg-orange-500 text-white shadow-md rounded-2xl px-3 py-1' : ''}`}>Dashboard</NavLink>
                }
            </div>
            <div>
                {
                    user ?
                        (
                            <div className="relative flex items-center gap-4">
                                <div className="peer cursor-pointer">
                                    <img src={user.photoURL} alt="" className="w-7 md:w-9 h-7 md:h-9 rounded-full object-cover" />
                                </div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 
                                              bg-gray-800 text-white text-sm rounded-md px-3 py-1 
                                                opacity-0 peer-hover:opacity-100 
                                                transition-opacity duration-200 whitespace-nowrap shadow-lg pointer-events-none">
                                    {user.displayName}
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1 rounded-2xl bg-orange-500 text-xs md:text-base text-white font-semibold cursor-pointer">Log Out</button>
                            </div>
                        )
                        : (
                            <div className="flex items-center gap-4 text-white text-xs md:text-base font-semibold">
                                <Link to='/login'
                                    className="px-3 py-1 rounded-2xl bg-orange-500 cursor-pointer">
                                    Log In
                                </Link>
                                <Link to='/register'
                                    className="px-3 py-1 rounded-2xl bg-orange-500 cursor-pointer">
                                    Register
                                </Link>
                            </div>
                        )
                }
            </div>

        </nav>
    )
}