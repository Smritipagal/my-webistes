import React, { useState } from 'react';
import { Product } from '../data/products';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group cursor-pointer flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
    >
      {/* Product Image Slot (65%-75% visual dominance) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-6 text-center">
            <span className="font-serif text-lg text-stone-600 mb-1">{product.name}</span>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">{product.material}</span>
          </div>
        )}

        {/* Quick View Floating Pill-Free Button on Hover */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-2 bg-white/95 text-stone-900 text-xs font-medium rounded-lg shadow-sm hover:bg-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Object</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin}</span>
            <span aria-hidden="true">·</span>
            <span className={product.inStock ? 'text-emerald-700' : 'text-amber-800'}>
              {product.leadTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-stone-900 leading-snug tracking-tight mb-1 group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          {/* Subtitle / Material Notes */}
          <p className="text-xs text-stone-500 line-clamp-1 mb-4 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Price Baseline and Direct Purchase Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-400 block font-sans">Price</span>
            <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
