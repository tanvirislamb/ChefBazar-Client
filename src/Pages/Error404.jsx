export default function Error404() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center space-y-6 px-6">

                {/* Error Code */}
                <h1 className="text-8xl font-extrabold text-orange-500 drop-shadow-lg animate-bounce">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                <p className="text-gray-600 max-w-md mx-auto">
                    Oops! The page you’re looking for doesn't exist or has been moved.
                </p>

                {/* Back Button */}
                <a
                    href="/"
                    className="inline-block mt-4 px-8 py-3 bg-orange-500 text-white font-semibold 
                    rounded-xl shadow hover:bg-orange-600 transition duration-300"
                >
                    Go Back Home
                </a>

                {/* Illustration */}
                <div className="mt-10">
                    <svg
                        className="mx-auto w-64 h-64 opacity-90"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#f97316"
                            d="M40,-69.3C52.4,-63.6,63,-52.6,70.8,-40C78.5,-27.4,83.3,-13.7,83.5,0.2C83.7,14.1,79.3,28.1,71.4,39.8C63.4,51.5,51.9,60.9,38.9,68.5C25.8,76.1,12.9,82,-0.4,82.7C-13.7,83.5,-27.5,79.1,-40.4,72C-53.3,64.8,-65.3,54.9,-72.4,42.6C-79.5,30.3,-81.8,15.1,-80.9,0.6C-80.1,-13.9,-76.2,-27.8,-68.7,-39.9C-61.2,-52,-50.1,-62.4,-37.2,-68.5C-24.4,-74.6,-12.2,-76.4,0.7,-77.4C13.5,-78.5,27.1,-78.9,40,-69.3Z"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
