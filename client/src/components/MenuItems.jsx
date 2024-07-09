import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const MenuItems = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <section className="my-[30px]">
      <h2 className="text-[max(3vw,_22px)] mb-6 font-medium">Top Dishes</h2>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-x-[30px] gap-y-[50px]">
        {food_list.map((item, index) => {
          if (category == "All" || category == item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default MenuItems;
