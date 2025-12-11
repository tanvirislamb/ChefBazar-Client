import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/AxiosHooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaStar } from "react-icons/fa";

export default function CustomerReviewSlider() {
    const axios = useAxios();

    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ["customerview"],
        queryFn: async () => {
            const res = await axios.get("/reviews");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center">Loading reviews...</p>;
    if (isError) return <p className="text-center">Failed to load reviews.</p>;

    return (
        <div className="my-10 mx-5">
            <h2 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-x-3 border-orange-500 drop-shadow-md">
                Our Customer Reviews
            </h2>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                        <div className="flex flex-col md:flex-row items-center gap-6 bg-linear-to-r my-10 from-orange-50 to-orange-100 p-6 md:p-8 rounded-2xl shadow-xl transform transition hover:scale-105 w-full md:max-w-2xl mx-auto">
                            {/* Customer Image */}
                            <img
                                src={review.photoURL}
                                alt={review.userName}
                                className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 shadow-md"
                            />

                            {/* Review Content */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                {/* Quote Icon */}
                                <svg
                                    className="w-6 h-6 text-orange-400 mb-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.17 6A5 5 0 0 0 2 11v1a5 5 0 0 0 5 5h1v-6H5V11a3 3 0 0 1 2.17-2.83zM17.17 6A5 5 0 0 0 12 11v1a5 5 0 0 0 5 5h1v-6h-3V11a3 3 0 0 1 2.17-2.83z" />
                                </svg>

                                {/* Comment */}
                                <p className="text-gray-700 text-base md:text-lg font-medium mb-3">
                                    "{review.comment}"
                                </p>

                                {/* Rating */}
                                <div className="flex justify-center md:justify-start">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`${i < review.rating ? "text-orange-500" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
