import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import useAxios from "../../Hooks/AxiosHooks"
import { timeAgo } from "../../Components/TimeAgo"
import { useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import UpdateModal from "../../Components/UpdateModal"

export default function MyReviews() {

    const { user } = useContext(AuthContext)
    const axios = useAxios()

    const [reviewModal, setReviewModal] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null);

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews', user.uid],
        queryFn: async () => {
            const res = await axios.get(`/myreview/${user.uid}`,
                {
                    headers: {
                        authorization: `bearer ${user.accessToken}`
                    }
                }
            )
            return res.data
        }
    })

    const reviewDelete = (id) => {
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
                axios.delete(`/myreview/delete/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });
    }

    return (
        <div className={`mx-5 py-5 ${reviews.length < 3 ? "h-screen" : ""}`}>
            <title>Dashboard | My Reviews</title>
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">My Reviews</h1>
            <div>
                {
                    reviews.length == 0 ?
                        <p className="text-center font-extralight italic mt-10">Make Some Reviews</p>
                        :
                        <div>
                            {
                                reviews.map((review, index) => {
                                    return (
                                        <div key={index}
                                            className="bg-orange-50 rounded-2xl shadow-sm p-6 border-l-5 border-orange-500 
                                                          hover:shadow-xl hover:-translate-y-1 transition-all duration-300 my-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    <span className="bg-linear-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                                                        {review.foodName}
                                                    </span>
                                                </h2>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i}
                                                            className={`w-5 h-5 ${i < review.rating ? "text-orange-500" : "text-gray-300"}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.173c.969 0 1.372 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.378-2.454a1 1 0 00-1.175 0L5.02 18.05c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L1.026 9.394c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.967z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                {review.comment}
                                            </p>
                                            <p className="text-sm text-gray-500 italic mb-4">
                                                Commented: {timeAgo(review.date)}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => { setReviewModal(true); setSelectedReview(review) }}
                                                    className="px-4 py-2 rounded-lg border font-semibold bg-orange-500 text-white transition cursor-pointer">
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => { reviewDelete(review._id) }}
                                                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
            <UpdateModal
                isOpen={reviewModal}
                onClose={() => setReviewModal(false)}
                review={selectedReview}
                refetch={refetch}
            />
        </div>
    )
}