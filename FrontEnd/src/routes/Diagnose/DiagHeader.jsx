import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function DiagHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="bg-[#0a93a5] px-3 md:px-6 py-2 w-full ">
        <div className="max-w-[900px] xl:max-w-[1050px] flex items-center justify-between mx-auto">
          {/* Left Section: Logo and Title */}
          <div className="logo w-[350px] md:w-[360px] flex items-center">
            <Link to="/">
              <img
                src="/diagnosisLogo.png"
                alt=""
                className="basis-[30%] w-[45px] sm:w-[55px] md:w-[70px]"
              />
            </Link>
            <h1 className=" text-[#082258] font-bold sm:text-xl basis-[70%]">
              <span className="text-[#fdfdfd]"> Health </span> Consultancy
            </h1>
          </div>

          {/* Right Section: Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* For Business */}
            <Link
              to="/"
              className="hover:underline text-white text-sm font-medium"
            >
              Home
            </Link>
          </div>
          <div className="lg:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white ">
              {isOpen ? (
                <RxCross2 className="text-3xl" />
              ) : (
                <FiMenu className="text-3xl" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-15 right-0  bg-[rgba(74,87,100,0.7)] w-[210px] space-y-2 py-5 pb-[30px] text-center text-[18px] transition-transform duration-1000 ease-in-out lg:hidden  z-50`}
      >
        {["Home"].map((tab) => (
          <Link
            key={tab}
            to={`#${tab.toLowerCase()}`}
            onClick={() => setIsOpen(!isOpen)}
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            {tab}
          </Link>
        ))}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-35 z-40"
          onClick={() => setIsOpen(false)} // Close menu when clicking outside
        ></div>
      )}
    </>
  );
}
