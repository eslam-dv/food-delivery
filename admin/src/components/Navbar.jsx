import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center py-[8px] px-[4%]">
      <img src={assets.logo} alt="Logo" className="w-[max(10%,_80px)]" />
      <img
        src={assets.profile_image}
        alt="Profile Image"
        className="w-[40px]"
      />
    </header>
  );
};

export default Navbar;
