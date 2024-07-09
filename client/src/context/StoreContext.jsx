import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    async function loadData() {
      await fetchFoodList();
      if (tk) {
        setToken(tk);
        await loadCartData(tk);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/v1/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
    console.log(cartItems);
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/v1/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const cartTotal = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/v1/cart/get",
      {},
      {
        headers: { token },
      },
    );
    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/v1/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    cartTotal,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
