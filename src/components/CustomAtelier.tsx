import React, { useState } from 'react';
import { Product } from '../data/products';
import { Check, Sparkles, Layers, Sliders, Box, ArrowRight } from 'lucide-react';

interface CustomAtelierProps {
  onAddCustomToCart: (product: Product) => void;
}

interface Archetype {
  id: string;
  name: string;
  category: 'Furniture' | 'Lighting' | 'Ceramics' | 'Textiles';
  basePrice: number;
  image: string;
  dimensions: string;
  baseWeight: string;
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'bespoke-chair',
    name: 'Møller Architectural Lounge',
    category: 'Furniture',
    basePrice: 1420,
    image: '/src/assets/images/product_walnut_armchair_1793759810990.jpg',
    dimensions: 'W 78cm × D 84cm × H 72cm',
    baseWeight: '19.5 kg'
  },
  {
    id: 'bespoke-table',
    name: 'Torino Monolith Plinth',
    category: 'Furniture',
    basePrice: 920,
    image: '/src/assets/images/hero_architectural_living_1793759809867.jpg',
    dimensions: 'L 100cm × W 60cm × H 32cm',
    baseWeight: '42.0 kg'
  },
  {
    id: 'bespoke-pendant',
    name: 'Aethel Spun Pendant',
    category: 'Lighting',
    basePrice: 640,
    image: '/src/assets/images/product_brass_pendants_1793759811965.jpg',
    dimensions: 'Dia 34cm × H 22cm',
    baseWeight: '4.8 kg'
  }
];

const TIMBER_STONE_FINISHES = [
  { id: 'smoked-walnut', name: 'Smoked European Walnut', priceDelta: 180, color: '#3d2b1f', note: 'Dark espresso tone with warm mineral streaks' },
  { id: 'nordic-oak', name: 'Bleached Nordic Oak', priceDelta: 0, color: '#d8c2a3', note: 'Natural pale honey tone, ultra-matte finish' },
  { id: 'tivoli-travertine', name: 'Honed Tivoli Travertine', priceDelta: 260, color: '#e5dec9', note: 'Warm porous limestone with honed matte texture' },
  { id: 'cast-bronze', name: 'Cast Blackened Bronze', priceDelta: 340, color: '#272521', note: 'Sand-cast patinated architectural alloy' },
];

const TEXTILE_ACCENTS = [
  { id: 'ecru-boucle', name: 'Ecru Wool-Linen Bouclé', priceDelta: 0, tone: 'Natural Off-White' },
  { id: 'saddle-leather', name: 'Vegetable-Tanned Saddle Leather', priceDelta: 190, tone: 'Warm Cognac Patina' },
  { id: 'flax-linen', name: 'Heavy Belgian Flax Linen', priceDelta: 60, tone: 'Oatmeal Basketweave' },
  { id: 'charcoal-twill', name: 'Charcoal Merino Wool Twill', priceDelta: 110, tone: 'Deep Graphite' },
];

