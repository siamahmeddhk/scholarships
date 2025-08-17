import React from "react";
import { FaStar, FaRegStar, FaQuoteLeft, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// ⭐ Sample feedback data
const feedbackData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    rating: 5,
    text: "This platform helped me secure a full scholarship to my dream university! The application process was so straightforward.",
    date: "2025-06-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Parent",
    rating: 4,
    text: "Excellent resource for finding scholarships. The website could use a better search filter, but overall very useful.",
    date: "2025-05-22",
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Guidance Counselor",
    rating: 5,
    text: "I recommend this service to all my students. The moderators are extremely helpful and responsive to questions.",
    date: "2025-07-10",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Student",
    rating: 5,
    text: "Beautifully designed website with up-to-date scholarship information. Saved me hours of research!",
    date: "2025-06-30",
  },
];

const Feedback = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Real experiences from students, parents, and educators
          </p>
        </div>

        {/* 🔹 Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbackData.map((feedback, index) => (
            <SwiperSlide key={feedback.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all h-full flex flex-col"
              >
                {/* User Info */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                      <FaUser className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feedback.name}
                    </h3>
                    <p className="text-sm text-gray-500">{feedback.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) =>
                    i < feedback.rating ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-yellow-400" />
                    )
                  )}
                </div>

                {/* Feedback Text */}
                <div className="relative flex-grow">
                  <FaQuoteLeft className="absolute -top-2 left-0 text-indigo-200 text-2xl" />
                  <p className="pl-6 text-gray-700 italic leading-relaxed">
                    {feedback.text}
                  </p>
                </div>

                {/* Date */}
                <p className="mt-4 text-sm text-gray-500 text-right">
                  {new Date(feedback.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;
