import React, { useState } from 'react';
import { Product, heroImg, vaseImg, pendantImg } from '../data/products';
import { X, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface RoomScene {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  featuredProductIds: string[];
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'nordic-residence',
    title: 'The Coastal Pavilion',
    location: 'Aarhus, Denmark',
    description: 'Polished micro-cement floor plates paired with raw bleached oak woodwork and sheer linen drapery, captured in soft morning fjord light.',
    image: heroImg,
    featuredProductIds: ['moller-armchair', 'aethel-brass-pendants', 'travertine-plinth-table'],
  },
  {
    id: 'kyoto-tea-study',
    title: 'The Kyoto Tea Sanctuary',
    location: 'Higashiyama, Kyoto',
    description: 'Unglazed stoneware and sand-cast bronze candlesticks grounded upon tatami rush matting and cedar partition screens.',
    image: vaseImg,
    featuredProductIds: ['sora-fluted-vase', 'cast-bronze-candlesticks', 'kyoto-bench'],
  },
  {
    id: 'lofted-atelier',
    title: 'The Stone Gallery Loft',
    location: 'Tivoli & Florence',
    description: 'Monolithic honed travertine low tables illuminated by spun cartridge brass pendant lighting.',
    image: pendantImg,
    featuredProductIds: ['aethel-brass-pendants', 'travertine-plinth-table', 'moller-armchair'],
  },
];

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [activeScene, setActiveScene] = useState<RoomScene>(ROOM_SCENES[0]);

  if (!isOpen) return null;

  const sceneProducts = products.filter((p) => activeScene.featuredProductIds.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors z-10"
          aria-label="Close lookbook"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span>Spatial Lookbook</span>
            <span>·</span>
            <span>Objects in Architecture</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
            Inhabited Spaces
          </h2>
        </div>

        {/* Room Scene Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-stone-200">
          {ROOM_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeScene.id === scene.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900'
              }`}
            >
              {scene.title} ({scene.location})
            </button>
          ))}
        </div>

        {/* Active Scene Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] bg-stone-100 rounded-xl overflow-hidden shadow-sm border border-stone-200">
              <img
                src={activeScene.image}
                alt={activeScene.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-xs text-stone-600 font-sans leading-relaxed">
              {activeScene.description}
            </p>
          </div>

          {/* Featured Works in this space */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
              Objects Commissioned for This Space
            </h3>
            <div className="space-y-3">
              {sceneProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-stone-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                        {p.name}
                      </h4>
                      <span className="font-mono text-xs text-stone-500 tabular-nums">
                        ${p.price.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                  <div className="text-stone-400 group-hover:text-stone-900 transition-colors p-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
