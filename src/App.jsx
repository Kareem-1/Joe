import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import ShopPage from './pages/ShopPage/ShopPage';
import OrdersPage from './pages/Dashboard/components/OrdersPage';
import { CartProvider } from './context/CartContext';
import { ClerkProvider } from '@clerk/clerk-react';
import LoginPage from './pages/Login/Login';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';

function App() {
  const initialOrders = [
    {
      id: "S8072",
      orderNumber: "S807342",
      status: "pending",
      items: 12,
      customerName: "Cody Fisher",
      customerNumber: "01068976245",
    },
    {
      id: "S8073",
      orderNumber: "S807343",
      status: "shipped",
      items: 7,
      customerName: "Kelvin Watson",
      customerNumber: "01068976245",
    },
    {
      id: "S8074",
      orderNumber: "S807344",
      status: "cancelled",
      items: 4,
      customerName: "Elinor Howard",
      customerNumber: "01068976245",
    },
    {
      id: "S8075",
      orderNumber: "S807345",
      status: "draft",
      items: 2,
      customerName: "Jenny Wilson",
      customerNumber: "01068976245",
    },
    {
      id: "S8076",
      orderNumber: "S807346",
      status: "pending",
      items: 3,
      customerName: "Jon Smith",
      customerNumber: "01068976245",
    },
  ];

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/shop' element={<ShopPage />} />
            {//            <Route path='/dashboard' element={<OrdersPage initialOrders={initialOrders} />} />
            }            <Route path='/login' element={<LoginPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ClerkProvider>
  )
}

export default App
