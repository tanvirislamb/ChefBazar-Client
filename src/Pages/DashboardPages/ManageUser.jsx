import { useQuery } from "@tanstack/react-query"
import useAxios from "../../Hooks/AxiosHooks"
import Spinner from "../../Loader/Spinner"
import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import Swal from "sweetalert2"

export default function ManageUser() {

    const { user } = useContext(AuthContext)

    const axios = useAxios()
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('/alluser')
            return res.data
        }
    })

    const handleStatus = (id) => {
        axios.patch(`/user/status/${id}`, { status: "fraud" })
            .then(() => {
                Swal.fire({
                    title: "Fraud!",
                    text: "Updated successfully!",
                    icon: "success"
                });
                refetch()
            })
    }

    return (
        <div className="mx-5 py-5">
             <title>Dashboard | Manage User</title>
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">All User</h1>
            <div>
                {
                    isLoading ? <div className="mt-10"><Spinner /></div>
                        :
                        <div className="my-10">
                            <div className="overflow-x-auto w-full">
                                <table className="w-full border-collapse rounded-2xl overflow-hidden">
                                    <thead className="bg-gray-100 text-left">
                                        <tr>
                                            <th className="p-3">#</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.map((person, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>

                                                <td className="p-3">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={person.photoURL}
                                                            className="object-cover rounded-2xl h-12 w-12"
                                                        />
                                                        <span className="font-semibold">{person.name}</span>
                                                    </div>
                                                </td>

                                                <td className="p-3">{person.email}</td>

                                                <td className="p-3">{person.role}</td>

                                                <td className="p-3 font-semibold">{person.status}</td>

                                                <td className="p-3">
                                                    {
                                                        person.role !== "admin" && <button
                                                            onClick={() => handleStatus(person.userId)}
                                                            disabled={person.status === "fraud"}
                                                            className={`px-3 py-1 rounded-md text-white font-medium ${person.status === "fraud"
                                                                ? "bg-gray-300 cursor-not-allowed"
                                                                : "bg-black cursor-pointer"
                                                                }`}>
                                                            Make Fraud
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                }
            </div>
        </div>
    )
}