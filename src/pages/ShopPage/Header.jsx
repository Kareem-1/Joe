// src/components/Header.jsx
import logo from '../../assets/joelogo.png';
import { IoSearchOutline, IoCartOutline, IoPersonCircleSharp } from "react-icons/io5";
import { useCart } from '../../context/CartContext';
import CartSideMenu from './CartSideMenu';

export default function Header() {
  const { cartItems, setIsCartOpen } = useCart();

  const openCart = () => {
    setIsCartOpen(true);
  };

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.orderSize, 0);

  return (
    <>
      <div className='shop-navigation'>
        <div>
          <img src={logo} width={118} alt="Logo" />
        </div>
        <div>
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
      <div className="header-line"></div>
      <CartSideMenu />
    </>
  );
}
