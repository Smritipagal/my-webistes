import heroImg from '../assets/images/hero_architectural_living_1793759809867.jpg';
import vaseImg from '../assets/images/product_fluted_ceramic_vase_1793759810886.jpg';
import chairImg from '../assets/images/product_walnut_armchair_1793759810990.jpg';
import pendantImg from '../assets/images/product_brass_pendants_1793759811965.jpg';

export { heroImg, vaseImg, chairImg, pendantImg };

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Furniture' | 'Lighting' | 'Ceramics' | 'Textiles';
  price: number;
  image: string;
  inStock: boolean;
  leadTime: string;
  origin: string;
  dimensions: string;
  material: string;
  description: string;
  careGuide: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'moller-armchair',
    name: 'Møller Low Lounge Armchair',
    subtitle: 'Smoked walnut frame with natural textured bouclé upholstery',
    category: 'Furniture',
    price: 1420,
    image: chairImg,
    inStock: true,
    leadTime: 'Ready to ship',
    origin: 'Copenhagen Studio',
    dimensions: 'W 78cm × D 84cm × H 72cm (Seat H 41cm)',
    material: 'Solid European Smoked Walnut, Belgian Linen-Wool Bouclé',
    description: 'An architectural lounge chair shaped through traditional mortise and tenon joinery. The low center of gravity and ergonomically reclined posture invite deep contemplation and stillness.',
    careGuide: 'Condition walnut frame with organic beeswax semi-annually. Dry vacuum bouclé with soft upholstery brush.',
    featured: true
  },
  {
    id: 'sora-fluted-vase',
    name: 'Sora Fluted Stoneware Vessel',
    subtitle: 'Wheel-thrown ribbed ceramic in warm unglazed grog stoneware',
    category: 'Ceramics',
    price: 280,
    image: vaseImg,
    inStock: true,
    leadTime: 'Ready to ship',
    origin: 'Kyoto Kiln Workshop',
    dimensions: 'Diameter 22cm × H 31cm (Neck 11cm)',
    material: 'High-fire coarse iron stoneware, mineral wash glaze inside',
    description: 'Sculpted on a slow kick-wheel and hand-carved with vertical flutes. Each vessel carries the subtle thermal fingerprints of the wood-fired reduction kiln.',
    careGuide: 'Hand wash with mild botanical soap. Fully watertight for fresh floral stems.',
    featured: true
  },
  {
    id: 'aethel-brass-pendants',
    name: 'Aethel Spun Brass Pendant Pair',
    subtitle: 'Solid spun raw brass cones with directional warm ambient glow',
    category: 'Lighting',
    price: 640,
    image: pendantImg,
    inStock: true,
    leadTime: 'Ships in 3 days',
    origin: 'Florence Atelier',
    dimensions: 'Cone Dia 34cm × H 22cm, 250cm woven textile cord',
    material: 'Spun raw cartridge brass, unlacquered with living patina',
    description: 'Pressed from single discs of pure brass, the Aethel pendants cast a warm, concentrated downward cone of light while gently washing surrounding surfaces in golden radiance.',
    careGuide: 'Raw brass naturally patinates over time. Polish with microfiber cloth or let develop an organic dark bronze luster.',
    featured: true
  },
  {
    id: 'travertine-plinth-table',
    name: 'Torino Honed Travertine Plinth',
    subtitle: 'Monolithic low table quarried from Tivoli limestone reserves',
    category: 'Furniture',
    price: 920,
    image: heroImg,
    inStock: true,
    leadTime: 'Ready to ship',
    origin: 'Tivoli, Italy',
    dimensions: 'L 100cm × W 60cm × H 32cm',
    material: 'Natural Roman Travertine stone, matte micro-sealed surface',
    description: 'Sculpted from a single block of natural travertine stone. The surface preserves subtle sediment cavities, hand-finished to a silky matte tactile touch.',
    careGuide: 'Wipe with damp cloth and pH-neutral cleaner. Avoid acidic liquids.',
    featured: false
  },
  {
    id: 'kanso-linen-throw',
    name: 'Kanso Belgian Washed Linen Throw',
    subtitle: 'Dense basket-weave heirloom textile with hand-fringed edging',
    category: 'Textiles',
    price: 195,
    image: chairImg,
    inStock: true,
    leadTime: 'Ready to ship',
    origin: 'Kortrijk, Flanders',
    dimensions: '150cm × 220cm',
    material: '100% Master of Linen certified European flax',
    description: 'Loomed in historic Flanders mills from stone-washed long-staple flax fibers. Delivers a weighted, cooling drape that softens with every wash.',
    careGuide: 'Gentle machine wash at 30°C. Air dry flat to retain natural rumpled texture.',
    featured: false
  },
  {
    id: 'cast-bronze-candlesticks',
    name: 'Archaic Bronze Taper Candlestick Trio',
    subtitle: 'Sand-cast solid bronze holders with calibrated counterweights',
    category: 'Ceramics',
    price: 165,
    image: vaseImg,
    inStock: true,
    leadTime: 'Ready to ship',
    origin: 'Kyoto Kiln Workshop',
    dimensions: 'Set of 3: Heights 18cm, 24cm, 30cm',
    material: 'Cast architectural bronze, brushed matte wax seal',
    description: 'Cast in bonded sand molds with intentionally raw casting seams. Heavy weighted bases ensure stability on stone and wood dining tables.',
    careGuide: 'Gently remove wax with warm water. Polish occasionally with natural paste.',
    featured: false
  },
  {
    id: 'kyoto-bench',
    name: 'Kyoto Solid White Oak Low Bench',
    subtitle: 'Traditional Japanese joinery bench with butterfly keys',
    category: 'Furniture',
    price: 880,
    image: heroImg,
    inStock: false,
    leadTime: 'Made to order (2-3 weeks)',
    origin: 'Kyoto Studio',
    dimensions: 'L 140cm × W 36cm × H 42cm',
    material: 'Quarter-sawn Japanese White Oak, walnut butterfly splines',
    description: 'Crafted without screws or nails using interlocking interlocking joinery. Designed to function as an entryway bench, coffee plinth, or bed-end display.',
    careGuide: 'Clean with dry or slightly damp cotton cloth. Oil annually.',
    featured: true
  },
  {
    id: 'alabaster-sconce-pair',
    name: 'Haze Spanish Alabaster Wall Sconce',
    subtitle: 'Translucent stone discs with hand-brushed bronze backplate',
    category: 'Lighting',
    price: 490,
    image: pendantImg,
    inStock: true,
    leadTime: 'Ships in 5 days',
    origin: 'Zaragoza Workshop',
    dimensions: 'Dia 26cm × D 8cm',
    material: 'Natural Spanish Alabaster, aged dark bronze armature, warm LED',
    description: 'Each carved alabaster disc features unique mineral veining that glows with diffuse, candle-like serenity when illuminated.',
    careGuide: 'Dust with soft feather duster. Hardwired installation recommended.',
    featured: false
  }
];

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish?: string;
}
