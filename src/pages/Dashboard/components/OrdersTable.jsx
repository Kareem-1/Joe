import React, { useState } from "react";
import "../styles/OrdersPage.css";

function OrdersTable({ orders, onUpdateOrder }) {
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState({});

  const handleEditClick = (order) => {
    setEditingRow(order.id);
    setEditableData(order);
  };

  const handleSaveClick = () => {
    onUpdateOrder(editableData);
    setEditingRow(null);
    setEditableData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>ORDER ID</th>
          <th>ORDER NUMBER</th>
          <th>STATUS</th>
          <th>ITEMS</th>
          <th>CUSTOMER NAME</th>
          <th>CUSTOMER NUMBER</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const isEditing = editingRow === order.id;
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {isEditing ? (
                  <input
                    name="orderNumber"
                    value={editableData.orderNumber}
                    onChange={handleChange}
                  />
                ) : (
                  order.orderNumber
                )}
              </td>
              <td>
                {isEditing ? (
                  <select
                    name="status"
                    value={editableData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">pending</option>
                    <option value="shipped">shipped</option>
                    <option value="cancelled">cancelled</option>
                    <option value="draft">draft</option>
                  </select>
                ) : (
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    name="items"
                    value={editableData.items}
                    onChange={handleChange}
                  />
                ) : (
                  order.items
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    name="customerName"
                    value={editableData.customerName}
                    onChange={handleChange}
                  />
                ) : (
                  order.customerName
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    name="customerNumber"
                    value={editableData.customerNumber}
                    onChange={handleChange}
                  />
                ) : (
                  order.customerNumber
                )}
              </td>
              <td>
                {isEditing ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(order)}>Edit</button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default OrdersTable;
