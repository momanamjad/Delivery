import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import cart from "../pages/Cart/cart";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
    
  };
  const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }
//  useEffect(()=>{
//   console.log(cartItems)
//  },[cartItems])

const getTotalcartamount=()=>{
  let total_amount=0;
  for(const items in cartItems){
    if(cartItems[items]>0){

    
    let itemInfo=food_list.find((product)=>product._id===items)
    total_amount +=itemInfo.price* cartItems[items]
    }
  }
  return total_amount;  
}

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalcartamount
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
