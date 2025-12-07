import { useEffect, useState } from "react"
import { useParams } from "react-router"
import useAxios from "../Hooks/AxiosHooks"
import Spinner from "../Loader/Spinner"
import { FaStar } from "react-icons/fa"

export default function Details() {
    const { id } = useParams()
    const axios = useAxios()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`/details/${id}`)
            .then((res) => {
                setData(res.data)
            })
        setLoading(false)
    }, [id])
    return (
        <div>
            {
                loading ?
                    <div className="h-[90vh] flex justify-center items-center">
                        <Spinner />
                    </div>
                    :
                    (
                        <div className="px-5 md:px-16 py-10">
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <img src={data.foodImage} alt={data.foodName}
                                    className="w-full h-[350px] md:h-150 object-cover"
                                />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-2">{data.foodName}</h1>
                            <p className="text-xl font-semibold">
                                {data.price} <span className="text-orange-500">TK</span>
                            </p>
                            <p className="mt-2 font-medium flex items-center gap-1">
                                <FaStar className="text-orange-500" /> {data.rating} / 5
                            </p>
                            <hr className="my-6 border-orange-500" />
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-xl shadow-md">
                                <h2 className="text-2xl font-bold text-orange-500 mb-2">
                                    👨‍🍳 Chef Information
                                </h2>

                                <p className="font-medium">
                                    <span className="font-bold">Chef Name:</span> {data.chefName}
                                </p>
                                <p className="font-medium">
                                    <span className="font-bold">Experience:</span> {data.chefExperience}
                                </p>
                                <p className="font-medium">
                                    <span className="font-bold">Chef ID:</span> {data.chefId}
                                </p>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-orange-500 mb-3">
                                    🥗 Ingredients
                                </h2>
                                <ul className="list-disc ml-6 text-gray-800">
                                    {data.ingredients?.map((item, idx) => (
                                        <li key={idx} className="font-medium">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 p-5 rounded-xl bg-gray-100 shadow-sm">
                                <h2 className="text-2xl font-bold text-orange-500 mb-3">
                                    🚚 Delivery Information
                                </h2>

                                <p className="font-medium">
                                    <span className="font-bold">Delivery Area:</span> {data.deliveryArea}
                                </p>
                                <p className="font-medium">
                                    <span className="font-bold">Estimated Time:</span> {data.estimatedDeliveryTime}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-6">
                                Added on: {new Date(data.date).toLocaleDateString()}
                            </p>
                        </div>
                    )
            }
        </div>
    )
}