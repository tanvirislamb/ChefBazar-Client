import { useContext } from "react";
import { FiHome, FiMenu } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { PiBowlFood, PiChefHatBold } from "react-icons/pi";
import { RiTruckLine } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import useAxios from "../Hooks/AxiosHooks";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaPlateWheat } from "react-icons/fa6";
import { BiEnvelope } from "react-icons/bi";
import { LuUserRoundPen } from "react-icons/lu";
import { FcStatistics } from "react-icons/fc";
import Footer from "../Components/Footer";

export default function Dashboard() {
    const closeDrawer = () => {
        const checkbox = document.getElementById("drawer-toggle");
        if (checkbox) checkbox.checked = false;
    };

    const { user } = useContext(AuthContext)
    const axios = useAxios()

    const { data: person = [], isloading } = useQuery({
        queryKey: ['person', user.uid],
        queryFn: async () => {
            const res = await axios.get(`/user/${user.uid}`)
            return res.data
        }
    })

    return (
        <div className="flex">
            <input type="checkbox" id="drawer-toggle" className="hidden peer" />
            <label
                htmlFor="drawer-toggle"
                className="
                    fixed inset-0 bg-black/40 z-30 hidden
                    peer-checked:block lg:hidden
                "
            ></label>
            <aside
                className="
                    fixed left-0 top-0 z-40 h-full bg-white shadow-md
                    w-64 -translate-x-full peer-checked:translate-x-0
                    transition-transform duration-300
                    lg:translate-x-0
                "
            >
                <div className="flex justify-center mt-10">
                    <div className="p-3 rounded-2xl shadow-md">
                        <PiChefHatBold className="text-7xl text-orange-500" />
                    </div>
                </div>

                <ul className="p-4 space-y-2">
                    <li>
                        <NavLink to='/'
                            onClick={closeDrawer}
                            className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                            <FiHome className="text-orange-500 text-xl" />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/profile'
                            onClick={closeDrawer}
                            className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                            <IoPerson className="text-orange-500 text-xl" />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    {
                        person.role == "user" &&
                        <ul className="space-y-2">
                            <li>
                                <NavLink to='/dashboard/myorders'
                                    onClick={closeDrawer}
                                    className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                    <RiTruckLine className="text-orange-500 text-xl" />
                                    <span>My Orders</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myreviews'
                                    onClick={closeDrawer}
                                    className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                    <MdOutlineModeComment className="text-orange-500 text-xl" />
                                    <span>My Reviews</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myfavmeals'
                                    onClick={closeDrawer}
                                    className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                    <FaRegHeart className="text-orange-500 text-xl" />
                                    <span>Favorite Meal</span>
                                </NavLink>
                            </li>
                        </ul>
                    }
                    {
                        person.role == "chef" &&
                        <ul>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink to='/dashboard/createmeals'
                                        onClick={closeDrawer}
                                        className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                        <FaPlateWheat className="text-orange-500 text-xl" />
                                        <span>Create meal</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/mymeals'
                                        onClick={closeDrawer}
                                        className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                        <PiBowlFood className="text-orange-500 text-xl" />
                                        <span>My Meals</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/orderrequest'
                                        onClick={closeDrawer}
                                        className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                        <BiEnvelope className="text-orange-500 text-xl" />
                                        <span>Order requests</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </ul>
                    }
                    {
                        person.role == "admin" &&
                        <ul>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink to='/dashboard/manageuser'
                                        onClick={closeDrawer}
                                        className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                        <LuUserRoundPen className="text-orange-500 text-xl" />
                                        <span>Manage User</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/managerequest'
                                        onClick={closeDrawer}
                                        className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                        <BiEnvelope className="text-orange-500 text-xl" />
                                        <span>Mange request</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/platformstatistics'
                                        onClick={closeDrawer}
                                        className={({ isActive }) => `flex items-center duration-300 gap-3 w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-orange-50 text-orange-500' : ''}`}>
                                        <FcStatistics className="text-orange-500 text-xl" />
                                        <span>Platform Statistics</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </ul>
                    }
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 min-h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="w-full py-3 flex items-center px-4 bg-white shadow sticky top-0 z-10">
                    <label
                        htmlFor="drawer-toggle"
                        className="lg:hidden p-2 rounded-md hover:bg-orange-100 cursor-pointer"
                    >
                        <FiMenu className="text-2xl text-orange-500" />
                    </label>
                    <Link to='/'
                        className="flex items-center gap-1">

                        <h1
                            className="text-2xl font-extrabold text-orange-500">
                            Chef<span className="text-black">Bazar</span> Dashboard</h1>
                    </Link>
                </nav>

                {/* Page Content */}
                <div className="w-full bg-white">
                    <div className="md:h-screen">
                        <Outlet />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
