import * as Dialog from '@radix-ui/react-dialog';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

interface ProductModalProps {
  product: Product;
  trigger: React.ReactNode;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, trigger }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] max-h-[90vh] z-[2001] bg-[#0A0A0A] border border-[rgba(212,175,55,0.2)] rounded-lg overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[300px] md:h-full min-h-[400px]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase mb-2 block">
                    {product.category}
                  </span>
                  <Dialog.Title className="text-3xl font-serif text-[#F5F2EC] mb-2">
                    {product.name}
                  </Dialog.Title>
                  <p className="text-2xl text-[#D4AF37] font-medium">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
                <Dialog.Close className="text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors p-2">
                  <X size={24} />
                </Dialog.Close>
              </div>

              <div className="space-y-4">
                <p className="text-[#A0A0A0] leading-relaxed">
                  {product.description}
                </p>
                
                {product.details && (
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#F5F2EC]/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-auto pt-8">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-md font-medium tracking-widest uppercase text-xs flex items-center justify-center gap-3 transition-all duration-300 ${
                    added 
                    ? 'bg-green-600 text-white' 
                    : 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#F5F2EC]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={18} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
