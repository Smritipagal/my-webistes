import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-2xl text-white tracking-tight mb-4">
              KROMA & CO.
            </h3>
            <p className="text-sm text-stone-400 font-sans leading-relaxed max-w-sm mb-6">
              Handcrafted architectural furniture, monolithic stone plinths, and wheel-thrown stoneware. Designed in Copenhagen and shaped by master artisans in Kyoto and Flanders.
            </p>
            <div className="text-xs text-stone-500 font-mono space-y-1">
              <p>Copenhagen Atelier: Bredgade 34, 1260 København K</p>
              <p>Kyoto Workshop: Higashiyama-ku, Kyoto 605-0862</p>
            </div>
          </div>

          {/* Clean Navigation Columns */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6 text-xs font-sans">
            <div>
              <span className="text-stone-100 font-medium block mb-4 uppercase tracking-wider font-mono">
                Collection
              </span>
              <ul className="space-y-2.5 text-stone-400">
                <li><a href="#collection" className="hover:text-white transition-colors">Furniture</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Lighting</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Ceramics</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Textiles</a></li>
                <li><a href="#atelier" className="hover:text-white transition-colors">Bespoke Orders</a></li>
              </ul>
            </div>
            <div>
              <span className="text-stone-100 font-medium block mb-4 uppercase tracking-wider font-mono">
                Atelier
              </span>
              <ul className="space-y-2.5 text-stone-400">
                <li><a href="#craft" className="hover:text-white transition-colors">Provenance</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">FSC Timber</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Care Protocol</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Trade Inquiries</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Press Dossier</a></li>
              </ul>
            </div>
          </div>

          {/* Dispatch Journal / Newsletter */}
          <div className="md:col-span-4">
            <span className="text-stone-100 font-medium block mb-2 uppercase tracking-wider text-xs font-mono">
              The Atelier Journal
            </span>
            <p className="text-xs text-stone-400 font-sans leading-relaxed mb-4">
              Receive seasonal monograph releases, private studio kiln openings, and material harvesting chronicles.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-800/80 border border-emerald-800 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been added to the private studio ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="architect@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-stone-800 border border-stone-700 text-white rounded-lg outline-none focus:border-stone-500 font-sans placeholder:text-stone-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-100 hover:bg-white text-stone-900 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500 mt-2 font-sans">
              Published quarterly. Never shared with third parties.
            </p>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
          <p>© 2026 Kroma & Co. Architectural Living ApS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Natural Material Disclosure</span>
            <span>·</span>
            <span>Terms of Commission</span>
            <span>·</span>
            <span>Privacy Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
