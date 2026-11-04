import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Check, Shield, Truck, Clock, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 bg-white/80 rounded-full border border-stone-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery Showcase */}
          <div className="bg-stone-100 flex flex-col justify-center items-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-stone-200">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[380px] w-full object-cover rounded-xl shadow-sm"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
                Artisan Specimen No. {product.id.slice(0, 6).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.origin}</span>
                <span>·</span>
                <span className="text-stone-700 font-medium">{product.leadTime}</span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-semibold tracking-tight mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-stone-600 mb-4 font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-6 pb-4 border-b border-stone-100">
                <span className="text-xs text-stone-400 block mb-0.5">Direct Atelier Price</span>
                <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                  ${product.price.toLocaleString()} USD
                </span>
              </div>

              {/* Specifications Matrix */}
              <div className="space-y-2.5 mb-6 text-xs text-stone-700">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-400 font-medium">Materials</span>
                  <span className="text-right font-sans font-medium text-stone-800 max-w-[200px]">{product.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-400 font-medium">Dimensions</span>
                  <span className="font-mono tabular-nums text-stone-800">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-400 font-medium">Care Protocol</span>
                  <span className="text-right font-sans text-stone-600 max-w-[200px]">{product.careGuide}</span>
                </div>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-stone-50 rounded-lg text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-stone-800" />
                  <span>15-Year Structural Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-stone-800" />
                  <span>White-Glove Insured Delivery</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs text-stone-500 font-medium">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-mono text-xs tabular-nums text-stone-900 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.99] shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Your Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag</span>
                    <span className="font-mono tabular-nums">· ${(product.price * quantity).toLocaleString()}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
