import React from "react";
import "../styles/OrdersPage.css";

function OrdersHeader({ onOpenModal }) {
  return (
    <div className="orders-header">
      <h2>Order</h2>
      <button className="create-order-button" onClick={onOpenModal}>
        Create order
      </button>
    </div>
  );
}

export default OrdersHeader;
