import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../Hooks/AxiosHooks";
import Swal from "sweetalert2";

export default function CreateMeals() {

    const axios = useAxios()

    const { user } = useContext(AuthContext)
    const [preview, setPreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleFile = (file) => {
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        setImageFile(file);
    }

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };



    const handleCreateMeal = async (e) => {
        e.preventDefault()
        setUploading(true)
        let imageURL = null

        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);

            const upload = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_API}`,
                formData
            )
            imageURL = upload.data.data.url;
        }

        const form = e.target
        const newMeals = {
            foodImage: imageURL,
            userId: user.uid,
            foodName: form.foodName.value,
            ingredients: form.ingredients.value
                .split(",")
                .map(item => item.trim()),
            chefName: form.chefName.value,
            price: form.price.value,
            rating: form.rating.value,
            deliveryArea: form.deliveryArea.value,
            estimatedDeliveryTime: form.deliveryTime.value,
            chefExperience: form.experience.value,
            chefId: form.chefId.value,
            chefEmail: user.email,
            date: new Date().toISOString()

        }

        axios.post('/meals', newMeals)
            .then(() => {
                setUploading(false)
                setPreview(null)
                Swal.fire({
                    title: "Meal added successfully!",
                    icon: "success",
                    draggable: true,
                    confirmButtonColor: '#f97316'
                });
            })
        form.reset()
    }

    return (
        <div className="mx-5 py-5">
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">Add Meals</h1>

            <div className="flex justify-center items-center">
                <form
                    onSubmit={handleCreateMeal}
                    className="max-w-5xl px-6 pt-10 pb-5 rounded-2xl space-y-5 shadow-md my-10 border-2 border-orange-500">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                        <div>
                            <label className="text-gray-700 font-medium">Food Image</label>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => document.getElementById("imageInput").click()}
                                className="w-full mt-1 p-6 border border-dashed rounded-xl bg-gray-100 dark:bg-gray-700 text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 duration-200"
                            >
                                {preview ? (
                                    <img src={preview} className="w-full h-60 object-cover rounded-xl" />
                                ) : (
                                    <p className="text-gray-500">Drag & Drop image here, or click to select</p>
                                )}
                            </div>

                            <input
                                type="file"
                                id="imageInput"
                                required
                                className="hidden"
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-gray-700 font-medium">Food Name</label>
                            <input type="text" name="foodName" required
                                placeholder="Pizza" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                            <label className="text-gray-700 font-medium">Chef Name</label>
                            <input type="text" name="chefName" required
                                placeholder="Chef name" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                            <label className="text-gray-700 font-medium">Price</label>
                            <input type="number" name="price" required
                                placeholder="350" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />
                        </div>
                    </div>

                    <label className="text-gray-700 font-medium">Rating</label>
                    <input type="number" name="rating" step="0.1" min="0" max="5" required
                        placeholder="4.5" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Ingredients</label>
                    <input type="text" name="ingredients" required
                        placeholder="Salt, Pepper, Chicken, Onion" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Delivery Area</label>
                    <input type="text" name="deliveryArea" required
                        placeholder="Bogura" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Estimated Delivery Time</label>
                    <input type="text" name="deliveryTime" required
                        placeholder="20 min" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Chef’s Experience</label>
                    <input type="text" name="experience" required
                        placeholder="10 years" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">Chef ID</label>
                    <input type="text" name="chefId" required
                        placeholder="CHEF1056" className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <label className="text-gray-700 font-medium">User Email</label>
                    <input type="text" name="email" value={user.email} className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner" />

                    <button type="submit" className="w-full py-2 mt-3 bg-orange-500 text-white text-center font-semibold rounded-2xl">
                        {
                            uploading ? <span className="loading loading-spinner loading-xs"></span>
                                : "Submit"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}