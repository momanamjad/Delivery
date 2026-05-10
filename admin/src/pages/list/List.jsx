import React, { useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({url}) => {
  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [limit] = React.useState(10);

  const fetchList = async (currentPage = page) => {
    const response = await axios.get(`${url}/api/food/list?page=${currentPage}&limit=${limit}`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } else {
      toast.error("Failed to fetch list");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchList(newPage);
    }
  };

  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove/`, { id:id});  
    if (response.data.success) {
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
              <img src={item.image.startsWith("http") ? item.image : `${url}/images/` + item.image} alt={item.name} />
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
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => handlePageChange(page - 1)}
              className={page === 1 ? "disabled" : ""}
            >
              Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages} 
              onClick={() => handlePageChange(page + 1)}
              className={page === totalPages ? "disabled" : ""}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
