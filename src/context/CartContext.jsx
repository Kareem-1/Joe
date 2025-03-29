// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    /*
      item = {
        name: string,
        selectedColor: string,
        selectedSize: string,
        image: string,
        price: number,
        originalPrice: number,
        orderSize: number // quantity
      }
    */
    setCartItems((prev) => {
      // Find an existing item with the same name, color, and size
      const existingIndex = prev.findIndex(
        (cartItem) =>
          cartItem.name === item.name &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prev];
        // Instead of replacing the quantity, add the new orderSize to the existing one
        updatedItems[existingIndex].orderSize += item.orderSize / 2;
        return updatedItems;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
