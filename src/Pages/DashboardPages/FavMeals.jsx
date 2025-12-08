import { useContext } from "react"
import useAxios from "../../Hooks/AxiosHooks"
import { AuthContext } from "../../Provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { timeAgo } from "../../Components/TimeAgo"
import Swal from "sweetalert2"

export default function FavMeals() {

    const axios = useAxios()
    const { user } = useContext(AuthContext)

    const { data: favMeals = [], isLoading, refetch } = useQuery({
        queryKey: ["favMeals", user.uid],
        queryFn: async () => {
            const res = await axios.get(`/meals/favourite/${user.uid}`)
            return res.data
        }
    })

    const Handledelete = id => {
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
                axios.delete(`/meals/favourite/del/${id}`)
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
        <div className="mx-5 py-5">
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">My Favourite Meals</h1>
            <div>
                {
                    favMeals.length == 0 ?
                        <p className="text-center font-extralight text-gray-400 italic py-10">Add you Favourite Melas</p>
                        :
                        (
                            <div className="overflow-x-auto py-10">
                                <table className="table min-w-max">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Nmae</th>
                                            <th>ChefName</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            favMeals.map((fav, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        <img
                                                                            src={fav.foodImage} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p>{fav.foodName}</p>
                                                        </td>
                                                        <td>{fav.chefName}</td>
                                                        <td>{timeAgo(fav.date)}</td>
                                                        <th>
                                                            <button
                                                                onClick={() => Handledelete(fav._id)}
                                                                className="px-3 py-1 rounded-xl bg-red-600 text-white font-semibold cursor-pointer">Delete</button>
                                                        </th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </div>
        </div>
    )
}