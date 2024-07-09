import { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="rounded-[15px] shadow-[0_0_10px_#00000015] transition duration-[0.3s] animate-fadeIn">
      <div className="relative">
        <img
          className="w-full rounded-t-2xl"
          src={`${url}/images/${image}`}
          alt={name}
        />
        <div className="absolute bottom-[15px] right-[15px]">
          {!cartItems[id] ? (
            <img
              onClick={() => addToCart(id)}
              className="cursor-pointer w-[35px] rounded-full"
              src={assets.add_icon_white}
              alt="add to cart"
            />
          ) : (
            <div className="bg-white rounded-3xl p-[6px] flex gap-3 items-center">
              <img
                onClick={() => removeFromCart(id)}
                className="cursor-pointer w-[30px]"
                src={assets.remove_icon_red}
                alt="remove from cart"
              />
              <p className="text-center">{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                className="cursor-pointer w-[30px]"
                src={assets.add_icon_green}
                alt="add more to cart"
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-xl font-medium">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="rating" />
        </div>
        <p className="text-[#676767] text-sm">{description}</p>
        <p className="text-red-500 text-2xl font-medium mt-5">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
