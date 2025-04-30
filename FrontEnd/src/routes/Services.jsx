import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaDiagnoses } from "react-icons/fa";
import { TbClockHeart } from "react-icons/tb";
import { FaBookMedical } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GrUserExpert } from "react-icons/gr";

const Services = () => {
  return (
    <div className="bg-gray-100 ">
      {/* Hero Section */}
      <div className="relative text-white text-center">
        {/* Image Section with Overlay */}
        <div
          className="relative h-[500px]"
          style={{
            backgroundImage: `url('/serv.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // height: "100vh",
            width: "100%",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-400 opacity-60"></div>
        </div>

        {/* Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            We Provide High Quality Services
          </h1>
          <p className="mt-4 text-base sm:text-lg max-w-[90%] md:max-w-[70%] lg:max-w-[53%] ">
            Providing expert health services, AI-powered diagnostics,
            personalized care, and innovative solutions for better wellbeing.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section class="py-16 bg-gray-50">
        {/* Section Header */}
        <div class="container mx-auto px-6 lg:px-20 text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Our Services
          </h2>
          <p class="text-gray-600 mt-4 text-base md:text-lg">
            Explore how our AI-powered health consultancy can transform your
            health journey.
          </p>
        </div>

        {/* Section Card */}
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeInUp animate__slow">
          {/* Single Card */}
          <div
            class="relative bg-white shadow-xl hover:scale-95 transition-all duration-300 rounded-lg p-6 "
            data-aos="fade-down"
            data-aos-duration="600"
            data-aos-easing="ease-in"
          >
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
              <FaRegCalendarAlt className="text-[30px]   " />
            </div>

            <h3 class="text-xl font-semibold text-center text-gray-800 mb-4">
              Symptom-Based Analysis
            </h3>

            <p class="text-gray-600 text-center">
              Get personalized insights by analyzing your symptoms with AI.
            </p>
          </div>
          {/* Single Card */}
          <div
            class="relative bg-white shadow-xl hover:scale-95 transition-all duration-300 rounded-lg p-6 "
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-easing="ease-in"
          >
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
              <FaDiagnoses className="text-[30px] " />
            </div>

            <h3 class="text-xl font-semibold text-center text-gray-800 mb-4">
              AI-Powered Diagnoses
            </h3>

            <p class="text-gray-600 text-center">
              Leverage AI for accurate and fast disease predictions.
            </p>
          </div>
          {/* Single Card */}
          <div
            class="relative bg-white shadow-xl hover:scale-95 transition-all duration-300 rounded-lg p-6 "
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
              <TbClockHeart className="text-[30px]" />
            </div>

            <h3 class="text-xl font-semibold text-center text-gray-800 mb-4">
              24/7 AI Health Assistance
            </h3>

            <p class="text-gray-600 text-center">
              Get round-the-clock health advice tailored to your needs.
            </p>
          </div>
          {/* Single Card */}
          <div
            class="relative bg-white shadow-xl hover:scale-95 transition-all duration-300 rounded-lg p-6  "
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
              <FaBookMedical className="text-[30px]" />
            </div>

            <h3 class="text-xl font-semibold text-center text-gray-800 mb-4">
              Medication Suggestions
            </h3>

            <p class="text-gray-600 text-center">
              Receive AI-curated medication recommendations for your condition.
            </p>
          </div>
          {/* Section Card */}
          <div
            class="relative bg-white shadow-xl hover:scale-95 transition-all duration-300 rounded-lg p-6  "
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
              <IoCalendarNumberOutline className="text-[30px]" />
            </div>
            <h3 class="text-xl font-semibold text-center text-gray-800 mb-4">
              Healthy Lifestyle Plans
            </h3>
            <p class="text-gray-600 text-center">
              Create sustainable lifestyle plans with AI-driven suggestions.
            </p>
          </div>
          {/* Section Card */}
          <div
            class="relative bg-white shadow-xl hover:scale-95 transition-all duration-300 rounded-lg p-6  "
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in"
          >
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
              <GrUserExpert className="text-[30px]" />
            </div>
            <h3 class="text-xl font-semibold text-center text-gray-800 mb-4">
              Expert Guidance
            </h3>
            <p class="text-gray-600 text-center">
              Collaborate with professionals to refine your health journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
