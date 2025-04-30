import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the user scrolled

  // Scroll event to toggle header position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 190) {
        setIsScrolled(true); // Show the header
      } else {
        setIsScrolled(false); // Return to default position
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup event listener
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 ${
          isScrolled ? "translate-y-0 bg-white shadow-lg" : null
        }`}
      >
        <div className="header max-w-[700px] lg:max-w-[960px] xl:max-w-[1050px] mx-auto md:rounded-full py-1 mt-2 flex justify-between items-center px-3 sm:px-6 md:px-10 bg-[rgba(255,255,255,0.5)]">
          <div className="logo w-[250px] md:w-[360px] m-[4px] md:m-[6px] flex items-center">
            <Link to="/">
              <img
                src="/diagnosisLogo.png"
                alt=""
                className="basis-[30%] w-[55px] md:w-[70px]"
              />
            </Link>
            <h1 className="text-[#082158d8] font-bold sm:text-lg md:text-xl basis-[70%]">
              <span className="text-[#079EB8]">Health</span> Consultancy
            </h1>
          </div>
          <div className="hidden lg:flex justify-between space-x-10 text-[20px] text-white/100 font-semibold">
            {["Home", "About", "Services", "Contact"].map((tab) => (
              <NavLink
                key={tab}
                to={`/${tab.toLowerCase() === "home" ? "" : tab.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative text-black transition after:content-[""] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[4px] after:bg-[#079EB8] after:transition-transform after:duration-500 ${
                    isActive
                      ? "after:scale-x-100 after:origin-center"
                      : "after:scale-x-0 after:origin-center"
                  }`
                }
              >
                {tab}
              </NavLink>
            ))}
          </div>
          <div className="lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#636363] "
            >
              {isOpen ? (
                <RxCross2
                  className={`text-3xl ${
                    isScrolled ? "text-[#636363]" : "text-white"
                  } `}
                />
              ) : (
                <FiMenu className="text-3xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed md:top-[76px] top-[62px] right-0 bg-[rgba(74,87,100,0.7)] w-[210px] space-y-2 py-5 pb-[30px] text-center text-[18px] transition-transform duration-1000 ease-in-out lg:hidden z-50`}
      >
        {["Home", "About", "Services", "Contact"].map((tab) => (
          <NavLink
            key={tab}
            to={`/${tab.toLowerCase() === "home" ? "" : tab.toLowerCase()}`}
            onClick={() => setIsOpen(!isOpen)} // Close menu when a link is clicked
            className={({ isActive }) =>
              `block px-4 py-2 text-white hover:bg-blue-500 ${
                isActive && "bg-blue-500 font-bold"
              }`
            }
          >
            {tab}
          </NavLink>
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
};

export default Header;
