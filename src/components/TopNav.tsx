import React, { useState } from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';

interface TopNavProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Promotional Top Strip (Single Line, Dismissible, <= 40px) */}
      {showPromo && (
        <div className="bg-stone-900 text-stone-200 text-xs px-4 py-2 flex items-center justify-between tracking-wide">
          <div className="flex-1 text-center font-sans">
            <span>Complimentary white-glove courier delivery on bespoke orders over $500</span>
            <span className="mx-2 text-stone-500 hidden sm:inline">·</span>
            <span className="text-stone-400 hidden sm:inline font-mono">CODE: ARCHITECT10 for 10% off</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="text-stone-400 hover:text-white p-0.5 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl md:text-2xl font-serif tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity text-left"
        >
          KROMA & CO.
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('collection')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeSection === 'collection'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Curated Objects
          </button>
          <button
            onClick={() => onNavigate('atelier')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeSection === 'atelier'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Custom Atelier
          </button>
          <button
            onClick={() => onNavigate('craft')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeSection === 'craft'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Material Provenance
          </button>
          <button
            onClick={() => onNavigate('lookbook')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-all ${
              activeSection === 'lookbook'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Spatial Lookbook
          </button>
        </nav>

        {/* Zone 3: Actions (Search affordance + Shopping Bag) */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search Toggle / Inline Input */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 bg-stone-100 rounded-full px-3 py-1.5 border border-stone-300">
                <Search className="w-3.5 h-3.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search timber, stone..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-stone-900 outline-none w-32 sm:w-44 placeholder:text-stone-400 font-sans"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Primary Action: Shopping Bag with Tabular Counter */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 shadow-sm"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="font-sans">Bag</span>
            <span className="font-mono tabular-nums px-1.5 py-0.2 bg-stone-700 rounded text-[11px] text-stone-100">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
