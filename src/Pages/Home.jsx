import { useQuery } from "@tanstack/react-query";
import Banner from "../Components/Banner";
import useAxios from "../Hooks/AxiosHooks";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

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
            <Banner />
            <div className="mt-5 mx-4">
                <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-b-3 border-orange-500 drop-shadow-md">Our Latest Meals</h1>
                <div className="grid grid-cols-3 gap-6 justify-center max-w-[1200px] mx-auto my-10">
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
            </div>
        </div>
    )
}