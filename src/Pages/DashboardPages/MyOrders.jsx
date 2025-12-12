import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import useAxios from "../../Hooks/AxiosHooks"
import { FiClock, FiDollarSign, FiHash, FiPackage, FiUser } from "react-icons/fi"
import { timeAgo } from "../../Components/TimeAgo"
import { Link } from "react-router"
import Spinner from "../../Loader/Spinner"
import { useQuery } from "@tanstack/react-query"

export default function MyOrders() {

    const { user } = useContext(AuthContext)
    const axios = useAxios()

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', user.uid],
        queryFn: async () => {
            const res = await axios.get(`/orders/${user.uid}`,
                {
                    headers: {
                        authorization: `bearer ${user.accessToken}`
                    }
                }
            )
            return res.data
        }
    })

    return (
        <div className={`mx-5 py-5 ${orders.length < 3 ? "h-screen" : ""}`}>
            <title>Dashboard | My Orders</title>
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">My Orders</h1>
            {
                isLoading ? <div className="mt-10"><Spinner /></div>
                    :

                    <div>
                        {
                            orders.length == 0 ?
                                <p className="text-center font-extralight italic mt-10">Make Your Order</p>
                                :
                                <div className="pt-10 grid grid-cols-1 gap-5">
                                    {
                                        orders.map((order, index) => {
                                            return (
                                                <div key={index}
                                                    className="rounded-2xl bg-orange-50 border-l-5 border-l-orange-500 shadow-sm p-6 
                                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
                                                        <span className="bg-linear-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">{order.foodName}
                                                        </span>
                                                    </h2>
                                                    <div className="grid grid-cols-1 gap-4 text-gray-700">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Order Status:</span>
                                                            <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-orange-100 text-orange-600">
                                                                {order.orderStatus}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Price:</span>
                                                            <span className="flex items-center gap-1 text-gray-900 font-semibold">
                                                                ৳{order.price}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Quantity:</span>
                                                            <span className="font-semibold">{order.quantity}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Ordered</span>
                                                            <span className="flex items-center gap-1 text-gray-900 font-semibold">
                                                                <FiClock className="text-orange-500" /> {timeAgo(order.orderTime)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Delivery Time:</span>
                                                            <span className="flex items-center gap-1 text-gray-900 font-semibold">
                                                                <FiClock className="text-orange-500" /> {order.deliveryTime}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Chef Name:</span>
                                                            <span className="flex items-center gap-1 font-semibold">
                                                                <FiUser className="text-orange-500" /> {order.chefName}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Chef ID:</span>
                                                            <span className="flex items-center gap-1 font-semibold">
                                                                <FiHash className="text-orange-500" /> {order.chefId}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">Payment Status:</span>
                                                            {
                                                                order.orderStatus === "Pending" ?
                                                                    <span className="px-3 py-1 rounded-lg shadow-sm bg-orange-200 text-gray-800 capitalize">
                                                                        {order.paymentStatus}
                                                                    </span> : (
                                                                        <span>
                                                                            {
                                                                                order.paymentStatus === "paid" ?
                                                                                    <button
                                                                                        className={`px-3 py-1 rounded-2xl shadow-sm  text-white capitalize
                                                                                bg-green-500`}>
                                                                                        Paid
                                                                                    </button>
                                                                                    :
                                                                                    <Link to={`/dashboard/payment/${order._id}`}
                                                                                        disabled={order.orderStatus === "Cancelled"}
                                                                                        className={`px-3 py-1 rounded-2xl shadow-sm  text-white capitalize
                                                            ${order.orderStatus === "Cancelled" ? "bg-gray-200 cursor-not-allowed" : "bg-orange-500 cursor-pointer"}`}>
                                                                                        Pay
                                                                                    </Link>
                                                                            }
                                                                        </span>
                                                                    )

                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    )
}