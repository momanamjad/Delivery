import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Filter, Trash2, Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/skeleton/Skeleton";

const List = ({ url }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showCatMenu, setShowCatMenu] = useState(false);

  const fetchList = async (currentPage = page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list?page=${currentPage}&limit=${limit}`);
      if (response.data.success) {
        setList(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await axios.post(`${url}/api/food/remove/`, { id });
        if (response.data.success) {
          toast.success("Food deleted successfully");
          fetchList();
        } else {
          toast.error("Failed to delete food");
        }
      } catch (error) {
        toast.error("Error deleting item");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const categories = ["All", ...new Set(list.map(item => item.category))];

  const filteredList = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchList(newPage);
    }
  };

  return (
    <div className="list-page">
      <header className="list-header">
        <div className="header-title">
          <h1>Menu Inventory</h1>
          <p>Manage your food items, prices, and categories</p>
        </div>
        <div className="header-controls">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <X size={14} className="clear-search" onClick={() => setSearchTerm("")} />}
          </div>
          
          <div className="filter-wrapper">
            <button className={`filter-btn-alt ${categoryFilter !== 'All' ? 'active' : ''}`} onClick={() => setShowCatMenu(!showCatMenu)}>
              <Filter size={18} /> {categoryFilter}
            </button>
            {showCatMenu && (
              <div className="filter-dropdown">
                {categories.map((cat, i) => (
                  <div 
                    key={i} 
                    className={`filter-item ${categoryFilter === cat ? 'selected' : ''}`}
                    onClick={() => { setCategoryFilter(cat); setShowCatMenu(false); }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn-add-item" onClick={() => navigate('/add')}>
            <Plus size={18} /> Add Item
          </button>
        </div>
      </header>

      {loading ? (
        <div className="list-page-loading">
          <Skeleton type="table" count={limit} />
        </div>
      ) : (
        <div className="list-content">
          <div className="table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length > 0 ? filteredList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="product-cell">
                        <img 
                          src={item.image.startsWith("http") ? item.image : `${url}/images/` + item.image} 
                          alt={item.name} 
                          className="product-img-small"
                        />
                        <span className="product-name">{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td>
                      <span className="price-tag">${item.price.toFixed(2)}</span>
                    </td>
                    <td className="text-right">
                      <button className="delete-action-btn" onClick={() => removeFood(item._id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="empty-table">
                      <p>No items found matching your filters.</p>
                      <button className="reset-link" onClick={() => { setSearchTerm(""); setCategoryFilter("All"); }}>Clear all filters</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="list-pagination">
              <button 
                disabled={page === 1} 
                onClick={() => handlePageChange(page - 1)}
                className="page-btn"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="page-indicator">
                Page <span>{page}</span> of {totalPages}
              </div>
              <button 
                disabled={page === totalPages} 
                onClick={() => handlePageChange(page + 1)}
                className="page-btn"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
