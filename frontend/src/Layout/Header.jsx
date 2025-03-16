import React, { useEffect, useState } from "react";
import { navbar } from "../data/Data";
import { NavLink, useNavigate } from "react-router-dom";
import useCartStore from "../redux/cartSlice"; // Zustand store
import { BiCart, } from "react-icons/bi";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const { totalItems } = useCartStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all bg-white duration-300 py-5 ${
        sticky ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-semibold text-gray-800">
        RandoStore
        </NavLink>

        {/* Navbar Links */}
        <nav className="hidden md:flex space-x-6">
          {navbar.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive ? "text-white bg-gray-900" : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {nav.nav}
            </NavLink>
          ))}
        </nav>

        {/* Cart Icon */}
        <button
          onClick={() => navigate("/cart")}
          className="relative text-gray-700 hover:text-gray-900 transition"
        >
          <BiCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
