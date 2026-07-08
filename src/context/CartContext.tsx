"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  customerName: string;
  setCustomerName: (name: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');

  // Hydrate cart from localStorage after mount (SSR-safe)
  useEffect(() => {
    const saved = localStorage.getItem('prowealth_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('prowealth_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkoutWhatsApp = () => {
    const phoneNumber = '2349046319498';
    const orderRef = `PW-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    let message = `*PROWEALTH FASHION HOUSE - ORDER REQUEST*\n`;
    message += `------------------------------------------\n`;
    message += `*Order Ref:* ${orderRef}\n`;
    message += `*Date:* ${new Date().toLocaleDateString()}\n`;
    if (customerName) message += `*Customer:* ${customerName}\n`;
    message += `------------------------------------------\n\n`;
    
    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`;
      message += `Category: ${item.category}\n`;
      message += `Qty: ${item.quantity}  |  Price: ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `------------------------------------------\n`;
    message += `*TOTAL AMOUNT: ₦${totalPrice.toLocaleString()}*\n`;
    message += `------------------------------------------\n\n`;
    message += `_This is a generated order request. Admin will confirm availability and provide payment details._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        customerName,
        setCustomerName,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
