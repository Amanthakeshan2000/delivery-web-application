import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import SignIn from "./SignIn";
import Register from "./Register";
import getAccessToken from "../utils/auth";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await getAccessToken();
        if (!token) {
          throw new Error('Access token not available');
        }

        const response = await fetch(`/api/get-category?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuToggle = () => {
    setMenu(prevMenu => !prevMenu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const toggleSignIn = () => {
    setShowSignIn(prev => !prev);
    setShowRegister(false);
  };

  const toggleRegister = () => {
    setShowRegister(prev => !prev);
    setShowSignIn(false);
  };

  const closeAuthModals = () => {
    setShowSignIn(false);
    setShowRegister(false);
  };

  return (
    <div className="fixed w-full top-0 left-0 z-50">
      <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-index-1">
        <div className="flex flex-row items-center cursor-pointer">
          <h1 className="text-xl font-semibold">LOGO</h1>
        </div>

        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
          <Link to="home" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">
            Home
          </Link>

          <div className="relative group">
            <div className="flex items-center gap-1">
              <Link to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">
                Dishes
              </Link>
              <BiChevronDown className="cursor-pointer" size={25} />
            </div>

            <ul className="absolute hidden space-y-0 group-hover:block bg-white border border-gray-300 rounded-lg p-5 shadow-lg transition-all duration-300 ease-in-out" style={{ width: '300px' }}>
  {categories.length > 0 ? (
    categories.map(category => (
      <li key={category.id} className="hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-lg">
        <Link
          to={`dishes-${category.name}`}
          spy={true}
          smooth={true}
          duration={500}
          className="text-gray-800 hover:text-blue-600 transition-all cursor-pointer block px-4 py-2"
        >
          {category.name}
        </Link>
      </li>
    ))
  ) : (
    <li className="text-gray-600">No categories found</li>
  )}
</ul>


          </div>

          <Link to="about" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">
            About
          </Link>

          <Link to="menu" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">
            Menu
          </Link>

          <Link to="review" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">
            Reviews
          </Link>

          <Button title="Sign In" onClick={toggleSignIn} />
        </nav>

        <div className="md:hidden flex items-center">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleMenuToggle} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleMenuToggle} />
          )}
        </div>
      </div>

      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
      >
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="dishes"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Dishes
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          About
        </Link>
        <Link
          to="menu"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Menu
        </Link>
        <Link
          to="review"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Reviews
        </Link>

        <Button title="Sign In" onClick={toggleSignIn} />
      </div>

      {showSignIn && <SignIn onClose={closeAuthModals} switchToRegister={toggleRegister} />}
      {showRegister && <Register onClose={closeAuthModals} switchToSignIn={toggleSignIn} />}
    </div>
  );
};

export default Navbar;
