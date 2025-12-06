import salad from '../assets/salad.jpg'

export default function Banner() {
    return (
        <div className='relative overflow-hidden rounded-2xl mx-4 mt-3 bg-black'>
            <img src={salad} alt="" className='w-full h-100 object-cover opacity-70'/>

            {/* Text Content */}
            <div className="absolute inset-0 max-w-4xl mx-auto text-center px-4 flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    Taste the World from{" "}
                    <span className="text-orange-500">Local Chefs.</span>
                </h1>

                <p className="text-white italic mt-4 text-lg">
                    Discover and order authentic, homemade meals crafted by passionate chefs in your community.
                </p>

                {/* Search Bar */}
                <div className="mt-10 flex items-center justify-center">
                    <div className="w-full max-w-xl bg-white/20 backdrop-blur-md shadow-md rounded-full flex items-center justify-between p-3 gap-3">
                        <p className='text-white font-medium'>Your favourite food</p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
