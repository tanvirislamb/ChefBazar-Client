import { useContext } from "react"
import useAxios from "../../Hooks/AxiosHooks"
import { AuthContext } from "../../Provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import { FaStar } from "react-icons/fa"
import Swal from "sweetalert2"
import Spinner from "../../Loader/Spinner"

export default function MyMeals() {

    const axios = useAxios()
    const { user } = useContext(AuthContext)

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ["meals", user.uid],
        queryFn: async () => {
            const res = await axios.get(`/chef/meals/${user.uid}`,
                {
                    headers: {
                        authorization: `bearer ${user.accessToken}`
                    }
                }
            )
            return res.data
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "After Delete You Can't Revert It!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/chef/meal/delete/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Deleted successfully!",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        })
    }

    return (
        <div className={`mx-5 py-5 ${meals.length < 6 ? "h-screen" : ""}`}>
            <title>Dashboard | My Meals</title>
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">All My Meals</h1>
            {
                isLoading ? <div className="my-10"><Spinner /></div>
                    :
                    <div>
                        {
                            meals.length == 0 ?
                                <p className="text-center font-extralight italic mt-10">Create Your Meals</p>
                                : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
                                        {
                                            meals.map((meal, index) => {
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
                                                            <div className="flex flex-col md:flex-row md:justify-between items-start">
                                                                <div className="p-4 space-y-2">
                                                                    <h3 className="font-bold text-[18px]">{meal.foodName}</h3>
                                                                    <p className="font-semibold text-sm">{meal.price} <span className="text-orange-500">TK</span></p>
                                                                    <div className="font-bold text-sm bg-orange-100 px-3 py-1 rounded-2xl w-fit">Delivery Area:
                                                                        <span className="text-orange-600"> {meal.deliveryArea}</span>
                                                                    </div>
                                                                    <div className="font-bold text-sm bg-orange-100 px-3 py-1 rounded-2xl w-fit">Delivery Time:
                                                                        <span className="text-orange-600"> {meal.estimatedDeliveryTime}</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h2 className="text-2xl font-bold text-orange-500 mb-3">
                                                                        🥗 Ingredients
                                                                    </h2>
                                                                    <ul className="list-disc ml-6 text-gray-800">
                                                                        {meal.ingredients?.map((item, idx) => (
                                                                            <li key={idx} className="font-medium">{item}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="w-full flex justify-center gap-4 mt-3">
                                                                <button
                                                                    onClick={() => handleDelete(meal._id)}
                                                                    className="w-full py-1 rounded-2xl bg-red-500 text-white font-bold text-center cursor-pointer">Delete</button>
                                                                <Link to={'/dashboard/update'}
                                                                    state={meal}
                                                                    className="w-full py-1 rounded-2xl bg-orange-500 text-white font-bold text-center">
                                                                    Update
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>
            }
        </div>
    )
}