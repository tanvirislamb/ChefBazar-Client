import { useQuery } from "@tanstack/react-query"
import useAxios from "../../Hooks/AxiosHooks"
import Spinner from "../../Loader/Spinner"
import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import Swal from "sweetalert2"
import { timeAgo } from "../../Components/TimeAgo"

export default function ManageReq() {

    const { user } = useContext(AuthContext)

    const axios = useAxios()
    const { data: requsers = [], isLoading, refetch } = useQuery({
        queryKey: ['requsers'],
        queryFn: async () => {
            const res = await axios.get('/request')
            return res.data
        }
    })

    const handleRole = (person) => {

        const generateChefId = () => {
            const random = Math.floor(1000 + Math.random() * 9000)
            return `CHEF${random}`
        };


        if (person.requestType === "admin") {
            axios.patch(`/user/role/${person.userId}`, { role: person.requestType })
                .then(() => {
                    axios.patch(`/request/status/${person._id}`, { requestStatus: "approved" })
                        .then(() => {
                            Swal.fire({
                                title: "Admin!",
                                text: "Updated successfully!",
                                icon: "success"
                            });
                            refetch()
                        })
                })
        } else {
            axios.patch(`/user/role/chef/${person.userId}`,
                { role: person.requestType, chefId: generateChefId() })
                .then(() => {
                    axios.patch(`/request/status/${person._id}`, { requestStatus: "approved" })
                        .then(() => {
                            Swal.fire({
                                title: "Chef!",
                                text: "Updated successfully!",
                                icon: "success"
                            });
                            refetch()
                        })
                })
        }
    }

    const handleCancel = (person) => {
        axios.patch(`/request/status/${person.userId}`, { requestStatus: "rejected" })
            .then(() => {
                Swal.fire({
                    title: "Cancled!",
                    text: "Canceled successfully!",
                    icon: "success"
                });
                refetch()
            })
    }

    return (
        <div className={`mx-5 py-5 ${requsers.length < 10 ? "h-screen" : ""}`}>
            <title>Dashboard | Manage Request</title>
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">All Request</h1>
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
                                            <th className="p-3">Request Type</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Request Time</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {requsers.map((person, index) => (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>

                                                <td className="p-3">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={person.photoURL}
                                                            className="object-cover rounded-2xl h-12 w-12"
                                                        />
                                                        <span className="font-semibold">{person.userName}</span>
                                                    </div>
                                                </td>

                                                <td className="p-3">{person.userEmail}</td>

                                                <td className="p-3">{person.requestType}</td>

                                                <td className="p-3 font-semibold">{person.requestStatus}</td>
                                                <td className="p-3 font-semibold">{timeAgo(person.requestTime)}</td>

                                                <td className="p-3 space-x-3">
                                                    <button
                                                        onClick={() => handleRole(person)}
                                                        disabled={person.requestStatus === "rejected" || person.requestStatus === "approved"}
                                                        className={`px-3 py-1 rounded-md text-white font-medium 
                                                            ${person.requestStatus === "rejected" || person.requestStatus === "approved"
                                                                ? "bg-gray-200 cursor-not-allowed"
                                                                : "bg-orange-500 cursor-pointer"
                                                            }`}>
                                                        Accept
                                                    </button>
                                                    <button onClick={() => handleCancel(person)}
                                                        disabled={person.requestStatus === "rejected" || person.requestStatus === "approved"}
                                                        className={`px-3 py-1 rounded-md text-white font-medium
                                                    ${person.requestStatus === "rejected" || person.requestStatus === "approved" ? "bg-gray-200 cursor-not-allowed" : "bg-black cursor-pointer"}`}>Reject</button>
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