import { useState } from "react"
import { useLocation } from "react-router"
import useAxios from "../../Hooks/AxiosHooks";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function UpdateMeal() {

    const [updating, setUpdating] = useState(false)
    const location = useLocation();
    const meal = location.state;

    const axios = useAxios()

    const { register, handleSubmit } = useForm()

    const handleUpdateMeal = (data) => {
        setUpdating(true)

        const updatedData = {
            foodName: data.foodName,
            ingredients: data.ingredients
                .split(",")
                .map(item => item.trim()),
            chefName: data.chefName,
            price: data.price,
            rating: data.rating,
            deliveryArea: data.deliveryArea,
            estimatedDeliveryTime: data.deliveryTime,
            chefExperience: data.experience,
            chefId: data.chefId
        }
        axios.patch(`/chef/meal/${meal._id}`, updatedData)
            .then(() => {
                Swal.fire({
                    title: "Updated successfully!",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
                setUpdating(false)
            })
    }
    return (
        <div className="mx-5 py-5">
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">Update Meals</h1>

            <div className="flex justify-center items-center">
                <form
                    onSubmit={handleSubmit(handleUpdateMeal)}
                    className="max-w-5xl px-6 pt-10 pb-5 rounded-2xl space-y-5 shadow-md my-10 border-2 border-orange-500">

                    <div className="space-y-4">
                        <label className="text-gray-700 font-medium">Food Name</label>
                        <input type="text" {...register('foodName')} required defaultValue={meal.foodName}
                            placeholder="Pizza" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                        <label className="text-gray-700 font-medium">Chef Name</label>
                        <input type="text" {...register('chefName')} required defaultValue={meal.chefName}
                            placeholder="Chef name" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                        <label className="text-gray-700 font-medium">Price</label>
                        <input type="number" {...register('price')} required defaultValue={meal.price}
                            placeholder="350" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />
                    </div>

                    <label className="text-gray-700 font-medium">Rating</label>
                    <input type="number" {...register('rating')} step="0.1" min="0" max="5" required defaultValue={meal.rating}
                        placeholder="4.5" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Ingredients</label>
                    <input type="text" {...register('ingredients')} required defaultValue={meal.ingredients?.join(", ")}
                        placeholder="Salt, Pepper, Chicken, Onion" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Delivery Area</label>
                    <input type="text" {...register('deliveryArea')} required defaultValue={meal.deliveryArea}
                        placeholder="Bogura" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Estimated Delivery Time</label>
                    <input type="text" {...register('deliveryTime')} required defaultValue={meal.estimatedDeliveryTime}
                        placeholder="20 min" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Chef’s Experience</label>
                    <input type="text" {...register('experience')} required defaultValue={meal.chefExperience}
                        placeholder="10 years" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Chef ID</label>
                    <input type="text" {...register('chefId')} required defaultValue={meal.chefId}
                        placeholder="CHEF1056" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <button type="submit" className="w-full py-2 mt-3 bg-orange-500 text-white text-center font-semibold rounded-2xl cursor-pointer">
                        {
                            updating ? <span className="loading loading-spinner loading-xs"></span>
                                : "Submit"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}