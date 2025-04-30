import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const About = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // Trigger count only once
        }
      },
      { threshold: 0.3 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative text-white text-center">
        {/* Image Section with Overlay */}
        <div
          className="relative h-[500px]"
          style={{
            backgroundImage: `url('/banner1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-500 opacity-60"></div>
        </div>

        {/* Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Who we are</h1>
          <p className="mt-4 text-base sm:text-lg max-w-[90%] md:max-w-[70%] lg:max-w-[53%] ">
            Empowering health with AI-driven solutions, offering personalized
            consultations, and improving lives through innovative technology.
          </p>
        </div>
      </div>

      {/* about us section */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:space-y-0 space-y-14 lg:space-x-20 md:px-20">
          {/* Stats Section Below the Image  */}
          <div class=" rounded-lg p-8 shadow-md basis-[60%] ">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">
              Innovating healthcare through technology
              <span class="text-[#059AFC] "> breakthroughs</span>
            </h3>
            <p class="text-gray-600 text-base leading-relaxed mb-6">
              Welcome to Health Consultancy with AI, where technology meets
              personalized care. Our mission is to simplify healthcare by
              providing AI-driven insights and tailored recommendations. With
              advanced tools and expert support, we empower you to take control
              of your health and well-being.
            </p>
            {/* Stats */}
            <div
              ref={sectionRef}
              className="grid grid-cols-3 gap-4 text-center"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {startCount && <CountUp start={0} end={10} duration={3} />}+
                </p>
                <p className="text-gray-500 text-sm">Years of Experience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {startCount && <CountUp start={0} end={100} duration={2} />}+
                </p>
                <p className="text-gray-500 text-sm">Completed Projects</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {startCount && <CountUp start={0} end={10} duration={3} />}+
                </p>
                <p className="text-gray-500 text-sm">Awards Won</p>
              </div>
            </div>
          </div>

          {/* Right Image with Content Below  */}
          <div class="p-6" data-aos-duration="1200" data-aos="fade-left">
            {/* Image with Light Blue Background  */}
            <div class="relative flex justify-center lg:justify-end">
              {/* Light Blue Background  */}
              <div class="absolute -right-5 -bottom-5 bg-blue-400 rounded-lg md:rounded-lg shadow-lg w-full max-w-md lg:max-w-lg h-full"></div>
              {/* Image  */}
              <img
                src="/about3.jpg"
                alt="Team Meeting"
                class="relative z-10 rounded-lg shadow-md w-full max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}

      <div>
        <div class="container flex justify-center mx-auto pt-16">
          <div>
            <p class="text-gray-500 text-base md:text-lg text-center font-normal pb-3">
              BUILDING TEAM
            </p>
            <h1 class="xl:text-4xl md:text-3xl text-2xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
              The Talented People Behind the Scenes of the Organization
            </h1>
          </div>
        </div>
        <div class="w-full bg-gray-100 pb-16 md:mt-[125px] ">
          <div class="container mx-auto">
            <div
              role="list"
              aria-label="Behind the scenes People "
              class="flex md:flex-row flex-col items-center justify-center md:gap-24"
            >
              {/* Umair Abid detail */}
              <div
                role="listitem"
                class="xl:w-1/3 lg:mx-3 sm:w-3/4 md:w-2/5 relative md:mt-0 mt-32 xl:max-w-sm lg:w-2/5"
              >
                <div class="rounded-lg overflow-hidden shadow-md bg-white ">
                  <div class="absolute -mt-20 w-full flex justify-center">
                    <div class="h-32 w-32">
                      <img
                        src="/team1.jpg"
                        alt="Display Picture of Silene Tokyo"
                        role="img"
                        class="rounded-full h-full w-full shadow-md "
                      />
                    </div>
                  </div>
                  <div class="px-6 mt-16">
                    <h1 class="font-bold text-2xl text-center mb-1">
                      Umair Abid
                    </h1>
                    <p class="text-gray-800 text-sm text-center">
                      Web Developer
                    </p>
                    <p class="text-center text-gray-600 text-base pt-3 font-normal">
                      Focused on innovation and technology, our team sets global
                      benchmarks in web development, delivering cutting-edge
                      solutions for projects.
                    </p>
                    <div class="w-full flex justify-center pt-5 pb-5">
                      <a
                        href={"https://github.com/umairabid505"}
                        target="_blank"
                        class="mx-5 text-gray-600 hover:text-blue-600 hover:-translate-y-2 transform transition-all duration-300"
                      >
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        class="mx-5 text-gray-600 hover:text-blue-600 hover:-translate-y-2 transform transition-all duration-300"
                      >
                        <div aria-label="Twitter" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-twitter"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        class="mx-5 text-gray-600 hover:text-blue-600 hover:-translate-y-2 transform transition-all duration-300"
                      >
                        <div aria-label="Instagram" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-instagram"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Muhammad Ramzan detail */}
              <div
                role="listitem"
                class="xl:w-1/3 lg:mx-3 sm:w-3/4 md:w-2/5 relative md:mt-0 mt-32 xl:max-w-sm lg:w-2/5"
              >
                <div class="rounded-lg overflow-hidden shadow-md bg-white ">
                  <div class="absolute -mt-20 w-full flex justify-center">
                    <div class="h-32 w-32">
                      <img
                        src="/team2.JPG"
                        alt="Display Picture of Silene Tokyo"
                        role="img"
                        class="rounded-full h-full w-full shadow-md  "
                      />
                    </div>
                  </div>
                  <div class="px-6 mt-16">
                    <h1 class="font-bold text-2xl text-center mb-1">
                      Muhammad Ramzan
                    </h1>
                    <p class="text-gray-800 text-sm text-center">
                      Web Developer
                    </p>
                    <p class="text-center text-gray-600 text-base pt-3 font-normal">
                      Our web development team excels in creating innovative,
                      project-driven solutions, setting industry standards with
                      cutting-edge technology and expertise.
                    </p>
                    <div class="w-full flex justify-center pt-5 pb-5">
                      <a
                        href={"https://github.com/mramzan259"}
                        target="_blank"
                        class="mx-5 text-gray-600 hover:text-blue-600 hover:-translate-y-2 transform transition-all duration-300"
                      >
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        class="mx-5 text-gray-600 hover:text-blue-600 hover:-translate-y-2 transform transition-all duration-300"
                      >
                        <div aria-label="Twitter" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-twitter"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        class="mx-5 text-gray-600 hover:text-blue-600 hover:-translate-y-2 transform transition-all duration-300"
                      >
                        <div aria-label="Instagram" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            class="feather feather-instagram"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
