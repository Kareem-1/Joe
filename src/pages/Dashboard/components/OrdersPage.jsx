import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";
import CreateOrderModal from "./CreateOrderModal";
import "../styles/OrdersPage.css";

function OrdersPage({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Adds a new order to the table
  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  // Called by OrdersTable to update an existing order
  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord))
    );
  };

  // Pretend to send data to the DB
  const handleSendToDB = () => {
    // Replace with an actual API call
    console.log("Sending orders to DB:", orders);
    alert("Data sent to DB (check console).");
  };

  return (
    <div className="orders-page">
      <Sidebar />
      <div className="orders-main">
        <OrdersHeader onOpenModal={() => setIsModalOpen(true)} />
        <OrdersTable orders={orders} onUpdateOrder={handleUpdateOrder} />
        <div className="pagination-container">
          <p>
            Showing 1 to {orders.length} of {orders.length} results
          </p>
          <div className="pagination">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>&gt;</button>
          </div>
        </div>
        <button className="send-db-button" onClick={handleSendToDB}>
          Send to DB
        </button>
      </div>

      {isModalOpen && (
        <CreateOrderModal
          onClose={() => setIsModalOpen(false)}
          onAddOrder={handleAddOrder}
        />
      )}
    </div>
  );
}

export default OrdersPage;
