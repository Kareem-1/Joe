import logo from '../../assets/joelogo.png';
import { IoSearchOutline, IoCartOutline, IoPersonCircleSharp } from "react-icons/io5";
import { useCart } from '../../context/CartContext';
import CartSideMenu from './CartSideMenu';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const { cartItems, setIsCartOpen } = useCart();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.orderSize, 0);

  return (
    <>
      <div className='shop-navigation'>
        <div className='logo-area'>
          <IoIosMenu
            className='navigation-hamburger'
            size={60}
            onClick={() => setSidebarOpen(true)}
          />
          <Link to={'/'}>
            <img src={logo} width={118} alt="Logo" />
          </Link>
        </div>
        <div className='shop-navigation-links'>
          <ul className='shop-navigation-items'>
            <li>Shop</li>
            <li>On Sale</li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div className='search-container'>
          <IoSearchOutline className='search-icon' size={20} />
          <input className='search-input' placeholder="Search for products..." />
        </div>
        <div className='ending-icons-container'>
          <div className='cart-icon-wrapper' onClick={openCart}>
            <IoCartOutline size={30} className='ending-icons' />
            {totalItems > 0 && (
              <span className='cart-badge'>{totalItems}</span>
            )}
          </div>
          <IoPersonCircleSharp size={30} className='ending-icons' />
        </div>
      </div>
      <div className='search-container-mobile'>
        <IoSearchOutline className='search-icon' size={20} />
        <input className='search-input' placeholder="Search for products..." />
      </div>
      <div className="header-line"></div>
      <CartSideMenu />
      
      {/* Always render sidebar, toggle "open" class */}
      <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="mobile-sidebar-close" onClick={() => setSidebarOpen(false)}>
          &times;
        </button>
        <img src={logo} width={118} alt="Logo" />
        <div className='mobile-sidebar-links'>
          <ul className='mobile-sidebar-items'>
            <li>Shop</li>
            <li>On Sale</li>
            <li>New Arrivals</li>
          </ul>
        </div>
      </div>
    </>
  );
}
