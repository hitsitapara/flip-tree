import axios from 'axios';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}
interface CartItem {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
interface CartResponse {
  carts: CartItem[];
  total: number;
  skip: number;
  limit: number;
}

interface CartContextType {
  cart: CartResponse;
  fetchCart: (userId: number) => Promise<void>;
  addToCart: (
    product: { id: number; quantity: number }[],
    userId: number,
  ) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartResponse>({
    carts: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  // Fetch cart data from API
  const fetchCart = async (userId: number) => {
    try {
      console.log('-caacalles');
      const response = await axios.get(
        `https://dummyjson.com/carts/user/${userId}`,
      );
      const apiCart = response.data;
      setCart(apiCart);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Add product to cart using API
  const addToCart = async (
    product: { id: number; quantity: number }[],
    userId: number,
  ) => {
    await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        products: product,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  // Remove product from cart using API
  const removeFromCart = async (id: number) => {
    await fetch(`https://dummyjson.com/carts/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };

  // Clear the cart using API
  const clearCart = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/1`);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Calculate total price

  const getTotalPrice = () => {
    if (cart) {
      return cart.carts.reduce((acc, item) => acc + item.total, 0);
    } else {
      return 0;
    }
  };

  const contextValue = useMemo(
    () => ({
      cart,
      fetchCart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
    }),
    [cart, fetchCart, addToCart, removeFromCart, clearCart, getTotalPrice],
  );
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
