import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const url = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");
  
  const addToCart = async (itemId) => {
    try {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      if (token) {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error adding item to cart";
      toast.error(message);
      // Revert local state if API fails
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 1) - 1 }));
    }
  };
  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if (token) {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error removing item from cart";
      toast.error(message);
      // Revert local state if API fails
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }
  };

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
    const response = await axios.get(url + "/api/food/list?limit=999");
    setFoodList(response.data.data);
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  }


  useEffect(() => {
    // Axios global error interceptor
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a moment.");
        }
        return Promise.reject(error);
      }
    );

    async function loadData() {
      try {
        await fetchFoodList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          await loadCartData(storedToken);
        } else {
          const guestCart = localStorage.getItem("guestCart");
          if (guestCart) {
            setCartItems(JSON.parse(guestCart));
          }
        }
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }
    loadData();

    return () => axios.interceptors.response.eject(interceptor);
  }, [])

  useEffect(() => {
    if (!token) {
      localStorage.setItem("guestCart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("guestCart");
    }
  }, [cartItems, token]);

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
