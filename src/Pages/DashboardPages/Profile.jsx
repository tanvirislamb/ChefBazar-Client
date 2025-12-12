import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../../Hooks/AxiosHooks"
import Spinner from "../../Loader/Spinner"
import Swal from "sweetalert2"

export default function Profile() {
    const { user } = useContext(AuthContext)
    const axios = useAxios()

    const { data: loggedperson = [], isloading } = useQuery({
        queryKey: ['loggedperson', user.uid],
        queryFn: async () => {
            const res = await axios.get(`/user/${user.uid}`,
                {
                    headers: {
                        authorization: `bearer ${user.accessToken}`
                    }
                }
            )
            return res.data
        }
    })

    const handleBeChef = () => {
        const request = {
            photoURL: user.photoURL,
            userId: user.uid,
            userName: loggedperson.name,
            userEmail: user.email,
            requestType: "chef",
            requestStatus: "pending",
            requestTime: new Date().toISOString()
        }
        axios.post('/request', request)
            .then(() => {
                Swal.fire({
                    title: "Request Sent",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Request Already Sent",
                    icon: "warning",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
    }
    const handleBeAdmin = () => {
        const request = {
            photoURL: user.photoURL,
            userId: user.uid,
            userName: loggedperson.name,
            userEmail: user.email,
            requestType: "admin",
            requestStatus: "pending",
            requestTime: new Date().toISOString()
        }
        axios.post('/request', request)
            .then(() => {
                Swal.fire({
                    title: "Request Sent",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Request Already Sent",
                    icon: "warning",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
    }

    return (
        <div>
            <title>Dashboard | Profile</title>
            {
                isloading ? <Spinner></Spinner> :
                    <div className="pt-6 flex flex-col justify-center items-center bg-white h-screen">
                        <h1 className="text-3xl font-bold text-orange-500 mb-6">My Profile</h1>
                        <div className="md:shadow-md rounded-xl p-6 w-full md:w-[700px] md:border border-gray-100">
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    src={loggedperson.photoURL}
                                    alt="User"
                                    className="w-28 h-28 rounded-full object-cover shadow"
                                />
                                <h2 className="text-xl font-semibold">{loggedperson.name}</h2>
                                <p className="text-gray-500">{loggedperson.email}</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Address:</span>
                                    <span>{loggedperson.address || "Not Provided"}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-semibold">Role:</span>
                                    <span className="capitalize">{loggedperson.role}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-semibold">Status:</span>
                                    <span className="capitalize">{loggedperson.status}</span>
                                </div>
                                {loggedperson.role === "chef" && (
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Chef ID:</span>
                                        <span>{loggedperson.chefId}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 flex flex-col gap-3">
                                {loggedperson.role !== "chef" && loggedperson.role !== "admin" && (
                                    <button onClick={handleBeChef}
                                        className="w-full py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 cursor-pointer">
                                        Be a Chef
                                    </button>
                                )}

                                {loggedperson.role !== "admin" && (
                                    <button onClick={handleBeAdmin}
                                        className="w-full py-2 rounded-md border border-orange-500 text-orange-500 font-semibold hover:bg-orange-50">
                                        Be an Admin
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}