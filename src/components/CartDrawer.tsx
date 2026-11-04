import React, { useState } from 'react';
import { CartItem } from '../data/products';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const freeShippingThreshold = 500;
  const shippingCost = rawSubtotal >= freeShippingThreshold || items.length === 0 ? 0 : 45;
  const finalTotal = subtotalAfterDiscount + shippingCost;
  const progressToFreeShipping = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'ARCHITECT10') {
      setDiscountPercent(10);
      setAppliedCode('ARCHITECT10');
      setCouponCode('');
    } else {
      setCouponError('Invalid code. Try ARCHITECT10 for 10% off.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#fbf9f6] border-l border-stone-200 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-semibold text-stone-900">Your Selection</h2>
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100"
                aria-label="Close bag"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <div className="flex justify-between text-xs mb-1.5 font-sans">
                {rawSubtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Qualified for White-Glove Courier Delivery
                  </span>
                ) : (
                  <span className="text-stone-600">
                    Add <span className="font-mono font-semibold">${freeShippingThreshold - rawSubtotal}</span> for complimentary shipping
                  </span>
                )}
                <span className="font-mono text-stone-400 text-[11px] tabular-nums">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-800 transition-all duration-300 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          </div>

          {/* Item List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-stone-200/80">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <p className="font-serif text-lg text-stone-600 mb-2">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs font-sans mb-6">
                  Explore our curated architectural objects or commission a bespoke work from the Tactile Studio.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-start">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1 mb-2 font-sans">
                      {item.product.material}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-medium text-stone-900 tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 text-xs"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-mono text-xs tabular-nums text-stone-800 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-stone-400 hover:text-red-700 transition-colors p-1"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Total */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. ARCHITECT10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-stone-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </form>
              {appliedCode && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  <span>Code {appliedCode} applied (10% off)</span>
                  <button
                    onClick={() => {
                      setAppliedCode('');
                      setDiscountPercent(0);
                    }}
                    className="text-stone-500 hover:text-stone-800 font-mono text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-amber-700 font-sans">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">${rawSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Atelier Privilege (10%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Courier Freight</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                  <span>Total Due</span>
                  <span className="font-mono text-base tabular-nums">${finalTotal.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, appliedCode)}
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Insured Global Freight & 30-Day Return Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
