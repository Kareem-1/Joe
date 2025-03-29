// src/components/CartSideMenu.jsx
import { useCart } from '../../context/CartContext';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'; // assuming you're using react-router-dom

const CartSideMenu = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Process cart info if needed
    navigate('/checkout');
    setIsCartOpen(false);
  };

  return (
    <div className={`cart-side-menu ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-side-menu-header">
        <h3>Your Cart</h3>
        <button className="close-button" onClick={() => setIsCartOpen(false)}>
          <IoClose />
        </button>
      </div>
      <div className="cart-side-menu-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p><strong>{item.name}</strong></p>
                <p>Color: {item.selectedColor}</p>
                <p>Size: {item.selectedSize}</p>
                <p>Quantity: {item.orderSize}</p>
              </div>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-side-menu-footer">
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartSideMenu;
