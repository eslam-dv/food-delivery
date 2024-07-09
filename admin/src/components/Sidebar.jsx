import { NavLink } from "react-router-dom";

import { assets } from "../assets/assets";

const Sidebar = () => {
  const activeLink = "bg-[#fff0ed] border-red-500";
  return (
    <div className="w-[18%] min-h-[100vh] border border-[1.5px] border-[#a9a9a9] border-t-0 text-[max(1vw,_10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? activeLink : "")}
        >
          <div className="flex items-center gap-[12px] border border-1 border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-l">
            <img src={assets.add_icon} alt="Add icon" />
            <p className="max-[900px]:hidden">Add Items</p>
          </div>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) => (isActive ? activeLink : "")}
        >
          <div className="flex items-center gap-[12px] border border-1 border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-l">
            <img src={assets.order_icon} alt="Order icon" />
            <p className="max-[900px]:hidden">List Items</p>
          </div>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? activeLink : "")}
        >
          <div className="flex items-center gap-[12px] border border-1 border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-l">
            <img src={assets.order_icon} alt="Order icon" />
            <p className="max-[900px]:hidden">Orders</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
