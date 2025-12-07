import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import useAxios from "../Hooks/AxiosHooks"
import Spinner from "../Loader/Spinner"
import { FaStar } from "react-icons/fa"
import { AuthContext } from "../Provider/AuthProvider"
import rating from "daisyui/components/rating"
import { timeAgo } from "../Components/TimeAgo"
import Swal from "sweetalert2"

export default function Details() {
    const { id } = useParams()
    const axios = useAxios()
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState([])

    useEffect(() => {
        axios.get(`/details/${id}`)
            .then((res) => {
                setData(res.data)
            })
        setLoading(false)
    }, [id])
    useEffect(() => {
        axios.get(`/review/${id}`)
            .then(res => {
                setReviews(res.data)
            })
    }, [id])

    const handleReview = (e) => {
        e.preventDefault()
        const form = e.target
        const comment = form.comment.value
        const newReview = {
            foodId: id,
            userName: user.displayName,
            photoURL: user.photoURL,
            comment: comment,
            rating: rating,
            date: new Date().toISOString()
        }
        axios.post('/review', newReview)
        setReviews((prev) => [...prev, newReview])
        Swal.fire({
            title: "Review submitted successfully!",
            icon: "success",
            draggable: true,
            confirmButtonColor: '#f97316'
        });
        form.reset()
    }

    const handleFavourite = () => {
        const favourite = {
            foodId: id,
            userEmail: user.email,
            userId: user.uid,
            userName: user.displayName,
            chefId: data.chedId,
            chefNmae: data.chefName,
            date: new Date().toISOString()

        }
        axios.post('/meals/favourite', favourite)
            .then(() => {
                Swal.fire({
                    title: "Added to Favourite successfully!",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "This meal already exist in you Favourite items",
                    icon: "warning",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
    }

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
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Link to="/order"
                                    state={{ meal: data }}
                                    className="flex-1 py-2 rounded-2xl bg-orange-500 text-white text-center font-bold hover:bg-orange-600 transition"
                                >
                                    Order Now
                                </Link>

                                <button
                                    className="flex-1 py-2 rounded-2xl border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-50 transition"
                                    onClick={handleFavourite}
                                >
                                    Add to Favourite
                                </button>
                            </div>
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
                            <h2 className="font-bold text-xl py-2 w-full border-b border-orange-500">Reviews</h2>
                            <div>
                                <div>
                                    {
                                        reviews.length == 0 ?
                                            <p className="text-center text-sm italic text-gray-400 py-6">Be the 1st reviewer</p>
                                            : (
                                                <div className="py-5 space-y-4">
                                                    {
                                                        reviews.map((review, index) => {
                                                            return (
                                                                <div key={index} className="flex items-start gap-2">
                                                                    <img src={review.photoURL} alt="" className="w-9 h-9 rounded-full object-cover" />
                                                                    <div className="bg-gray-100 rounded-2xl p-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <p className="font-bold">{review.userName}</p>
                                                                            <p className="text-[10px] text-gray-500">{timeAgo(review.date)}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <p className="text-sm">{review.comment}</p>
                                                                            <p className="text-xs text-gray-500"><span className="text-orange-500">★</span>{review.rating == 0 ? 0 : review.rating}/5</p>
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
                                <form onSubmit={handleReview}>
                                    <div className="flex justify-between items-center gap-3 py-5">
                                        <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full object-cover" />
                                        <input type="text" name="comment" required className="flex-1 px-3 py-2 w-full rounded-2xl bg-gray-100" placeholder="Leave a review" />
                                        <button type="submit" className="font-bold text-orange-500 cursor-pointer">Post</button>
                                    </div>
                                    <div className="flex items-center gap-2 pl-12 pb-4">
                                        <p className="font-medium text-gray-600">Rating:</p>

                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    type="button"
                                                    key={num}
                                                    onClick={() => setRating(num)}
                                                    className={`${rating >= num ? "text-orange-500" : "text-gray-300"} 
                                                    text-2xl transition`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>

                                        <span className="text-orange-500 font-semibold">
                                            {rating}/5
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}