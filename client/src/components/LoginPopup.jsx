import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign In");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { url, setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let newUrl = `${url}/api/v1/user`;

    if (currentState === "Sign In") {
      newUrl += "/login";
    } else {
      newUrl += "/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      window.location.reload();
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="absolute z-10 w-full h-full bg-[#00000090] grid">
      <form
        onSubmit={(e) => onLogin(e)}
        className="place-self-center flex flex-col gap-[25px] w-[max(23vw,_330px)] text-[#808080] bg-white py-[25px] px-[30px] rounded-md text-[14px] animate-fadeIn-0-5"
      >
        <div className="flex justify-between items-center text-black text-2xl">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="close popup"
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          {currentState == "Sign Up" && (
            <input
              className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-md"
              type="text"
              placeholder="username..."
              required
              name="name"
              onChange={(e) => onChangeHandler(e)}
              value={data.name}
            />
          )}
          <input
            className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-md"
            type="email"
            placeholder="email@example.com..."
            required
            name="email"
            onChange={(e) => onChangeHandler(e)}
            value={data.email}
          />
          <input
            className="outline-none border border-solid border-[#c9c9c9] p-[10px] rounded-md"
            type="password"
            placeholder="password..."
            required
            name="password"
            onChange={(e) => onChangeHandler(e)}
            value={data.password}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 rounded-md text-white bg-red-500 text-base font-medium"
        >
          {currentState == "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currentState == "Sign In" ? (
          <p>
            Don't have an account?{" "}
            <span
              className="font-medium text-red-500 cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create One
            </span>
          </p>
        ) : (
          <>
            <div className="flex gap-2 items-start">
              <input type="checkbox" id="privacy" className="mt-[6px]" />
              <label htmlFor="privacy" className="text-base">
                By continuing, i agree to the terms of use & privacy policy
              </label>
            </div>
            <p>
              Already have an account?{" "}
              <span
                className="font-medium text-red-500 cursor-pointer"
                onClick={() => setCurrentState("Sign In")}
              >
                Login here
              </span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
