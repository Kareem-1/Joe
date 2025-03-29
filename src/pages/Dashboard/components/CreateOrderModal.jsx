import React, { useState } from "react";
import "../styles/OrdersPage.css";

function CreateOrderModal({ onClose, onAddOrder }) {
  const [formData, setFormData] = useState({
    id: "",
    orderNumber: "",
    status: "pending",
    items: 1,
    customerName: "",
    customerNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.id) {
      alert("Please enter an Order ID.");
      return;
    }
    onAddOrder(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Order</h3>
        <label>
          Order ID
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </label>
        <label>
          Order Number
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">pending</option>
            <option value="shipped">shipped</option>
            <option value="cancelled">cancelled</option>
            <option value="draft">draft</option>
          </select>
        </label>
        <label>
          Items
          <input
            type="number"
            name="items"
            value={formData.items}
            onChange={handleChange}
          />
        </label>
        <label>
          Customer Name
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
        </label>
        <label>
          Customer Number
          <input
            type="text"
            name="customerNumber"
            value={formData.customerNumber}
            onChange={handleChange}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderModal;
