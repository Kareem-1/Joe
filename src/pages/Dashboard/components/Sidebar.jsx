import "../styles/OrdersPage.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">DD</div>
      <nav>
        <ul>
          <li className="active">Orders</li>
          <li>Checkin</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
