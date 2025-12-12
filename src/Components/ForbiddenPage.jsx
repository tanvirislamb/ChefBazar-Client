import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";

export default function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
                <FiAlertTriangle className="text-orange-500 text-8xl mx-auto mb-6" />
                <h1 className="text-5xl font-bold text-gray-900 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Forbidden Access</h2>
                <p className="text-gray-500 mb-6">
                    You don’t have permission to access this page.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
