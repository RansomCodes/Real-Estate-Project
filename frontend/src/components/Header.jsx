import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const currentUser = useSelector((state) => state.user.user.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex  flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* Search bar */}
        <form
          action=""
          className="bg-slate-100 p-2 sm:p-3 rounded-lg flex items-center w-1/2 sm:w-1/3"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full"
          />
          <FaSearch className="text-slate-500" />
        </form>

        {/* Hamburger icon for mobile */}
        <FaBars
          className="sm:hidden text-xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* Links for larger screens */}
        <ul
          className={`hidden sm:flex gap-4 items-center ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>

        {/* Links for smaller screens (hamburger menu) */}
        <ul
          className={`absolute top-16 left-0 w-full bg-slate-200 sm:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/">
            <li className="text-slate-700 hover:underline p-3">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline p-3">About</li>
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7 object-cover mx-auto"
              />
            ) : (
              <li className="text-slate-700 hover:underline p-3">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
