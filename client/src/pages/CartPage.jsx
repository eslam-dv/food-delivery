import { useContext } from "react";

import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, cartTotal, url, food_list } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <main>
      <section className="container mx-auto mt-[100px] px-5 md:px-0">
        <table className="w-full">
          <thead className="border-b-2 text-gray-500">
            <tr>
              <th className="text-start text-[max(1vw,_12px)] font-medium">
                Items
              </th>
              <th className="text-start text-[max(1vw,_12px)] font-medium">
                Title
              </th>
              <th className="text-[max(1vw,_12px)] font-medium">Price</th>
              <th className="text-[max(1vw,_12px)] font-medium">Quantity</th>
              <th className="text-[max(1vw,_12px)] font-medium">Total</th>
              <th className="text-[max(1vw,_12px)] font-medium">Remove</th>
            </tr>
          </thead>
          <tbody>
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <tr key={index} className="border-b">
                    <td className="p-5 ">
                      <img
                        className="w-[50px] md:w-[80px]"
                        src={url + "/images/" + item.image}
                        alt={item.name}
                      />
                    </td>
                    <td className="text-[max(1vw,_12px)]">{item.name}</td>
                    <td className="text-[max(1vw,_12px)] text-center">
                      ${item.price}
                    </td>
                    <td className="text-[max(1vw,_12px)] text-center">
                      {cartItems[item._id]}
                    </td>
                    <td className="text-[max(1vw,_12px)] text-center">
                      ${item.price * cartItems[item._id]}
                    </td>
                    <td>
                      <img
                        className="mx-auto cursor-pointer w-[12px] md:w-[20px]"
                        onClick={() => removeFromCart(item._id)}
                        src={assets.cross_icon}
                        alt="remove item"
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="flex flex-col-reverse md:flex-row justify-between gap-[max(12vw,_20px)] mt-[50px]">
          <div className="basis-full flex flex-col gap-[20px]">
            <h2 className="text-2xl font-medium">Cart Totals</h2>
            <div className="flex justify-between border-b text-[#555]">
              <b>Subtotal</b>
              <b>${cartTotal()}</b>
            </div>
            <div className="flex justify-between border-b text-[#555]">
              <b>Delivery Fee</b>
              <b>${cartTotal() === 0 ? 0 : 2}</b>
            </div>
            <div className="flex justify-between border-b text-[#555]">
              <b>Total</b>
              <b>${cartTotal() === 0 ? 0 : cartTotal() + 2}</b>
            </div>
            <button
              className="bg-red-500 text-white w-[max(15vw,_200px)] py-[12px] rounded-md font-medium text-lg"
              onClick={() => navigate("/order")}
            >
              Proceed to checkout
            </button>
          </div>
          <div className="basis-full">
            <p className="text-[#555]">Add a promo code</p>
            <div className="mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-md">
              <input
                className="outline-none pl-2.5 bg-transparent"
                type="text"
                placeholder="Enter promo code..."
              />
              <button className="w-[max(10vw,_150px)] py-[12px] px-[5px] bg-black text-white rounded-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
