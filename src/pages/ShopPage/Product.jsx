import { useState } from "react";
import "./shoppage.css";
import image1 from '../../assets/img1.jfif';
import image2 from '../../assets/img2.jfif';
import image3 from '../../assets/img3.jfif';
import productimage from '../../assets/productimage.png';
import star from '../../assets/Star.png';
import halfStar from '../../assets/HalfStar.png';
import { useCart } from '../../context/CartContext';

export default function Product() {
  const [orderSize, setOrderSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [popupImage, setPopupImage] = useState(null);
  // Notification is now an object { message, type }
  const [notification, setNotification] = useState(null);
  const { addToCart } = useCart();

  // Define product price details as constants
  const salePrice = 14700;
  const originalPrice = 21000;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setNotification({ message: "Please select both color and size.", type: "error" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const product = {
      name: "Silent Cabinet for Dental Clinics",
      orderSize,
      selectedColor,
      selectedSize,
      image: productimage,
      price: salePrice,
      originalPrice: originalPrice,
    };

    try {
      addToCart(product);
      setNotification({ message: "Item added to your cart!", type: "success" });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ message: "Failed to add item to cart. Please try again.", type: "error" });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="product-container">
      {/* Product Images */}
      <div className="product-images-container">
        <div>
          <img 
            src={image1} 
            width={95} 
            alt="Product 1" 
            onClick={() => setPopupImage(image1)}
          />
          <img 
            src={image2} 
            width={95} 
            alt="Product 2" 
            onClick={() => setPopupImage(image2)}
          />
          <img 
            src={image3} 
            width={95} 
            alt="Product 3" 
            onClick={() => setPopupImage(image3)}
          />
        </div>
        <div>
          <img 
            src={productimage} 
            width={400} 
            alt="Main Product"
            onClick={() => setPopupImage(productimage)}
          />
        </div>
      </div>

      {/* Popup Modal for Expanded Image */}
      {popupImage && (
        <div className="image-popup-overlay">
          <button 
            className="popup-close" 
            onClick={() => setPopupImage(null)}
          >
            &times;
          </button>
          <img 
            src={popupImage} 
            alt="Expanded Product" 
            className="image-popup" 
          />
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`cart-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Product Information */}
      <div className="product-text-container">
        <h2>Silent Cabinet for Dental Clinics</h2>

        {/* Star Rating */}
        <div className="star-rating">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star} alt="Star" />
          ))}
          <img key={5} src={halfStar} alt="Half Star" />
          <p>4.6/5</p>
        </div>

        {/* Price Information */}
        <div className="pricing">
          <p>{salePrice} EGP</p>
          <p>{originalPrice} EGP</p>
          <p>-{Math.round(((originalPrice - salePrice) / originalPrice) * 100)}%</p>
        </div>

        {/* Product Description */}
        <p>
          This silent cabinet is specifically designed for dental clinics to eliminate compressor noise.
          Built with premium noise-dampening materials, it enhances patient comfort and creates a tranquil
          clinic environment.
        </p>

        <hr className="section-divider" />

        {/* Color Selection */}
        <div>
          <p>Select Colors</p>
          <div className="colors">
            {["Gray"].map((color) => (
              <div
                key={color}
                className={`color-option ${selectedColor === color ? "selected" : ""}`}
                onClick={() => setSelectedColor(color)}
              >
                ⬤
              </div>
            ))}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Size Selection */}
        <div>
          <p>Choose Size</p>
          <div className="sizes">
            {["Standard"].map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Order Quantity & Add to Cart Button */}
        <div className="order-section">
          <div className="order-quantity">
            <button onClick={() => setOrderSize((prev) => Math.max(1, prev - 1))}>-</button>
            <p>{orderSize}</p>
            <button onClick={() => setOrderSize((prev) => prev + 1)}>+</button>
          </div>
          <div className="order-button">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
