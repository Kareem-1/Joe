import { useState } from "react";
import "./shoppage.css";
import image1 from '../../assets/img1.jfif';
import image2 from '../../assets/img2.jfif';
import image3 from '../../assets/img3.jfif';
import productimage from '../../assets/productimage.png';
import star from '../../assets/Star.png';
import halfStar from '../../assets/HalfStar.png'

export default function Product() {
    const [orderSize, setOrderSize] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    return (
        <div className="product-container">
            {/* Product Images */}
            <div className="product-images-container">
                <div>
                    <img src={image1} width={100} alt="Product 1" />
                    <img src={image2} width={100} alt="Product 2" />
                    <img src={image3} width={100} alt="Product 3" />
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
                    <img key={5} src={halfStar} alt="Half Star"/>
                    <p>4.6/5</p>
                </div>

                {/* Price Information */}
                <div className="pricing">
                    <p>14700 EGP</p>
                    <p>21000 EGP</p>
                    <p>-40%</p>
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
                        {["Red", "Blue"].map((color) => (
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

                {/* Order Quantity & Button */}
                <div className="order-section">
                    <div className="order-quantity">
                        <button onClick={() => setOrderSize((prev) => Math.max(1, prev - 1))}>-</button>
                        <p>{orderSize}</p>
                        <button onClick={() => setOrderSize((prev) => prev + 1)}>+</button>
                    </div>
                    <div className="order-button">
                        <button>Order Now for Your Clinic</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
