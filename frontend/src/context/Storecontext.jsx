import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken]=useState("");  
  const [food_list,setFoodList]=useState([]);

  const url=" http://localhost:4000"


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
const fetchFoodList=async()=>{
  const response=await axios.get(url+"/api/food/list");
  setFoodList(response.data.data);
}

useEffect(()=>{
  
  async function loadData(){
    await fetchFoodList();
    if(localStorage.getItem("token")){
    setToken(localStorage.getItem("token"));
  }
  }
  loadData();
},[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalcartamount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
