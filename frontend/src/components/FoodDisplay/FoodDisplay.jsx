import React, { useContext } from "react";
import "./FoodDispaly.css";
import { StoreContext } from "../../context/Storecontext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const filteredDishes = food_list.filter((item) => {
    const matchCategory = category === "All" || category === item.category;
    const matchSearch = item.name.toLowerCase().includes((searchQuery || "").toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {filteredDishes.length > 0 ? (
        <div className="food-display-list">
          {filteredDishes.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className="food-display-empty" style={{ textAlign: 'center', padding: '50px 0', color: '#808080' }}>
          <h3 style={{ fontSize: '24px' }}>Oops! Not available yet.</h3>
          <p>We couldn't find any dishes matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
