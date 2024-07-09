import { menu_list } from "../assets/assets.js";

const Categorys = ({ category, setCategory }) => {
  return (
    <section id="category">
      <h1 className="font-medium text-[#262626] text-[max(3vw,_22px)] mb-4">
        Explore our menu
      </h1>
      <p className="mb-6 max-w-[100%] max-lg:text-[14px] lg:max-w-[60%] text-[#808080]">
        Chose from a diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients and culinary expertise
      </p>
      <div className="flex gap-[30px] items-center justify-between overflow-scroll scrollbar-hide select-none">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name,
              )
            }
            className="flex flex-col items-center gap-3"
          >
            <img
              className={`w-[7.5vw] min-w-[80px] cursor-pointer rounded-full transition-all duration-[0.2s] ${category === item.menu_name ? "border border-4 border-red-500 p-1" : ""}`}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p className="text-[#747474] text-[max(1.4vw,_16px)] cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-[10px] mx-0px h-[2px] bg-[#e2e2e2] border-none" />
    </section>
  );
};

export default Categorys;
