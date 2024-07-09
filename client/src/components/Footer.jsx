import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#323232] text-[#d9d9d9] flex flex-col items-center gap-[20px] pb-[20px] pt-[80px] px-[9vw] mt-[100px]" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-[35px] md:gap-[80px] pb-[20px]">
          <div className="flex flex-col items-start gap-[20px]">
            <img src={assets.logo} alt="logo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              exercitationem fugit id aperiam dolor deserunt, animi laboriosam
              odio vel quia?
            </p>
            <div className="flex gap-4">
              <img
                className="w-[40px]"
                src={assets.facebook_icon}
                alt="facebook"
              />
              <img
                className="w-[40px]"
                src={assets.twitter_icon}
                alt="twitter"
              />
              <img
                className="w-[40px]"
                src={assets.linkedin_icon}
                alt="linkedin"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[20px]">
            <h2 className="text-white text-2xl font-medium">Company</h2>
            <ul className="flex flex-col gap-[10px]">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Deleviry</Link>
              </li>
              <li>
                <Link to="#">Privacy Policiy</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-[20px]">
            <h2 className="text-white text-2xl font-medium">Get in touch</h2>
            <ul className="flex flex-col gap-[10px]">
              <li>+1-234-567-890</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-center">
          Copyright 2024 &#169; Tomato.com - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
