import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo2 from '../../assets/Images/Shaadi Sanskar 2.png';



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed  top-0 z-50 transition-all  duration-300 ${
        scrolled ? "bg-white shadow-md text-black" : "bg-white shadow-md text-black"
      } py px-2  sm:px-6`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* {/ Logo /} */}
        <div className="bg-white/70 rounded-md p-1">
          <Link to="/">
            <img src={Logo2} alt="Logo2" className="h-20 w-40 opacity-100" />
          </Link>
        </div>

        {/* {/ Hamburger Menu (Mobile) /} */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="  focus:outline-none"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* {/ Navigation Links (Responsive) /} */}
    <nav
  className={`absolute top-25 text-center shadow-md md:shadow-none md:static md:flex md:items-center md:space-x-6 jost
    ${isOpen ? "block w-full bg-white text-black p-2 left-0" : "hidden"} md:block`}
>
          <div className="flex flex-col md:flex-row lg:space-x-4 text-center">
            <NavLink to="/" className="block py-2 px-6">
               HOME
            </NavLink>
            <NavLink to="/aboutus" className="block py-2 px-6">
              ABOUT US

            </NavLink>
            {/* <NavLink to="/blog" className="block py-2 px-6">
              BLOG
            </NavLink> */}
            <NavLink to="/contactUs" className="block py-2 px-6">
              CONTACT US

            </NavLink>

            {/* {/ Mobile Register Button /} */}
            <div className="md:hidden jost py-2">
              <NavLink to="/register/step-one">
                <button className="w-full bg-[#C34040] text-white px-5 py-2 rounded-full ">
                  REGISTRATION
                </button>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* {/ Register Button (Desktop) /} */}
        <div className="hidden md:block jost">
          <NavLink to="/register/step-one">
            <button className="bg-[#02BED0] cursor-pointer hover:bg-black text-white px-5 py-2 rounded-full ">
               REGISTRATION
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
