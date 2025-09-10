"use client";
import React from "react";
import Testimonial from "../root/Testimonial";
import { testimonials } from "@/lib/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const TestimonialsSection = () => {
  return (
    <div className="inter pt-24 pb-16 px-12 max-lg:px-8 max-md:px-4 max-sm:px-2">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h6 className="x5l bricolage text-slate-900 leading-tight">
            From our{" "}
            <span className="font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              community
            </span>
          </h6>
          <p className="xl font-light text-slate-600 mt-4 leading-relaxed">
            Here's what other NGOs had to say about Pocket Impact
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: false,
            }}
            speed={8000} // Slower, smoother movement
            autoplay={{
              delay: 0, // Continuous movement
              disableOnInteraction: false,
              reverseDirection: false,
              pauseOnMouseEnter: false,
            }}
            loop={true}
            loopAdditionalSlides={3} // Ensure seamless looping
            spaceBetween={24}
            slidesPerView="auto"
            breakpoints={{
              1400: { slidesPerView: 3.5 },
              1200: { slidesPerView: 3 },
              900: { slidesPerView: 2.5 },
              600: { slidesPerView: 2 },
              0: { slidesPerView: 1.2 },
            }}
            className="testimonials-swiper"
            style={{
              paddingBottom: "1rem",
              paddingTop: "0.5rem",
            }}
            onSwiper={(swiper) => {
              // Ensure smooth continuous movement
              swiper.autoplay.start();
            }}
          >
            {/* Duplicate testimonials for seamless infinite loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <SwiperSlide key={`testimonial-${index}`} className="!h-auto">
                <div className="h-full transform transition-all duration-300 hover:scale-105">
                  <Testimonial testimonial={testimonial} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        .testimonials-swiper {
          overflow: visible;
        }

        .testimonials-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .testimonials-swiper:hover .swiper-wrapper {
          animation-play-state: paused;
        }

        /* Hide scrollbar for clean appearance */
        .testimonials-swiper::-webkit-scrollbar {
          display: none;
        }

        /* Refined card styling */
        .testimonials-swiper .swiper-slide > div > div {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 4px 24px rgba(148, 163, 184, 0.08);
        }

        /* Professional hover states without shadows */
        .testimonials-swiper .swiper-slide:hover > div > div {
          background: rgba(255, 255, 255, 1);
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-2px);
        }

        /* Smooth text rendering */
        .testimonials-swiper * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;