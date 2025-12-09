import { useQuery } from "@tanstack/react-query"
import useAxios from "../../Hooks/AxiosHooks"
import Spinner from "../../Loader/Spinner"

export default function ManageUser() {

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
                refetch()
            })
    }

    return (
        <div className="mx-5 py-5">
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">All User</h1>
            <div>
                {
                    isLoading ? <div className="mt-10"><Spinner /></div>
                        :
                        <div className="my-10">
                            <div className="overflow-x-auto">
                                <table className="table">

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((person, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        <img
                                                                            src={person.photoURL}
                                                                            alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{person.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {person.email}
                                                        </td>
                                                        <td>{person.role}</td>
                                                        <th>
                                                            {person.status}
                                                        </th>
                                                        <td>
                                                            <button
                                                                onClick={() => { handleStatus(person.userId) }}
                                                                disabled={person.status === "fraud"}
                                                                className={`px-2 py-1 rounded-md text-white font-semibold ${person.status === "fraud" ? "bg-gray-200 cursor-not-allowed" : "bg-black cursor-pointer"}`}>Make Fraud</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}