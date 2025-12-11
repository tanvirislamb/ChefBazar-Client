import { useQuery } from "@tanstack/react-query";
import Banner from "../Components/Banner";
import useAxios from "../Hooks/AxiosHooks";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import Spinner from "../Loader/Spinner";
import CustomerReviewSlider from "../Components/CustomerReviewSlider";

export default function Home() {
    const axios = useAxios()
    const { data: latestData = [], isLoading } = useQuery({
        queryKey: ['latest'],
        queryFn: async () => {
            const res = await axios.get('/meals/limited')
            return res.data
        },
        staleTime: 1000 * 60,
    })
    return (
        <div>
            <title>ChefBazar | Home</title>
            <Banner />
            <div className="mt-5 mx-4">
                <h1 className="text-center font-bold text-2xl md:text-3xl w-full py-4 bg-gray-100 rounded-2xl border-b-3 border-orange-500 drop-shadow-md">Our Latest Meals</h1>
                {
                    isLoading ?
                        <div className="py-10"><Spinner /></div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-[1200px] mx-auto my-10">
                            {
                                latestData.map((latest, index) => {
                                    return (
                                        <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:-translate-y-3 duration-300">
                                            <div className="relative">
                                                <img src={latest.foodImage} alt="" className="w-full h-60 object-cover" />
                                                <div className="absolute top-2 left-2 bg-black/30 backdrop-blur-md text-white font-medium text-[12px] px-3 py-1 rounded-2xl">
                                                    <p><span className="text-orange-500 font-bold">Chef:</span> {latest.chefName}</p>
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-2">
                                                <h3 className="font-bold text-[18px]">{latest.foodName}</h3>
                                                <p className="font-semibold text-sm">{latest.price} <span className="text-orange-500">TK</span></p>
                                                <p className="flex items-center gap-1 font-light italic"><FaStar className="text-orange-500" />{latest.rating}</p>
                                                <div className="w-full flex justify-center mt-3">
                                                    <Link to={`/details/${latest._id}`}
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
            <CustomerReviewSlider />

            {/* Extra Section */}
            <div className="my-16 px-4">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">
                    Why Choose ChefBazar?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <svg className="w-12 h-12 text-orange-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 7l10 5-10 5-10-5 10-5z" />
                        </svg>
                        <h3 className="font-bold text-lg mb-2">Fresh Ingredients</h3>
                        <p className="text-gray-600 text-center text-sm">
                            We use only the freshest ingredients to make every meal delicious.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <svg className="w-12 h-12 text-orange-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14H11v-2h2zm0-4H11V7h2z" />
                        </svg>
                        <h3 className="font-bold text-lg mb-2">Quick Delivery</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Get your favorite meals delivered to your door in no time.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <svg className="w-12 h-12 text-orange-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 15h2v-2h-2zm0-4h2V7h-2z" />
                        </svg>
                        <h3 className="font-bold text-lg mb-2">Expert Chefs</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Our meals are prepared by experienced chefs who love cooking.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <svg className="w-12 h-12 text-orange-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 12h20L12 2zm0 5l7 7H5l7-7z" />
                        </svg>
                        <h3 className="font-bold text-lg mb-2">Affordable Prices</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Enjoy delicious meals without breaking your budget.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}