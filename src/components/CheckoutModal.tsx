import React, { useState } from 'react';
import { CartItem } from '../data/products';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Package } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  discountCode,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'cod', // 'cod' | 'card' | 'wire'
    deliveryNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = rawSubtotal >= 500 || items.length === 0 ? 0 : 45;
  const grandTotal = rawSubtotal - discountAmount + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate atelier order processing
    setTimeout(() => {
      const generatedOrder = `KR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderCompleted();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" />
        </button>

        {orderConfirmed ? (
          /* Order Confirmation Receipt State */
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-stone-500 mb-2">
              <span>Atelier Order Confirmed</span>
              <span>·</span>
              <span className="font-mono text-stone-900 font-semibold">{orderNumber}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold mb-3">
              Thank you, {formData.fullName || 'Collector'}
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 font-sans">
              Your architectural order has been received by our master craftsmen. We have dispatched your dispatch dossier to{' '}
              <strong className="text-stone-900">{formData.email || 'your email'}</strong>.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 text-left mb-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs pb-3 border-b border-stone-200 mb-3">
                <span className="text-stone-500">Destination</span>
                <span className="font-medium text-stone-800 text-right">{formData.address || 'Address provided'}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-xs pb-3 border-b border-stone-200 mb-3">
                <span className="text-stone-500">Selected Payment</span>
                <span className="font-medium text-stone-800 capitalize">
                  {formData.paymentMethod === 'cod' ? 'Cash on White-Glove Delivery' : formData.paymentMethod === 'card' ? 'Secure Credit Card' : 'Direct Studio Wire'}
                </span>
              </div>
              <div className="flex justify-between text-xs pb-3 border-b border-stone-200 mb-3">
                <span className="text-stone-500">Estimated Dispatch</span>
                <span className="font-mono text-stone-800 font-medium">Within 3–5 Business Days</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-1">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">${grandTotal.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              Continue Exploring Collection
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span>Secure Checkout</span>
              <span>·</span>
              <span>White-Glove Delivery Concierge</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">
              Delivery & Order Verification
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Full Legal Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Helena Bergqvist"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email for Dossier *</label>
                  <input
                    required
                    type="email"
                    placeholder="helena@architects.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">Delivery Address *</label>
                  <input
                    required
                    type="text"
                    placeholder="Street name, suite, or studio number"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Telephone Contact *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                  <input
                    required
                    type="text"
                    placeholder="Stockholm / New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Postal Code *</label>
                  <input
                    required
                    type="text"
                    placeholder="104 35"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-600 font-sans"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">Preferred Payment Arrangement</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-stone-800 mb-1.5" />
                    <span className="block text-xs font-semibold text-stone-900">Cash on Delivery</span>
                    <span className="block text-[11px] text-stone-500 font-sans">Inspect piece before payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-stone-800 mb-1.5" />
                    <span className="block text-xs font-semibold text-stone-900">Credit / Debit</span>
                    <span className="block text-[11px] text-stone-500 font-sans">Encrypted 256-bit checkout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      formData.paymentMethod === 'wire'
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-stone-800 mb-1.5" />
                    <span className="block text-xs font-semibold text-stone-900">Direct Studio Wire</span>
                    <span className="block text-[11px] text-stone-500 font-sans">Commercial invoice billing</span>
                  </button>
                </div>
              </div>

              {/* Order Summary & Submit Button */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-xs text-stone-500 block">Total Due Upon Order</span>
                  <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
                    ${grandTotal.toLocaleString()} USD
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <span>Confirm Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
