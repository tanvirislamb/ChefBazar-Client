import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../Hooks/AxiosHooks";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";


export default function Register() {

    const { registerFuction, update, setUser } = useContext(AuthContext)
    const axios = useAxios()
    const location = useLocation()
    const navigate = useNavigate()

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit } = useForm()

    const handleRegister = (data) => {

        if (password !== confirm) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        const name = data.name
        const email = data.email
        const image = data.image
        const address = data.address


        registerFuction(email, password)
            .then(userData => {
                const user = userData.user
                const newUser = {
                    userId: user.uid,
                    name: name,
                    email: email,
                    photoURL: image,
                    address: address,
                    status: "active",
                    role: "user"
                }
                update({
                    displayName: name, photoURL: image
                })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: image })
                    })
                axios.post('/alluser', newUser)
                navigate(`${location.state ? location.state : '/'}`)
            })


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <title>ChefBazar | Register</title>
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Create an <span className="text-orange-500">Account</span>
                </h2>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            placeholder="Your Name"
                            className="w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="Email"
                            className="w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="text-gray-700 font-medium">
                            Profile Image (direct link)
                        </label>
                        <input
                            type="text"
                            {...register('image')}
                            className="w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="https://example.com/me.png"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-gray-700 font-medium">Address</label>
                        <input
                            type="text"
                            {...register('address')}
                            placeholder="Address"
                            className="w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className={`w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                                }`}
                            required
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm font-medium -mt-2">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Register
                    </button>

                </form>
                <div className="mt-5 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?
                        <Link
                            to='/login'
                            className="text-orange-500 font-semibold ml-1 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
