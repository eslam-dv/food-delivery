import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../context/StoreContext";

const PlaceOrder = () => {
  const { cartTotal, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const order = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: cartTotal() + 2,
    };
    let response = await axios.post(`${url}/api/v1/order/place`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error!");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (cartTotal() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <main>
      <form
        onSubmit={order}
        className="container mx-auto px-5 flex flex-col items-center md:flex-row md:items-start md:justify-between gap-10 my-40"
      >
        <section className="w-full flex flex-col gap-5 md:max-w-[max(30%,_500px)]">
          <h2 className="text-3xl font-medium mb-10">Delivery Information</h2>
          <div className="flex gap-2">
            <input
              className="w-1/2 border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              required
            />
            <input
              className="w-1/2 border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              required
            />
          </div>
          <div>
            <input
              className="w-full border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />
          </div>
          <div>
            <input
              className="w-full border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="Street"
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              required
            />
          </div>
          <div className="flex gap-2">
            <input
              className="w-1/2 border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="City"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              required
            />
            <input
              className="w-1/2 border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="State"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              required
            />
          </div>
          <div className="flex gap-2">
            <input
              className="w-1/2 border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="Zip Code"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              required
            />
            <input
              className="w-1/2 border border-2 outline-none rounded-sm p-2 focus:outline-red-500"
              type="text"
              placeholder="Country"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              required
            />
          </div>
          <div>
            <input
              className="w-full border border-2 outline-none rounded-sm p-2 focus:outline-2 focus:outline-red-500"
              type="tel"
              placeholder="Phone"
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              required
            />
          </div>
        </section>
        <section className="flex flex-col gap-[20px] w-full md:max-w-[max(40%,_500px)]">
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
            className="bg-red-500 text-white w-[max(15vw,_200px)] py-[12px] rounded-md font-medium text-lg mt-10"
            type="submit"
          >
            Proceed to checkout
          </button>
        </section>
      </form>
    </main>
  );
};

export default PlaceOrder;
