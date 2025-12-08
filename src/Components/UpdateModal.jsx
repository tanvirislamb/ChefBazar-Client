import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
import { useLocation } from "react-router";
import useAxios from "../Hooks/AxiosHooks";
import Swal from "sweetalert2";


export default function UpdateModal({ isOpen, onClose, review, refetch }) {
    const axios = useAxios()
    const location = useLocation();

    useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [location.pathname]);

    if (!isOpen) return null;

    const updateHandle = e => {
        e.preventDefault()

        const form = e.target
        const comment = form.comment.value
        const rating = form.rating.value

        axios.patch(`/myreview/update/${review._id}`, {
            comment: comment, rating: rating
        })
            .then(() => {
                Swal.fire({
                    title: "Review Updated!",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
                refetch()
            })

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end md:items-center justify-center z-50 duration-300">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 w-full md:w-[450px] md:translate-y-0 rounded-t-2xl md:rounded-2xl p-3 animate-slideUp">

                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                        Update Your Review
                    </h2>
                    <button
                        onClick={onClose}
                        className="px-4 py-1 rounded-2xl cursor-pointer bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                    >
                        <RxCross2 />
                    </button>
                </div>
                <form onSubmit={updateHandle} className="space-y-4">
                    <input type="text" name="comment" defaultValue={review.comment} className="w-full px-3 py-2 bg-gray-50 shadow-inner rounded-2xl" />
                    <input type="text" name="rating" defaultValue={review.rating} className="w-full px-3 py-2 bg-gray-50 shadow-inner rounded-2xl" />
                    <button type="submit" className="text-center text-white font-semibold cursor-pointer w-full py-2 rounded-2xl bg-orange-500">Update Review</button>
                </form>
            </div>
        </div>
    )
}