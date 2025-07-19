import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay  } from 'swiper/modules';


const Banner = () => {
  const slides = [
    {
      id: 1,
      image: '/b121.png',
      title: 'Discover Global Scholarships',
      subtitle: 'Find the best funding opportunities around the world.'
    },
    {
      id: 2,
      image: '/b122.png',
      title: 'Apply with Confidence',
      subtitle: 'Smooth application process and expert guidance.'
    },
    {
      id: 3,
      image: '/b123.png',
      title: 'Build Your Future',
      subtitle: 'Turn your dreams into reality with scholarships.'
    }
  ];

  return (
    <div className="mt-4">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay ]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[400px] rounded-lg overflow-hidden"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-center text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-xl max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
