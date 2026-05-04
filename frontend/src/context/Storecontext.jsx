import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const url = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");
  console.log("Current Backend URL:", url);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {

      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }

  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  }

  const getTotalcartamount = () => {
    let total_amount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {

        let itemInfo = food_list.find((product) => product._id === items)
        total_amount += itemInfo.price * cartItems[items]
      }
    }
    return total_amount;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  }


  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalcartamount,
    url,
    token,
    setToken,
    searchQuery,
    setSearchQuery
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
