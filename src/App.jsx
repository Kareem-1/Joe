import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import ShopPage from './pages/ShopPage/ShopPage';
import { CartProvider } from './context/CartContext';
import { ClerkProvider } from '@clerk/clerk-react';
import LoginPage from './pages/Login/Login';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {

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
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ClerkProvider>
  )
}

export default App
