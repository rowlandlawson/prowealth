"use client";

import { Drawer } from 'vaul';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquare } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, checkoutWhatsApp, totalItems, customerName, setCustomerName } = useCart();

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <button className="relative p-2 text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors">
          <ShoppingBag size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm" />
        <Drawer.Content 
          className="fixed right-0 top-0 bottom-0 z-[2001] w-full max-w-md bg-[#0A0A0A] border-l border-[rgba(212,175,55,0.2)] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-bottom border-[rgba(212,175,55,0.1)] flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#F5F2EC]">Your Cart</h2>
            <Drawer.Close className="text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors">
              <X size={24} />
            </Drawer.Close>
          </div>

          {/* Name Input for Identity */}
          <div className="px-6 py-4 bg-[#111] border-b border-[rgba(212,175,55,0.1)]">
            <label htmlFor="customer-name" className="block text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
              Your Full Name
            </label>
            <input 
              id="customer-name"
              type="text"
              placeholder="Enter your name to personalize your order"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-black border border-[rgba(212,175,55,0.2)] rounded px-4 py-2 text-sm text-[#F5F2EC] focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#A0A0A0] font-light italic">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-[#111] rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[#F5F2EC] text-sm font-medium mb-1">{item.name}</h3>
                      <p className="text-[#D4AF37] text-sm font-semibold">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[rgba(212,175,55,0.2)] rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#A0A0A0] hover:text-[#F5F2EC]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs text-[#F5F2EC]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#A0A0A0] hover:text-[#F5F2EC]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A0A0A0] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[rgba(212,175,55,0.1)] bg-[#0A0A0A]">
              <div className="flex justify-between mb-6">
                <span className="text-[#A0A0A0] font-light tracking-wide uppercase text-xs">Subtotal</span>
                <span className="text-[#F5F2EC] font-serif text-xl font-medium">₦{totalPrice.toLocaleString()}</span>
              </div>
              <button
                onClick={checkoutWhatsApp}
                className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-md font-medium tracking-widest uppercase text-xs flex items-center justify-center gap-3 hover:bg-[#F5F2EC] transition-all duration-300"
              >
                <MessageSquare size={18} />
                Checkout on WhatsApp
              </button>
              <p className="mt-4 text-[10px] text-[#A0A0A0] text-center italic">
                *Payment and delivery details will be finalized on WhatsApp.
              </p>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
