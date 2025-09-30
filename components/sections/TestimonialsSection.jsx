"use client";
import React, { useEffect } from "react";
import Testimonial from "../root/Testimonial";
import { testimonials } from "@/lib/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const TestimonialsSection = () => {
  // Ensure enough slides for looping (at least 2x the max slidesPerView)
  const minSlides = 7; // 2 * 3.5 (max slidesPerView at 1400px breakpoint)
  const repeatedTestimonials = Array.from(
    { length: Math.ceil(minSlides / testimonials.length) },
    () => testimonials
  ).flat();

  // Debug: Log the number of slides
  useEffect(() => {
    console.log("Total slides:", repeatedTestimonials.length);
  }, []);

  return (
    <div className="inter pt-24 pb-16 px-12 max-lg:px-8 max-md:px-4 max-sm:px-2 bg-gray-100 min-h-[300px]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h6 className="text-3xl bricolage text-slate-900 leading-tight font-bold">
            From our{" "}
            <span className="font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              community
            </span>
          </h6>
          <p className="text-lg font-light text-slate-600 mt-4 leading-relaxed">
            Here's what other NGOs had to say about Pocket Impact
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>

          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: false,
            }}
            speed={5000} // Smoother movement
            autoplay={{
              delay: 0, // Continuous movement
              disableOnInteraction: false, // Never stop on interaction
              pauseOnMouseEnter: false, // Never pause on hover
              stopOnLastSlide: false, // Ensure it doesn't stop
            }}
            loop={repeatedTestimonials.length >= minSlides} // Enable loop only if enough slides
            slidesPerGroup={1} // Avoid grouping issues
            loopAdditionalSlides={3} // Ensure seamless looping
            spaceBetween={24}
            slidesPerView={1} // Default to 1 for rendering
            breakpoints={{
              1400: { slidesPerView: 3.5 },
              1200: { slidesPerView: 3 },
              900: { slidesPerView: 2.5 },
              600: { slidesPerView: 2 },
              320: { slidesPerView: 1 },
            }}
            className="testimonials-swiper"
            style={{
              padding: "1rem",
            }}
            onSwiper={(swiper) => {
              console.log("Swiper initialized");
              swiper.autoplay.start();
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <SwiperSlide key={`testimonial-${index}`} className="!h-auto !w-[300px]">
                <div className="h-full transform transition-all duration-300 hover:scale-105">
                  <Testimonial testimonial={testimonial} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .testimonials-swiper {
          overflow: hidden;
          width: 100%;
        }

        .testimonials-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .testimonials-swiper:hover .swiper-wrapper {
          animation-play-state: running !important; /* Never pause */
        }

        .testimonials-swiper::-webkit-scrollbar {
          display: none;
        }

        .testimonials-swiper .swiper-slide {
          width: 300px !important;
          opacity: 1 !important;
        }

        .testimonials-swiper .swiper-slide > div > div {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 1rem;
        }

        .testimonials-swiper .swiper-slide:hover > div > div {
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-4px);
        }

        .testimonials-swiper * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;