import { useQuery } from "@tanstack/react-query"
import useAxios from "../../Hooks/AxiosHooks"
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts"

export default function PlatformStat() {
    const axios = useAxios()

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('alluser')
            return res.data
        }
    })

    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axios.get('allorders')
            return res.data
        }
    })

    const { data: payments = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axios.get('payment')
            return res.data
        }
    })

    const totalUsers = users.length - 1

    const totalPaymentAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0)

    const ordersPending = orders.filter(o => o.orderStatus === "Pending").length
    const ordersDelivered = orders.filter(o => o.orderStatus === "Delivered").length

    const paymentChartData = [
        { name: "Total Payment", value: totalPaymentAmount }
    ]

    const orderStatusData = [
        { name: "Pending", value: ordersPending },
        { name: "Delivered", value: ordersDelivered }
    ]

    const COLORS = ["#f97316", "#10b981"]


    return (
        <div className="mx-5 py-5 space-y-10">
            <title>Dashboard | Platform</title>

            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-4 border-orange-500 shadow">
                Platform Statistics
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-5 bg-orange-50 shadow rounded-xl border-l-4 border-orange-500">
                    <h2 className="text-xl font-semibold">Total Users</h2>
                    <p className="text-3xl font-bold text-orange-500">{totalUsers}</p>
                </div>

                <div className="p-5 bg-green-50 shadow rounded-xl border-l-4 border-green-500">
                    <h2 className="text-xl font-semibold">Total Payment</h2>
                    <p className="text-3xl font-bold text-green-600">৳{totalPaymentAmount}</p>
                </div>

                <div className="p-5 bg-yellow-50 shadow rounded-xl border-l-4 border-yellow-500">
                    <h2 className="text-xl font-semibold">Pending Orders</h2>
                    <p className="text-3xl font-bold text-yellow-600">{ordersPending}</p>
                </div>

                <div className="p-5 bg-blue-50 shadow rounded-xl border-l-4 border-blue-500">
                    <h2 className="text-xl font-semibold">Delivered Orders</h2>
                    <p className="text-3xl font-bold text-blue-600">{ordersDelivered}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-white shadow-md rounded-xl p-5">
                    <h2 className="text-lg font-bold mb-4">Payment Overview</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={paymentChartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#f97316" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white shadow-md rounded-xl p-5">
                    <h2 className="text-lg font-bold mb-4">Order Status Distribution</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={orderStatusData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label
                            >
                                {orderStatusData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}
