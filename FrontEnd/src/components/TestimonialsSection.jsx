import React, { useRef, useState } from "react";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Dr. Sarah Khan",
    role: "Patient",
    review:
      "A user-friendly system that helped me understand my symptoms quickly.",
    image: "/pic1.png",
  },
  {
    name: "Ali Ahmed",
    role: "Software Engineer",
    review:
      "Their AI-driven system provides precise health advice, ensuring better decisions.",
    image: "/pic2.png",
  },
  {
    name: "Hina Tariq",
    role: "Fitness Coach",
    review:
      "The platform's guidance has improved my clients' health journeys significantly.",
    image: "/pic3.png",
  },
  {
    name: "Dr. Salman Raza",
    role: "Nutritionist",
    review:
      "An innovative tool offering diet plans and reliable health recommendations.",
    image: "/pic4.jpg",
  },
  {
    name: "Usman Raza",
    role: "Healthcare Specialist",
    review:
      "Health Consultancy has revolutionized patient care with personalized solutions.",
    image: "/pic5.jpg",
  },
];

const TestimonialsSection = () => {
  const sliderRef = useRef(null); // Reference to the slider
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the active slide

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Update the active slide index
    appendDots: (dots) => (
      <div className="mt-4">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full ${
          i === currentSlide ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024, // Tablets and small desktops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile devices (portrait)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Small mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-50 ">
      <div className="text-center mb-8">
        <h2 className="text-2xl xs:text-3xl font-bold">Our Clients Feedback</h2>
        <p className="text-gray-600 mt-3 xs:text-base text-sm">
          Discover what our clients have to say about their experiences with
          our services.
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4 mb-5 mt-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-[15px]">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;
