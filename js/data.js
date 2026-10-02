/**
 * Casa Gold - Product Data
 * Centralized so it can later be replaced by an API
 */

const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "rings", name: "Rings" },
  { id: "necklaces", name: "Necklaces" },
  { id: "earrings", name: "Earrings" },
  { id: "bracelets", name: "Bracelets" },
  { id: "sets", name: "Sets" }
];

const PRODUCTS = [
  {
    id: 1,
    slug: "aurora-gold-ring",
    name: "Aurora Gold Ring",
    category: "rings",
    price: 185000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80"
    ],
    description: "A luminous 18k gold ring with a refined, timeless silhouette. Designed to catch the light with every movement.",
    details: "18k solid gold • Hand-finished • Weight: 4.2g",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.9,
    reviewCount: 28,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    slug: "lumen-necklace",
    name: "Lumen Necklace",
    category: "necklaces",
    price: 320000,
    originalPrice: 360000,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ],
    description: "An elegant gold necklace featuring a delicate chain and a radiant pendant that sits perfectly at the collarbone.",
    details: "18k gold • Adjustable length 40–45cm • Pendant diameter 12mm",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.8,
    reviewCount: 41,
    isNew: false,
    isFeatured: true
  },
  {
    id: 3,
    slug: "solara-hoop-earrings",
    name: "Solara Hoop Earrings",
    category: "earrings",
    price: 145000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
    ],
    description: "Bold yet refined gold hoops that frame the face with quiet confidence. Lightweight for all-day wear.",
    details: "18k gold • Diameter 35mm • Secure hinged closure",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.7,
    reviewCount: 19,
    isNew: true,
    isFeatured: false
  },
  {
    id: 4,
    slug: "celeste-bracelet",
    name: "Celeste Bracelet",
    category: "bracelets",
    price: 275000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    description: "A sculptural gold bracelet with a soft, organic form. Designed to feel substantial yet graceful on the wrist.",
    details: "18k gold • Inner circumference 16.5cm • Polished finish",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.9,
    reviewCount: 33,
    isNew: false,
    isFeatured: true
  },
  {
    id: 5,
    slug: "noir-signet-ring",
    name: "Noir Signet Ring",
    category: "rings",
    price: 210000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80"
    ],
    description: "A modern take on the classic signet. Clean lines and a slightly oversized face for contemporary elegance.",
    details: "18k gold • Face 12×14mm • Available in sizes 5–9",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.6,
    reviewCount: 15,
    isNew: false,
    isFeatured: false
  },
  {
    id: 6,
    slug: "amber-drop-earrings",
    name: "Amber Drop Earrings",
    category: "earrings",
    price: 168000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"
    ],
    description: "Fluid gold drops that move with you. Soft curves and a warm glow that elevates any look.",
    details: "18k gold • Drop length 28mm • Post and butterfly backing",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.8,
    reviewCount: 22,
    isNew: true,
    isFeatured: false
  },
  {
    id: 7,
    slug: "heritage-chain-necklace",
    name: "Heritage Chain Necklace",
    category: "necklaces",
    price: 395000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
    ],
    description: "A substantial yet refined chain necklace. The kind of piece that becomes a signature.",
    details: "18k gold • Length 45cm • Link width 4.5mm",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 5.0,
    reviewCount: 12,
    isNew: false,
    isFeatured: true
  },
  {
    id: 8,
    slug: "luna-bangle",
    name: "Luna Bangle",
    category: "bracelets",
    price: 240000,
    originalPrice: 280000,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    description: "A sleek open bangle with a subtle curve. Effortless to wear alone or stacked.",
    details: "18k gold • Diameter 6.2cm • Open design",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.7,
    reviewCount: 27,
    isNew: false,
    isFeatured: false
  },
  {
    id: 9,
    slug: "eclipse-stacking-rings",
    name: "Eclipse Stacking Rings",
    category: "rings",
    price: 95000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80"
    ],
    description: "A set of three delicate stacking rings. Mix and match or wear as a refined trio.",
    details: "18k gold • Set of 3 • Band width 1.2–1.8mm",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.9,
    reviewCount: 48,
    isNew: true,
    isFeatured: false
  },
  {
    id: 10,
    slug: "radiant-pendant-set",
    name: "Radiant Pendant Set",
    category: "sets",
    price: 420000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ],
    description: "A matching necklace and earring set designed to be worn together or separately. Pure elegance.",
    details: "18k gold • Necklace + matching studs • Gift box included",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.8,
    reviewCount: 16,
    isNew: false,
    isFeatured: true
  },
  {
    id: 11,
    slug: "velvet-cuff",
    name: "Velvet Cuff",
    category: "bracelets",
    price: 310000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
    ],
    description: "A wide, sculptural cuff with a soft brushed finish. Statement without the noise.",
    details: "18k gold • Width 18mm • Adjustable open fit",
    material: "18k Yellow Gold",
    inStock: false,
    rating: 4.9,
    reviewCount: 9,
    isNew: false,
    isFeatured: false
  },
  {
    id: 12,
    slug: "dawn-stud-earrings",
    name: "Dawn Stud Earrings",
    category: "earrings",
    price: 78000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"
    ],
    description: "Minimal gold studs with a soft dome shape. Everyday luxury at its purest.",
    details: "18k gold • Dome diameter 6mm • Secure friction backs",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.8,
    reviewCount: 61,
    isNew: false,
    isFeatured: false
  },
  {
    id: 13,
    slug: "oracle-ring",
    name: "Oracle Ring",
    category: "rings",
    price: 255000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80"
    ],
    description: "An architectural gold ring with clean geometric lines. Bold yet balanced.",
    details: "18k gold • Architectural form • Available in sizes 5–9",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.7,
    reviewCount: 14,
    isNew: true,
    isFeatured: false
  },
  {
    id: 14,
    slug: "serenity-choker",
    name: "Serenity Choker",
    category: "necklaces",
    price: 290000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
    ],
    description: "A close-fitting gold choker with a refined clasp. Modern, intimate, and powerful.",
    details: "18k gold • Length 36cm + 5cm extender • Box clasp",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.6,
    reviewCount: 11,
    isNew: false,
    isFeatured: false
  },
  {
    id: 15,
    slug: "essence-set",
    name: "Essence Set",
    category: "sets",
    price: 485000,
    originalPrice: 540000,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ],
    description: "Necklace, bracelet and earrings in perfect harmony. A complete expression of quiet luxury.",
    details: "18k gold • Full set of 3 pieces • Presented in signature box",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 5.0,
    reviewCount: 7,
    isNew: true,
    isFeatured: true
  },
  {
    id: 16,
    slug: "halo-ring",
    name: "Halo Ring",
    category: "rings",
    price: 198000,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80"
    ],
    description: "A softly rounded gold band that feels continuous and complete. Designed for everyday wear.",
    details: "18k gold • Band width 3.5mm • Comfort fit",
    material: "18k Yellow Gold",
    inStock: true,
    rating: 4.9,
    reviewCount: 36,
    isNew: false,
    isFeatured: false
  }
];

// Helper: format price in Nigerian Naira
function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}