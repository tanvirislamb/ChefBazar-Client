import { Link } from 'react-router';
import salad from '../assets/salad.jpg';

export default function Banner() {
    return (
        <div className='relative overflow-hidden rounded-2xl mx-4 mt-3 bg-black'>
            <img
                src={salad}
                alt=""
                className='w-full h-100 object-cover opacity-70 transition-transform duration-1000 ease-in-out transform hover:scale-105'
            />
            <div className="absolute inset-0 max-w-4xl mx-auto text-center px-4 flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight opacity-0 animate-fadeInUp">
                    Taste the World from{" "}
                    <span className="text-orange-500">Local Chefs.</span>
                </h1>

                <p className="text-white italic mt-4 text-lg opacity-0 animate-fadeInUp delay-200">
                    Discover and order authentic, homemade meals crafted by passionate chefs in your community.
                </p>

                <div className="mt-10 flex items-center justify-center opacity-0 animate-fadeInUp delay-400">
                    <div className="w-full max-w-xl bg-white/20 backdrop-blur-md shadow-md rounded-full flex items-center justify-between p-3 gap-3 transition-transform duration-500 hover:scale-105">
                        <p className='text-white font-medium'>Your favourite food</p>
                        <Link
                            to='/meals'
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-transform duration-300 transform hover:scale-110"
                        >
                            Explore
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s forwards;
                }
                .delay-200 { animation-delay: 0.2s; }
                .delay-400 { animation-delay: 0.4s; }
            `}</style>
        </div>
    );
}
