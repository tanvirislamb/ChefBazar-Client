import { useLocation } from "react-router";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import useAxios from "../Hooks/AxiosHooks";

export default function Order() {
    const location = useLocation();
    const { meal } = location.state || {};
    const { user } = useContext(AuthContext);
    const axios = useAxios();

    const [quantity, setQuantity] = useState(1);
    const [userAddress, setUserAddress] = useState("");

    if (!meal) return <p>No meal selected!</p>;

    const totalPrice = meal.price * quantity;

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        // Show confirmation for place ordering
        const result = await Swal.fire({
            title: `Your total price is ${totalPrice} TK.`,
            text: "Do you want to confirm the order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#d1d5db",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const orderData = {
                foodName: meal.foodName,
                price: meal.price,
                quantity,
                chefId: meal.chefId,
                userEmail: user.email,
                userAddress,
                orderStatus: "pending",
                orderTime: new Date().toISOString()
            };

            try {
                await axios.post("/orders", orderData);

                Swal.fire({
                    title: "Order placed successfully!",
                    icon: "success",
                    confirmButtonColor: "#f97316"
                });
            } catch (error) {
                Swal.fire({
                    title: "Failed to place order",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#f97316"
                });
            }
        }
    };

    return (
        <div className="bg-gray-50 h-screen">
            <div className="p-5 max-w-lg mx-auto">
                <h1 className="text-3xl font-bold mb-5 text-orange-500">Order Your Meal</h1>
                <form onSubmit={handleConfirmOrder} className="space-y-4 bg-white p-5 rounded-xl shadow-md">
                    {/* Meal Name */}
                    <div>
                        <label className="font-semibold">Meal Name</label>
                        <input
                            type="text"
                            value={meal.foodName}
                            readOnly
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="font-semibold">Price (per unit)</label>
                        <input
                            type="number"
                            value={meal.price}
                            readOnly
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="font-semibold">Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner"
                        />
                    </div>

                    {/* Chef ID */}
                    <div>
                        <label className="font-semibold">Chef ID</label>
                        <input
                            type="text"
                            value={meal.chefId}
                            readOnly
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner"
                        />
                    </div>

                    {/* User Email */}
                    <div>
                        <label className="font-semibold">Your Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner"
                        />
                    </div>

                    {/* User Address */}
                    <div>
                        <label className="font-semibold">Delivery Address</label>
                        <input
                            type="text"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 shadow-inner"
                            placeholder="Enter your delivery address"
                        />
                    </div>

                    {/* Confirm Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
                    >
                        Confirm Order
                    </button>
                </form>
            </div>
        </div>
    );
}
