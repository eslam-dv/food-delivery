import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const [active, setActive] = useState("home");
  const { cartTotal, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.reload();
  };

  return (
    <header>
      <nav className="container mx-auto px-5 md:px-0 py-2 flex justify-between items-center">
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-[120px] md:w-[140px] lg:w-[150px]"
          />
        </Link>
        <ul className="hidden lg:flex gap-[15px] md:gap-[20px] text-[#49577e] text-[16px] lg:text-lg">
          <li
            onClick={() => setActive("home")}
            className={`cursor-pointer ${active == "home" ? "pb-[2px] border-b-2 border-[#49577e]" : ""}`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            onClick={() => setActive("menu")}
            className={`cursor-pointer ${active == "menu" ? "pb-[2px] border-b-2 border-[#49577e]" : ""}`}
          >
            <a href="/#category">Menu</a>
          </li>
          <li
            onClick={() => setActive("apps")}
            className={`cursor-pointer ${active == "apps" ? "pb-[2px] border-b-2 border-[#49577e]" : ""}`}
          >
            <a href="/#download-app">Mobile App</a>
          </li>
          <li
            onClick={() => setActive("contact")}
            className={`cursor-pointer ${active == "contact" ? "pb-[2px] border-b-2 border-[#49577e]" : ""}`}
          >
            <a href="/#contact">Contact Us</a>
          </li>
        </ul>
        <div className="flex items-center gap-[20px] lg:gap-[40px]">
          <img
            src={assets.search_icon}
            className="cursor-pointer w-[20px] md:w-[22px] lg:w-auto"
            alt="search icon"
          />
          <div className="relative">
            <Link to="/cart">
              <img
                src={assets.basket_icon}
                className="cursor-pointer w-[20px] md:w-[22px] lg:w-auto"
                alt="basket icon"
              />
            </Link>
            <div
              className={`absolute min-w-[10px] min-h-[10px] bg-red-500 rounded-full top-[-8px] right-[-8px] ${cartTotal() > 0 ? "block" : "hidden"}`}
            ></div>
          </div>
          {!token ? (
            <button
              className="text-[#49577e] py-[7px] px-[20px] text-[15px] md:py-[8px] md:px-[25px] lg:py-[10px] lg:px-[30px] border border-solid border-red-500 rounded-[50px] transition duration-[0.3s] hover:bg-[#fff4f2]"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          ) : (
            <div className="relative group">
              <img className="" src={assets.profile_icon} alt="profile image" />
              <ul className="absolute hidden right-0 z-[1] w-max group-hover:flex group-hover:flex-col gap-[10px] bg-[#fff2ef] py-[12px] px-[25px] rounded-[4px] border border-red-500 outline-2 outline-white">
                <li
                  className="flex items-center gap-[10px] cursor-pointer hover:text-red-500"
                  onClick={() => navigate("/my-orders")}
                >
                  <img className="w-[20px]" src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr className="border-red-500" />
                <li
                  className="flex items-center gap-[10px] cursor-pointer hover:text-red-500"
                  onClick={logout}
                >
                  <img className="w-[20px]" src={assets.logout_icon} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
