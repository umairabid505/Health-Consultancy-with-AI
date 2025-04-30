import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/50 ">
      <div className="max-w-[1050px] px-4 mx-auto py-10 ">
        <div className="flex flex-wrap xl:justify-between justify-center gap-12">
          <div className="px-4 my-4 lg:w-1/4">
            <a href="/" className="block w-20 mb-5 ">
              <img src="/diagnosisLogo.png" alt="" />
            </a>
            <p className="py-3">
            Get the care you need, when you need it. Let’s make your health journey stress-free and effective with our innovative platform.
            </p>
          </div>
          <div className="px-4 my-4 w-full sm:w-auto">
            <div>
              <h2 className="inline-block font-semibold text-2xl pb-4 mb-4 border-b-4 border-blue-300">
                Company
              </h2>
            </div>
            <ul className="leading-8">
              <li>
                <Link to="/about" className="hover:text-blue-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="contact" className="hover:text-blue-700">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        
          <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
            <div>
              <h2 className="inline-block font-semibold text-2xl pb-4 mb-4 border-b-4 border-blue-300">
                Connect With Us
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook text-primary border border-primary rounded-full p-2 cursor-pointer hover:bg-primary hover:text-blue-700 transition-all duration-500 hover:scale-125"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter text-primary border border-primary rounded-full p-2 cursor-pointer hover:bg-primary hover:text-blue-700 transition-all duration-500 hover:scale-125"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram text-primary border border-primary rounded-full p-2 cursor-pointer hover:bg-primary hover:text-blue-700 transition-all duration-500 hover:scale-125"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube text-primary border border-primary rounded-full p-2 cursor-pointer hover:bg-primary hover:text-blue-700 transition-all duration-500 hover:scale-125"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Copyright © 2024 - <span className="text-[#059AFC]">UR Smart Developers.</span> All Rights Reserved.
            </div>
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Made with ❤️ by <span className="text-[#059AFC]">UR Smart Developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
