import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import { StoreContext } from "../context/StoreContext";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/v1/order/verify`, {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/my-orders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <main className="min-h-[60vh] grid">
      <div className="w-[100px] h-[100px] place-self-center border border-4 border-[#bdbdbd] border-t-red-500 rounded-full animate-spin"></div>
    </main>
  );
};

export default Verify;
