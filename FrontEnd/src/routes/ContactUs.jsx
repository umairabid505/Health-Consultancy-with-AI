import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative text-white text-center">
        {/* Image Section with Overlay */}
        <div
          className="relative h-[500px]"
          style={{
            backgroundImage: `url('/cont.jpg')`,
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
          <h1 className="text-5xl font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto py-16">
        <div className="bg-white shadow-lg rounded-lg p-4 xs:p-8 md:flex justify-center">
          {/* Contact Info Section */}
          <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8 basis-[50%] ">
            <h2 className="text-xl font-bold text-blue-900">Get in Touch</h2>
            <p className="mt-4 text-gray-600">
              We’d love to hear from you. Whether you have questions, feedback,
              or need assistance, contact us anytime.
            </p>
            <div className="mt-6">
              <p className="text-gray-600 mt-2">
                {/* <i className="fas fa-envelope text-blue-900"></i>{" "} */}
                <strong>Email: </strong>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=umairabid505@gmail.com,engrramzan786259@gmail.com&su=Health Consultancy&body=Hi,..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  umairabid505@gmail.com
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                {/* <i className="fas fa-map-marker-alt text-blue-900"></i>{" "} */}
                <strong>Address:</strong> 5M6H+RJ7, Arabia Islamia Rd, Burewala,
                Vehari, Punjab
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:max-w-[50%]  lg:max-w-2/3 flex sm:justify-end justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.614643816362!2d72.67653007436171!3d30.162431612973045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393cdf1616aaaaab%3A0x17f08693511c9bc1!2sGovt.%20Post%20Graduate%20College!5e0!3m2!1sen!2s!4v1733548525222!5m2!1sen!2s"
              width="600"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
