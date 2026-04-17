import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/Storecontext";
// import { assets } from "../FoodDisplay/constant";
import { assets } from "../../assets/assets";
const FoodItem = ({ id, name, price, description, image }) => {
  // const [itemCount, setItemCount] = useState(0);
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image.startsWith("http") ? image : url+"/images/"+image} className="food-item-image" alt="" />
        {!cartItems[id] ? 
          <img
            className="add"
            onClick={() => 
              // console.log({id})
              addToCart(id)
              
            }

            src={assets.add_icon_white} 
          />
         : 
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <div className="food-item-desc">
          <p>{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
