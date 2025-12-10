import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import useAxios from "../../Hooks/AxiosHooks"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../../Loader/Spinner"
import { timeAgo } from "../../Components/TimeAgo"

export default function OrderReq() {
    const { user } = useContext(AuthContext)
    const axios = useAxios()

    const { data: chef = [], isLoading: personLoading } = useQuery({
        queryKey: ['chef', user.uid],
        queryFn: async () => {
            const res = await axios.get(`/user/${user.uid}`)
            return res.data
        }
    })

    const { data: orders = [], isLoading: orderLoading, refetch } = useQuery({
        queryKey: ['orders', chef.chefId],
        queryFn: async () => {
            const res = await axios.get(`/chef/order/${chef.chefId}`)
            return res.data
        }
    })

    const loading = personLoading || orderLoading


    const handleCancel = (id) => {
        axios.patch(`/order/status/${id}`, { orderStatus: "Cancelled" })
            .then(() => {
                refetch()
            })
    }
    const handleAccept = (id) => {
        axios.patch(`/order/status/${id}`, { orderStatus: "Accepted" })
            .then(() => {
                refetch()
            })
    }
    const handleDeliver = (id) => {
        axios.patch(`/order/status/${id}`, { orderStatus: "Delivered" })
            .then(() => {
                refetch()
            })
    }

    return (
        <div className="mx-5 py-5">
            <title>Dashboard | Order Request</title>
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">Order Request</h1>
            {
                loading ?
                    <div className="h-[50vh] flex justify-center items-center">
                        <Spinner />
                    </div>
                    : <div>
                        {
                            orders.length == 0 ?
                                <p className="text-center italic font-extralight mt-10">No Order Yet</p>
                                :
                                <div className="space-y-5 mt-10">
                                    {
                                        orders.map((order, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-white flex flex-col md:flex-row justify-between gap-2 items-start md:items-center border-l-4 border-orange-500 shadow-md rounded-xl p-5 hover:shadow-lg transition-all"
                                                >
                                                    <div className="">
                                                        <h2 className="text-xl font-bold text-gray-800">{order.foodName}</h2>

                                                        <div className="text-gray-700 space-y-2">
                                                            <p><span className="font-semibold">Price:</span> ${order.price}</p>
                                                            <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                                                            <p>
                                                                <span className="font-semibold">Status:</span>
                                                                <span className="ml-1 px-2 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
                                                                    {order.orderStatus}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-700 space-y-2">
                                                        <p><span className="font-semibold">Email:</span> {order.userEmail}</p>
                                                        <p><span className="font-semibold">Order Time:</span> {timeAgo(order.orderTime)}</p>
                                                        <p><span className="font-semibold">Address:</span> {order.userAddress}</p>
                                                        <p><span className="font-semibold">Payment:</span > <span className={`${order.paymentStatus === "paid" ? 'bg-green-100 text-green-500 font-semibold px-3 py-0.5 rounded-xl' : ''}`}>{order.paymentStatus}</span></p>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <button onClick={() => handleCancel(order._id)}
                                                            disabled={order.orderStatus == "Cancelled" || order.orderStatus === "Accepted" || order.orderStatus === "Delivered"}
                                                            className={`px-3 py-1 rounded-2xl text-center text-white font-semibold
                                                ${order.orderStatus === "Cancelled" || order.orderStatus === "Accepted" || order.orderStatus === "Delivered" ? "bg-gray-200 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`}>Cancel</button>

                                                        <button onClick={() => handleAccept(order._id)}
                                                            disabled={order.orderStatus == "Cancelled" || order.orderStatus === "Accepted" || order.orderStatus === "Delivered"}
                                                            className={`px-3 py-1 rounded-2xl text-center text-white font-semibold
                                                ${order.orderStatus === "Cancelled" || order.orderStatus === "Accepted" || order.orderStatus === "Delivered" ? "bg-gray-200 cursor-not-allowed" : "bg-orange-500 cursor-pointer"}`}>Accept</button>

                                                        <button onClick={() => handleDeliver(order._id)}
                                                            disabled={order.orderStatus == "Cancelled" || order.orderStatus === "Pending" || order.orderStatus === "Delivered"}
                                                            className={`px-3 py-1 rounded-2xl text-center text-white font-semibold
                                                ${order.orderStatus === "Cancelled" || order.orderStatus === "Pending" || order.orderStatus === "Delivered" ? "bg-gray-200 cursor-not-allowed" : "bg-black cursor-pointer"}`}>Deliver</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }</div>
            }
        </div>
    )
}