import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token, url } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/v1/order/userorders`,
      {},
      { headers: { token } },
    );
    if (response.data.success) {
      setData(response.data.data);
      console.log(data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <main className="min-h-[60vh]">
      <div className="container mx-auto px-5 my-[50px]">
        <h2 className="text-3xl">My Orders</h2>
        <div className="flex flex-col gap-[20px] mt-[30px]">
          {data.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-[30px] text-[14px] py-[10px] px-[20px] text-[#454545] border border-red-500 max-[900px]:grid-cols-[1fr_2fr_1fr] max-[900px]:gap-y-[5px] max-[900px]:text-[12px]"
            >
              <img className="w-[50px]" src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="max-[900px]:text-center">${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span className="text-red-500 animate-pulse">&#x25cf;</span>{" "}
                <b className="font-medium text-[#454545]">{order.status}</b>
              </p>
              <button
                className="py-[12px] px-0 rounded-[4px] bg-[#ffe1e1] text-[#454545] max-[900px]:text-[10px]"
                onClick={fetchOrders}
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyOrders;
