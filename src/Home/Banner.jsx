import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "/b121.png",
      title: "Discover Global Scholarships",
      subtitle: "Find the best funding opportunities around the world",
      cta: "Explore Opportunities",
      color: "from-indigo-600/90 to-purple-600/90",
    },
    {
      id: 2,
      image: "/b122.png",
      title: "Apply with Confidence",
      subtitle: "Smooth application process with expert guidance",
      cta: "Learn How to Apply",
      color: "from-emerald-600/90 to-cyan-600/90",
    },
    {
      id: 3,
      image: "/b123.png",
      title: "Build Your Future",
      subtitle: "Turn your academic dreams into reality",
      cta: "Start Your Journey",
      color: "from-amber-600/90 to-orange-600/90",
    },
  ];

  return (
    <div className="relative mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Parallax]}
        effect="fade"
        speed={1000}
        parallax={true}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-white/60 hover:!bg-white !w-3 !h-3 !mx-1.5 transition-all duration-300",
          bulletActiveClass: "!bg-white !scale-125 !shadow-lg",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="w-full h-[450px] md:h-[600px] rounded-2xl"
      >
        <div
          slot="container-start"
          className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"
          data-swiper-parallax="-30%"
        ></div>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center scale-105 transform hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="-20%"
            ></div>

            {/* Glassmorphism Content */}
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="container mx-auto px-6 lg:px-8 z-20">
                <div
                  className="backdrop-blur-md bg-black/30 p-6 sm:p-8 rounded-2xl max-w-lg lg:max-w-xl shadow-xl space-y-4 sm:space-y-6"
                  data-swiper-parallax-y="300"
                  data-swiper-parallax-duration="1000"
                >
                  {/* Badge */}
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${slide.color} text-white text-xs sm:text-sm font-medium shadow-md`}
                  >
                    Scholarship Portal
                  </span>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg md:text-xl text-white/90">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r ${slide.color} text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300 group`}
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
