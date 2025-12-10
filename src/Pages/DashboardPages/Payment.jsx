import { useParams } from "react-router"
import useAxios from "../../Hooks/AxiosHooks"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../Loader/Loader"

export default function Payment() {
    const axios = useAxios()
    const { id } = useParams()

    const { data: order = [], isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axios.get(`/orders/pay/${id}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    const total = order.price * order.quantity

    const handlepayment = async () => {
        const paymentInfo = {
            total: total,
            foodName: order.foodName,
            orderId: order._id,
            userEmail: order.userEmail
        }
        const res = await axios.post('/create-checkout-session', paymentInfo)
        window.location.assign(res.data.url)
    }

    return (
        <div>
            <title>Dashboard | Payment</title>
            <div className="flex items-center justify-center py-10">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 w-full mx-5 py-5 px-4 shadow-md rounded-2xl bg-orange-50 border-l-5 border-orange-500">
                    <h3 className="text-2xl font-bold">{order.foodName}</h3>
                    <p className="font-semibold">Price: <span className="text-orange-500">{order.price}</span> TK</p>
                    <p className="font-semibold">Quantity: <span className="text-orange-500">{order.quantity}</span></p>
                    <p className="font-semibold">Total: <span className="text-orange-500">{total}</span>TK</p>
                    <button onClick={handlepayment} className="text-white text-center px-3 py-2 rounded-2xl bg-orange-500 cursor-pointer">Pay</button>
                </div>
            </div>
        </div>
    )
}