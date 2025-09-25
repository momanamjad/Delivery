import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExplaoreMenu = ({category,setcategory}) => {

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Chose from our diverse menu featuring a detectable array of dishes .our
        moto is to cover your cravings
      </p>
      <div className="explore-menu-list">
         {menu_list.map((item,index)=>{
            return(
                <div onClick={ ()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
         })}
      </div>
      <hr />
    </div>
  );
};

export default ExplaoreMenu;
