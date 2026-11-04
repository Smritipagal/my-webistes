import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product, CartItem, heroImg } from './data/products';
import { TopNav } from './components/TopNav';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CustomAtelier } from './components/CustomAtelier';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CraftSection } from './components/CraftSection';
import { LookbookModal } from './components/LookbookModal';
import { Footer } from './components/Footer';
import { ArrowDown, SlidersHorizontal, Sparkles, Shield, Compass, Truck } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([
    // Start with 1 tasteful default item in bag to show active capability
    {
      product: PRODUCTS[1], // Sora Fluted Stoneware Vessel
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');

  // Filtering and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeSection, setActiveSection] = useState('home');

  // Cart operations
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = (discount: number, code: string) => {
    setAppliedDiscount(discount);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const scrollToSection = (id: string) => {
    if (id === 'lookbook') {
      setIsLookbookOpen(true);
      return;
    }
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900">
      {/* Strict 3-Zone Top Navigation */}
      <TopNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Hero Showcase */}
      <section id="home" className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 tracking-wider">
                <span>EDITION 2026 COLLECTION</span>
                <span>·</span>
                <span>KYOTO & COPENHAGEN ATELIERS</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal tracking-tight leading-[1.12] text-balance">
                Forms sculpted for silence and permanence.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-xl">
                Architectural furniture, unglazed stoneware vessels, and raw spun brass lighting. Handcrafted by master artisans with materials that age with dignity.
              </p>

              {/* Functional CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('collection')}
                  className="px-6 py-3.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all active:scale-[0.98] shadow-sm flex items-center gap-2"
                >
                  <span>Explore Curated Works</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollToSection('atelier')}
                  className="px-6 py-3.5 bg-white border border-stone-300 text-stone-900 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 hover:border-stone-400 transition-all active:scale-[0.98]"
                >
                  Custom Atelier Studio
                </button>
              </div>

              {/* Adjacent Proof Strip */}
              <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-mono text-stone-400 block mb-0.5 text-[11px]">TIMBER</span>
                  <span className="font-medium text-stone-800">100% Solid FSC Oak & Walnut</span>
                </div>
                <div>
                  <span className="font-mono text-stone-400 block mb-0.5 text-[11px]">WARRANTY</span>
                  <span className="font-medium text-stone-800">15-Year Joinery Guarantee</span>
                </div>
                <div>
                  <span className="font-mono text-stone-400 block mb-0.5 text-[11px]">FREIGHT</span>
                  <span className="font-medium text-stone-800">White-Glove Insured Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Anchor (16:9 Aspect Ratio) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-stone-200 shadow-xl border border-stone-200/80 group">
                <img
                  src={heroImg}
                  alt="Architectural living room with Møller lounge chair and brass lamp"
                  referrerPolicy="no-referrer"
                  className="w-full h-full aspect-[16/10] sm:aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">
                      Featured Interior
                    </span>
                    <span className="font-serif text-sm font-semibold text-stone-900">
                      The Coastal Pavilion · Aarhus, Denmark
                    </span>
                  </div>
                  <button
                    onClick={() => setIsLookbookOpen(true)}
                    className="text-xs font-semibold text-stone-900 hover:text-stone-600 underline underline-offset-4 whitespace-nowrap"
                  >
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Section */}
      <section id="collection" className="py-20 border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span>The Permanent Catalog</span>
                <span>·</span>
                <span className="font-mono tabular-nums">{filteredProducts.length} Objects Available</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">
                Curated Works
              </h2>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Segmented Tabs (Functional Buttons) */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/80">
                {['All', 'Furniture', 'Lighting', 'Ceramics', 'Textiles'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200/70 text-xs font-medium text-stone-800 rounded-lg border border-stone-200 outline-none cursor-pointer font-sans"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Query Filter notice */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-stone-50 px-4 py-2 rounded-lg text-xs text-stone-600 border border-stone-200">
              <span>Filtering by keyword: <strong className="text-stone-900">"{searchQuery}"</strong></span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-500 hover:text-stone-900 font-medium underline"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Product Grid (3-column desktop, 2-column tablet) */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
              <p className="font-serif text-xl text-stone-700 mb-2">No matching objects found</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                Try adjusting your search criteria or explore our complete catalog across all materials.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The Tactile Studio: Interactive Custom Configurator */}
      <section id="atelier">
        <CustomAtelier onAddCustomToCart={(bespoke) => handleAddToCart(bespoke, 1)} />
      </section>

      {/* Material Provenance & Craft Section */}
      <section id="craft">
        <CraftSection />
      </section>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals and Drawers */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountAmount={appliedDiscount}
        discountCode={discountCode}
        onOrderCompleted={handleOrderCompleted}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