export const CustomAtelier: React.FC<CustomAtelierProps> = ({ onAddCustomToCart }) => {
  const [selectedArchetype, setSelectedArchetype] = useState(ARCHETYPES[0]);
  const [selectedFinish, setSelectedFinish] = useState(TIMBER_STONE_FINISHES[0]);
  const [selectedTextile, setSelectedTextile] = useState(TEXTILE_ACCENTS[0]);
  const [addedNotice, setAddedNotice] = useState(false);

  const totalPrice = selectedArchetype.basePrice + selectedFinish.priceDelta + selectedTextile.priceDelta;

  const handleCreateAndAdd = () => {
    const bespokeProduct: Product = {
      id: `bespoke-${Date.now()}`,
      name: `${selectedArchetype.name} (Bespoke)`,
      subtitle: `${selectedFinish.name} with ${selectedTextile.name}`,
      category: selectedArchetype.category,
      price: totalPrice,
      image: selectedArchetype.image,
      inStock: true,
      leadTime: 'Crafted to Order · 3-4 Weeks',
      origin: 'Bespoke Kyoto/Copenhagen Atelier',
      dimensions: selectedArchetype.dimensions,
      material: `${selectedFinish.name}, ${selectedTextile.name}`,
      description: `A custom-commissioned architectural piece specified with ${selectedFinish.name} and upholstered in ${selectedTextile.name}. Hand-stamped with individual atelier serial number.`,
      careGuide: 'Condition natural surfaces with included botanical beeswax balm. Treat textiles with gentle spot cleaning.',
      featured: false
    };

    onAddCustomToCart(bespokeProduct);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <section className="py-20 bg-stone-100 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>Atelier Configurator</span>
            <span>·</span>
            <span>Interactive Material Studio</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-3">
            The Tactile Studio
          </h2>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Specify timber grains, raw quarried stone, and loomed textiles to commission a piece shaped exclusively for your architectural space.
          </p>
        </div>

        {/* Configurator Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Visual Specimen Display */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm sticky top-24">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-50 mb-6">
              <img
                src={selectedArchetype.image}
                alt={selectedArchetype.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded">
                SPECIMEN: {selectedArchetype.id.toUpperCase()}
              </div>
            </div>

            {/* Live Config Summary */}
            <div className="space-y-3 pb-6 border-b border-stone-200">
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Archetype</span>
                <span className="font-semibold text-stone-900">{selectedArchetype.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Core Surface</span>
                <span className="font-medium text-stone-900">{selectedFinish.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Accent / Textile</span>
                <span className="font-medium text-stone-900">{selectedTextile.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Dimensions</span>
                <span className="font-mono tabular-nums text-stone-700">{selectedArchetype.dimensions}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Estimated Weight</span>
                <span className="font-mono tabular-nums text-stone-700">{selectedArchetype.baseWeight}</span>
              </div>
            </div>

            {/* Price & Commission CTA */}
            <div className="pt-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-stone-500 uppercase tracking-wider font-mono">Commission Total</span>
                <span className="font-mono text-3xl font-bold text-stone-900 tabular-nums">
                  ${totalPrice.toLocaleString()} USD
                </span>
              </div>

              <button
                onClick={handleCreateAndAdd}
                className={`w-full py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  addedNotice
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.99] shadow-sm'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Commission Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Commission Bespoke Piece</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Archetype */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-4 h-4 text-stone-700" />
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider font-mono">
                  1. Select Architectural Form
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ARCHETYPES.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => setSelectedArchetype(arch)}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      selectedArchetype.id === arch.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <span className="block font-medium text-xs text-stone-900 mb-1">{arch.name}</span>
                    <span className="block text-xs font-mono text-stone-500 tabular-nums">
                      From ${arch.basePrice.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Core Timber / Stone Material */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-stone-700" />
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider font-mono">
                  2. Select Timber & Stone Surface
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIMBER_STONE_FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className={`p-4 text-left rounded-xl border transition-all flex items-start gap-3 ${
                      selectedFinish.id === finish.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shrink-0 border border-stone-300 mt-0.5 shadow-inner"
                      style={{ backgroundColor: finish.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-900">{finish.name}</span>
                        <span className="text-xs font-mono text-stone-500 tabular-nums">
                          {finish.priceDelta === 0 ? 'Included' : `+$${finish.priceDelta}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-normal font-sans">
                        {finish.note}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Loomed Textile or Accent */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="w-4 h-4 text-stone-700" />
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider font-mono">
                  3. Select Loomed Textile / Accent
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEXTILE_ACCENTS.map((textile) => (
                  <button
                    key={textile.id}
                    onClick={() => setSelectedTextile(textile)}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      selectedTextile.id === textile.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-stone-900">{textile.name}</span>
                      <span className="text-xs font-mono text-stone-500 tabular-nums">
                        {textile.priceDelta === 0 ? 'Standard' : `+$${textile.priceDelta}`}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 block font-sans">Tone: {textile.tone}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
