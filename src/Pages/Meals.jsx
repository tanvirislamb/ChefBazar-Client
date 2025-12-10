import { useQuery } from "@tanstack/react-query"
import useAxios from "../Hooks/AxiosHooks"
import { FaStar } from "react-icons/fa"
import { Link } from "react-router"
import { useMemo, useState } from "react"
import Spinner from "../Loader/Spinner"

export default function Meals() {

    const axios = useAxios()
    const [sortOrder, setSortOrder] = useState('')

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axios.get('/meals')
            return res.data
        },
        staleTime: 1000 * 60
    })

    const sortedMeals = useMemo(() => {
        if (sortOrder === 'low') {
            return [...meals].sort((a, b) => a.price - b.price)
        }
        if (sortOrder === 'high') {
            return [...meals].sort((a, b) => b.price - a.price)
        }
        return meals
    }, [meals, sortOrder])

    return (
        <div className="m-5">
            <title>ChefBazar | Meals</title>
            <h1 className="text-center font-bold text-2xl md:text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md my-5">Explore Our All Meals</h1>
            <div className="w-full flex justify-between items-center border-b-2 border-orange-500 mt-10 pb-3">
                <h3 className="text-xl font-bold">Meals Found {meals.length}</h3>
                <select
                    className="border rounded-2xl px-3 py-1 font-medium text-orange-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                </select>
            </div>
            <div>
                {
                    isLoading ? <div className="py-10"><Spinner /></div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-[1600px] mx-auto">
                            {
                                sortedMeals.map((meal, index) => {
                                    return (
                                        <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:-translate-y-3 duration-300">
                                            <div className="relative">
                                                <img src={meal.foodImage} alt="" className="w-full h-60 object-cover" />
                                                <div className="absolute top-2 left-2 bg-black/30 backdrop-blur-md text-white font-medium text-[12px] px-3 py-1 rounded-2xl">
                                                    <p><span className="text-orange-500 font-bold">Chef:</span> {meal.chefName}</p>
                                                    <p><span className="text-orange-500 font-bold">ID:</span> {meal.chefId}</p>
                                                </div>
                                                <p className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md"><FaStar />{meal.rating}</p>
                                            </div>
                                            <div className="p-4 space-y-2">
                                                <h3 className="font-bold text-[18px]">{meal.foodName}</h3>
                                                <p className="font-semibold text-sm">{meal.price} <span className="text-orange-500">TK</span></p>
                                                <div className="font-bold text-sm bg-orange-100 px-3 py-1 rounded-2xl w-fit">Delivery Area: <span className="text-orange-600">{meal.deliveryArea}</span></div>
                                                <div className="w-full flex justify-center mt-3">
                                                    <Link to={`/details/${meal._id}`}
                                                        className="w-full py-1 rounded-2xl bg-orange-500 text-white font-bold text-center">
                                                        Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}