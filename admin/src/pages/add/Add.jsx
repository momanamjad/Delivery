import React, { useState } from "react";
import "./Add.css";
import upload_area from "../../assets/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";


const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const onSubmitHandler = async(event) => {
event.preventDefault();
const formData = new FormData();
formData.append("image", image);
formData.append("name", data.name);
formData.append("description", data.description);
formData.append("category", data.category);
formData.append("price", Number(data.price));
const response=await axios.post(`${url}/api/food/add`,formData);
if(response.data.success){
  setData({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  setImage(false);  
  toast.success("Product added successfully");
}else{
  toast.error("Failed to add product");
}
}
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Enter product name"
            name="name"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id=""
            rows="6"
            placeholder="Enter Description"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p> Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              id=""
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-category flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              placeholder="$20"
              name="price"
            />
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
