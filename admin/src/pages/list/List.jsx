import React, { useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({url}) => {
  const [list, setList] = React.useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.status === 200) {
      setList(response.data.data);
    } else {
      toast.error("Failed to fetch list");
    }
  };
  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove/`, { id:id});  
    if (response.status === 200) {
      toast.success("Food deleted successfully");
      fetchList(); // Refresh the list
    } else {
      toast.error("Failed to delete food");
    }
  };


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Actions</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price.toFixed(2)}</p>
              <p className="cursor" onClick={()=> removeFood(item._id)}>X</p>
              {/* <div className="actions">
                <button>Edit</button>
                <button>Delete</button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
