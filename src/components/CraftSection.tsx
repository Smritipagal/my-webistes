import React from 'react';
import { ShieldCheck, Compass, Sparkles, Award } from 'lucide-react';

export const CraftSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>Our Workshop Philosophy</span>
            <span>·</span>
            <span>Kyoto & Copenhagen Ateliers</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tight leading-tight mb-4">
            Materials that honor time, crafted with uncompromising restraint.
          </h2>
          <p className="text-base text-stone-600 font-sans leading-relaxed">
            We reject the disposable cadence of modern mass production. Every piece is built to be touched, lived with, and passed down through generations—developing a richer patina with each passing year.
          </p>
        </div>

        {/* Claim-to-Proof Adjacency Cards (3 Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-stone-400 block mb-2">01. TIMBER PROVENANCE</span>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
                100% FSC-Certified European Hardwoods
              </h3>
              <p className="text-sm text-stone-600 font-sans leading-relaxed">
                Slow-growth Danish oak and French walnut dried naturally over 24 months to ensure dimensional stability in diverse architectural climates.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-200 text-xs text-stone-500 font-mono">
              VERIFIED HARVEST RECORD: LOT-DK88
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-stone-400 block mb-2">02. STRUCTURAL HONESTY</span>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
                Interlocking Mortise & Tenon Joinery
              </h3>
              <p className="text-sm text-stone-600 font-sans leading-relaxed">
                Assembled without concealed screws or fast synthetic glues. Each joint flexes naturally with atmospheric humidity cycles, guaranteed for 15 years.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-200 text-xs text-stone-500 font-mono">
              15-YEAR ATELIER INTEGRITY WARRANTY
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-stone-400 block mb-2">03. ORGANIC FINISHES</span>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">
                Cold-Pressed Oils & Natural Beeswax
              </h3>
              <p className="text-sm text-stone-600 font-sans leading-relaxed">
                Zero polyurethane lacquers or toxic VOC off-gassing. Surfaces breathe freely, allowing the warm natural scent of cedar and walnut to fill interior rooms.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-200 text-xs text-stone-500 font-mono">
              FOOD-SAFE & BREATHABLE BOTANICAL SEAL
            </div>
          </div>
        </div>

        {/* Editorial Press Proof */}
        <div className="border-t border-stone-200 pt-16">
          <div className="text-xs text-stone-400 font-mono uppercase tracking-wider mb-8 text-center sm:text-left">
            Recognized in Architectural & Design Discourse
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="p-6 bg-stone-50/60 rounded-xl border border-stone-100">
              <p className="font-serif text-sm italic text-stone-800 mb-4 leading-relaxed">
                "Kroma & Co. creates objects of profound quietude. In a world saturated with synthetic gloss, their woodwork feels like an anchor."
              </p>
              <footer className="text-xs text-stone-500 font-sans">
                <span className="font-semibold text-stone-800">Architectural Digest</span> · Editorial Feature, 2026
              </footer>
            </blockquote>

            <blockquote className="p-6 bg-stone-50/60 rounded-xl border border-stone-100">
              <p className="font-serif text-sm italic text-stone-800 mb-4 leading-relaxed">
                "Their Møller Lounge demonstrates how centuries-old Japanese jointure can elevate modern Scandinavian domestic spaces into sanctuaries."
              </p>
              <footer className="text-xs text-stone-500 font-sans">
                <span className="font-semibold text-stone-800">Wallpaper* Magazine</span> · Annual Design Awards
              </footer>
            </blockquote>

            <blockquote className="p-6 bg-stone-50/60 rounded-xl border border-stone-100">
              <p className="font-serif text-sm italic text-stone-800 mb-4 leading-relaxed">
                "The rare studio that prices handcrafted objects fairly while ensuring artisans maintain unhurried, generational studio practices."
              </p>
              <footer className="text-xs text-stone-500 font-sans">
                <span className="font-semibold text-stone-800">Monocle</span> · Craft & Enterprise Review
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
