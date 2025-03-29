import productImage from '../../assets/productimage.png';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';

CartReview.propTypes = {
  onPayNow: PropTypes.func.isRequired,
};

function CartReview({ onPayNow }) {
  const { cartItems } = useCart();

  // Calculate totals dynamically:
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.orderSize,
    0
  );
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.orderSize,
    0
  );
  const discount = subtotal - total;

  return (
    <div className="cart-review-container">
      <h3 className="cart-review-title">Review your cart</h3>

      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={productImage} alt="Product" className="product-image" />
            <div className="cart-item-details">
              <p className="item-name">{item.name}</p>
              <p>{item.orderSize}x</p>
              <p className="item-price">{item.price} EGP</p>
            </div>
          </div>
        ))}
      </div>

      <div className="discount-code">
        <input type="text" placeholder="Discount code" />
        <button className="apply-button">Apply</button>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{subtotal} EGP</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span>{discount} EGP</span>
        </div>
        <div className="summary-row total-row">
          <span>Total</span>
          <span>{total} EGP</span>
        </div>
      </div>

      <button className="pay-now-button" onClick={onPayNow}>
        Pay Now
      </button>

      <div className="secure-checkout">
        <p className="secure-checkout-title">
          🔒 Secure Checkout - SSL Encrypted
        </p>
        <p className="secure-checkout-text">
          Ensuring your financial and personal details are secure during every transaction.
        </p>
      </div>
    </div>
  );
}

export default CartReview;
