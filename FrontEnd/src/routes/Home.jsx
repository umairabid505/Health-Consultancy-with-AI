import React from "react";
import { Link } from "react-router-dom";
import TestimonialsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <>
      <div className="relative">
        <div
          className=" min-h-[550px] border"
          style={{
            backgroundImage: `url('/pngtree-abstract-blur-hospital-clinic-counter-interior-defocused-medical-background-image_15646915.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <div className="mt-[130px] lg:mt-[85px] max-w-[1150px] mx-auto flex lg:flex-row flex-col items-center flex-wrap">
            <div className="basis-[50%] text-center lg:text-left md:p-4 animate__animated animate__fadeInLeft animate__slower">
              <p className="mb-6 font-medium text-[16px] ">
                - The Best Health Solution
              </p>
              <h1 className=" text-[30px] md:text-[35px] lg:text-[50px] xl:text-[60px] font-semibold leading-[40px] md:leading-[50px] lg:leading-[60px] mb-6">
                Your Well-Being,
                <br />
                Our
                <span className="text-[#059AFC] "> Commitment </span>
              </h1>
              <p className="px-4 mb-8 lg:px-0 md:pl-1 sm:w-[430px] md:text-base lg:text-justify ">
                Discover smart solutions for your health. From symptoms to
                solutions, we’re here to guide you every step of the way.
              </p>
              <div className="flex gap-3 justify-center lg:justify-normal">
                <Link
                  to="/Diagnosis"
                  class="rounded-md w-fit group border-2 border-sky-500 font-medium hover:bg-gradient-to-r hover:from-[#32ebe4] hover:to-[#304ffd]  py-3 px-5 capitalize focus:outline-none hover:text-white shadow-lg hover:shadow-xl cursor-pointer "
                >
                  Diagnoses
                </Link>
                <Link
                  to="/Diagnosis/healthfacilities"
                  class="rounded-md w-fit group border-2 border-sky-500 font-medium bg-gradient-to-r from-[#32ebe4] to-[#304ffd] hover:bg-none py-3 px-5 capitalize focus:outline-none text-white hover:text-black shadow-lg hover:shadow-xl cursor-pointer "
                >
                  Facilities
                </Link>
              </div>
            </div>
            <div
              className="basis-[50%] flex justify-center md:mt-7 mt-6 animate__animated animate__fadeInRight animate__slow"
              data-aos="fade-left"
            >
              <img
                src="hero2.png"
                alt="doctor"
                className="lg:w-[100%] lg:mt-10 xl:mt-0 w-[70%] mt-5 "
              />
            </div>
          </div>
        </div>

        {/* about us section */}
        <section class="py-16 pb-12 bg-gray-50 ">
          <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:space-y-0 space-y-14 lg:space-x-20 md:px-20 mt-10 shadow-md pb-10">
            {/* Stats Section Below the Image  */}
            <div class=" rounded-lg p-8 basis-[60%]  ">
              <h3 class="text-3xl font-semibold text-gray-800 mb-4">
                Our Qualified Team is Ready to Help You!
              </h3>
              <p class="text-gray-600 text-base leading-relaxed mb-6">
                Our journey is rooted in passion for healthcare, combining
                technology and expertise to deliver innovative, AI-driven
                solutions that empower individuals for a healthier, happier
                future.
              </p>
              {/* about button */}
              <Link to="/about">
                <button
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  className={`sm:px-6 px-6 py-3 text-white bg-[#059AFC] rounded-md hover:bg-[#0599fcd2] transition disabled:opacity-50 font-bold  `}
                >
                  About Us
                </button>
              </Link>
            </div>

            {/* Right Image with Content Below  */}
            <div class="p-6  " data-aos="fade-left" data-aos-duration="1200">
              {/* Image with Light Blue Background  */}
              <div class="relative flex justify-center lg:justify-end ">
                {/* Light Blue Background  */}
                <div class="absolute -right-6 -bottom-6 bg-gradient-to-r from-[#32ebe4] to-[#304ffd] rounded-lg md:rounded-lg shadow-lg w-[40%] max-w-md lg:max-w-lg h-[40%] "></div>
                {/* Image  */}
                <img
                  src="about2.jpg"
                  alt="Team Meeting"
                  class="relative z-10 rounded-lg shadow-md w-full max-w-md lg:max-w-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </div>
    </>
  );
};

export default Home;
