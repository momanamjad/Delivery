import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Filter, Trash2, Plus, ChevronLeft, ChevronRight, X, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/skeleton/Skeleton";

const CATEGORIES = ["Salad", "Rolls", "Desert", "Sandwich", "Pure Veg", "Pasta", "Noodles"];

const List = ({ url, token }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showCatMenu, setShowCatMenu] = useState(false);

  // ── Edit modal state ───────────────────────────────────────────────────────
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", price: "", category: "" });
  const [editImage, setEditImage] = useState(null);
  const [editSaving, setEditSaving] = useState(false);

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
        const response = await axios.post(`${url}/api/food/remove/`, { id }, { headers: { token } });
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

  const openEditModal = (item) => {
    setEditItem(item);
    setEditData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setEditImage(null);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditItem(null);
    setEditImage(null);
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditSaving(true);
    try {
      const formData = new FormData();
      formData.append("id", editItem._id);
      formData.append("name", editData.name);
      formData.append("description", editData.description);
      formData.append("price", Number(editData.price));
      formData.append("category", editData.category);
      if (editImage) formData.append("image", editImage);

      const response = await axios.put(`${url}/api/food/edit`, formData, { headers: { token } });
      if (response.data.success) {
        toast.success("Item updated successfully");
        closeEditModal();
        fetchList();
      } else {
        toast.error(response.data.message || "Failed to update item");
      }
    } catch (error) {
      toast.error("Error updating item");
    } finally {
      setEditSaving(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const categories = ["All", ...new Set(list.map((item) => item.category))];

  const filteredList = list.filter((item) => {
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
            <button
              className={`filter-btn-alt ${categoryFilter !== "All" ? "active" : ""}`}
              onClick={() => setShowCatMenu(!showCatMenu)}
            >
              <Filter size={18} /> {categoryFilter}
            </button>
            {showCatMenu && (
              <div className="filter-dropdown">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className={`filter-item ${categoryFilter === cat ? "selected" : ""}`}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setShowCatMenu(false);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn-add-item" onClick={() => navigate("/add")}>
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
                {filteredList.length > 0 ? (
                  filteredList.map((item, index) => (
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
                        <div className="action-btns">
                          <button
                            className="edit-action-btn"
                            title="Edit item"
                            onClick={() => openEditModal(item)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="delete-action-btn"
                            title="Delete item"
                            onClick={() => removeFood(item._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-table">
                      <p>No items found matching your filters.</p>
                      <button
                        className="reset-link"
                        onClick={() => {
                          setSearchTerm("");
                          setCategoryFilter("All");
                        }}
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="list-pagination">
              <button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className="page-btn">
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

      {/* ── Edit Modal ─────────────────────────────────────────────────────── */}
      {editModalOpen && editItem && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Food Item</h2>
              <button className="modal-close-btn" onClick={closeEditModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              {/* Image preview */}
              <div className="modal-img-row">
                <img
                  src={
                    editImage
                      ? URL.createObjectURL(editImage)
                      : editItem.image.startsWith("http")
                      ? editItem.image
                      : `${url}/images/${editItem.image}`
                  }
                  alt="Preview"
                  className="modal-preview-img"
                />
                <label className="change-img-btn">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setEditImage(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="modal-field">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  rows={3}
                  required
                />
              </div>

              <div className="modal-row">
                <div className="modal-field">
                  <label>Category</label>
                  <select name="category" value={editData.category} onChange={handleEditChange} required>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-field">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={closeEditModal}>
                  Cancel
                </button>
                <button type="submit" className="modal-save-btn" disabled={editSaving}>
                  {editSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
