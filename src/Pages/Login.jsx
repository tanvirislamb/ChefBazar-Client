import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

export default function Login() {

    const { logIn } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!password.trim()) {
            setError("Password cannot be empty!");
            return;
        }

        setError("");
        const form = e.target
        const email = form.email.value

        logIn(email, password)
            .then(() =>
                navigate(`${location.state ? location.state : '/'}`)
            )
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <title>ChefBazar | Login</title>
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome <span className="text-orange-500">Back</span>
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            className={`w-full mt-1 px-4 py-2 bg-gray-100 shadow-inner rounded-lg outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                                }`}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-500 text-sm font-medium -mt-2">{error}</p>}

                    {/* Login button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Login
                    </button>

                </form>

                {/* Extra Links */}
                <div className="mt-5 text-center text-sm">
                    <p className="text-gray-600">
                        Don't have an account?
                        <Link to='/register' className="text-orange-500 font-semibold ml-1 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
