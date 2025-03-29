// src/components/Product.jsx
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
  const { addToCart } = useCart();

  // Define product price details as constants
  const salePrice = 14700;
  const originalPrice = 21000;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size.");
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
    addToCart(product);

  };

  return (
    <div className="product-container">
      {/* Product Images */}
      <div className="product-images-container">
        <div>
          <img src={image1} width={95} alt="Product 1" />
          <img src={image2} width={95} alt="Product 2" />
          <img src={image3} width={95} alt="Product 3" />
        </div>
        <div>
          <img src={productimage} width={400} alt="Main Product" />
        </div>
      </div>

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
            {["Gray", "Black"].map((color) => (
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
            {["Standard", "Customized"].map((size) => (
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
