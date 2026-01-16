import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

// Mirror the fallback dataset from list route
const FALLBACK_INDEX = {
  "pet-plus-iron": {
    slug: "pet-plus-iron",
    title: "Pet + Iron",
    brand: "Ollie's Paw",
    price: 450,
    originalPrice: 550,
    badge: null,
    category: "dog",
    subCategory: "Immunity Boosters",
    petCategory: "Health & Wellness",
    customerFavourite: true,
    featuredCategory: true,
    featuredBrand: false,
    dietaryInfo: "Iron supplement for dogs",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/PET IRON.jpeg", alt: "Pet + Iron" },
    ],
    description: "<p>Pet + Iron is a premium liquid animal feed supplement formulated to support healthy growth, development, and overall vitality in pets. It is enriched with chelated iron, essential trace minerals, and B-complex vitamins to help manage anemia, reduce fatigue, and preserve energy levels. The supplement also supports immune function and aids recovery during periods of weakness, nutritional deficiency, or convalescence.</p><p>It's easy-to-administer liquid formulation ensures better absorption and convenience, making it suitable for daily nutritional support for pets.</p>",
    nutritionInfo: "<p><strong>Each 10 ml contains:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Chelated Ferrous Glycinate – 100 mg<br/>(Equivalent to 20 mg of Iron)</li><li>Chelated Copper Glycinate – 50 mg<br/>(Equivalent to 10 mg of Copper)</li><li>Chelated Cobalt Glycinate – 40 mg<br/>(Equivalent to 4 mg of Cobalt)</li><li>Vitamin B2 (Riboflavin) – 1 mg</li><li>Vitamin B3 (Nicotinic Acid) – 5 mg</li><li>Vitamin B5 (Pyridoxine) – 0.5 mg</li><li>Vitamin B6 (Folic Acid) – 0.2 mg</li><li>Vitamin B12 (Cyanocobalamin) – 0.02 mg</li><li>Vitamin D3 – 250 IU</li></ul>",
    feedingInstructions: "<p><strong>Dosage:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Dogs: 5 ml per 20 kg body weight, twice daily</li><li>Cats: 0.5 ml per kg body weight, twice daily</li></ul><p class=\"mt-4\"><strong>Administration:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Can be mixed with feed or water</li><li>May be given directly into the mouth</li><li>Use the measuring cup provided</li><li>Follow veterinarian's advice for optimal results</li></ul>",
    highlights: ["Iron enriched", "Immunity booster", "Vet recommended"],
    specs: [
      { key: "Volume", value: "200ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  "pet-plus-calcium": {
    slug: "pet-plus-calcium",
    title: "Pet + Calcium",
    brand: "Ollie's Paw",
    price: 380,
    originalPrice: 480,
    badge: null,
    category: "dog",
    subCategory: "Joint Care",
    petCategory: "Health & Wellness",
    customerFavourite: false,
    featuredCategory: false,
    featuredBrand: false,
    dietaryInfo: "Calcium supplement for joint health",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/PET CALCIUM.jpeg", alt: "Pet + Calcium" },
    ],
    description: "<p>Ollie's Paw PET+ Calcium is a specially formulated animal feed supplement designed to support overall growth, strength, and vitality in pets. Enriched with essential minerals and B-complex vitamins, it helps manage anaemia, reduce fatigue, preserve energy levels, and support a healthy immune system. Vitamin B12 plays a vital role in maintaining healthy nerve cells and overall metabolic function.</p><p><strong>Key Benefits:</strong></p><ul class=\"list-disc pl-6 space-y-1\"><li>Helps treat anaemia</li><li>Reduces fatigue and weakness</li><li>Preserves energy levels</li><li>Boosts immune system</li><li>Supports nerve cell health (Vitamin B12)</li></ul>",
    nutritionInfo: "<p><strong>Each 10 ml contains:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Chelated Ferrous Glycinate – 100 mg<br/>(Equivalent to 20 mg of iron)</li><li>Chelated Copper Glycinate – 50 mg<br/>(Equivalent to 10 mg of copper)</li><li>Chelated Cobalt Glycinate – 40 mg<br/>(Equivalent to 4 mg of cobalt)</li><li>Vitamin B2 (Riboflavin) – 1 mg</li><li>Vitamin B3 (Nicotinic Acid) – 5 mg</li><li>Vitamin B6 (Pyridoxine) – 0.5 mg</li><li>Vitamin B9 (Folic Acid) – 0.2 mg</li><li>Vitamin B12 (Cyanocobalamin) – 0.02 mg</li><li>Vitamin D3 – 250 IU</li></ul>",
    feedingInstructions: "<p><strong>Dosage:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Dogs: 5 ml per 20 kg body weight, twice daily</li><li>Cats: 0.5 ml per kg body weight, twice daily</li></ul><p class=\"mt-4\"><strong>Administration:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Can be given directly into the mouth or mixed with feed</li><li>Use the measuring cup provided</li><li>Follow veterinarian guidance if required</li></ul>",
    highlights: ["Calcium enriched", "Joint support", "Bone strength"],
    specs: [
      { key: "Volume", value: "200ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  "vita-pet": {
    slug: "vita-pet",
    title: "Vita Pet",
    brand: "Ollie's Paw",
    price: 420,
    originalPrice: 520,
    badge: null,
    category: "dog",
    subCategory: "Skin & Coat",
    petCategory: "Health & Wellness",
    customerFavourite: false,
    featuredCategory: false,
    featuredBrand: false,
    dietaryInfo: "Multivitamin for skin and coat health",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/VITA PET.jpeg", alt: "Vita Pet" },
    ],
    description: "<p>Ollie's Paw VITAPET+ is a premium animal feed supplement enriched with essential amino acids, vitamins, and nutrients to support energy levels, healthy skin and coat, and overall vitality in pets. It helps optimize growth and weight gain, improves body resistance against diseases, and enhances general activity and well-being.</p><p><strong>Key Benefits:</strong></p><ul class=\"list-disc pl-6 space-y-1\"><li>Boosts energy levels</li><li>Supports healthy skin and shiny coat</li><li>Enhances growth and weight gain</li><li>Improves immunity and disease resistance</li><li>Supports overall body functions and activity</li></ul>",
    nutritionInfo: "<p><strong>Each 10 ml contains:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Arginine – 6 mg<br/>(Supports blood circulation and overall metabolism)</li><li>Histidine – 2 mg<br/>(Helps tissue growth and repair)</li><li>Isoleucine – 5 mg<br/>(Supports muscle strength and energy production)</li><li>Leucine – 15 mg<br/>(Promotes muscle development and weight gain)</li><li>Lysine – 20 mg<br/>(Aids growth, immunity, and calcium absorption)</li><li>Methionine – 9 mg<br/>(Supports liver function and improves coat quality)</li><li>Phenylalanine – 5 mg<br/>(Supports nervous system and hormone production)</li><li>Threonine – 5 mg<br/>(Aids digestion and immune function)</li><li>Tryptophan – 5 mg<br/>(Supports appetite and mood balance)</li><li>Valine – 5 mg<br/>(Helps maintain muscle activity and energy levels)</li><li>Vitamin E – 6 mg<br/>(Powerful antioxidant for healthy skin and coat)</li><li>Vitamin B1 (Thiamine) – 5 mg<br/>(Supports energy metabolism and nerve function)</li><li>Vitamin B2 (Riboflavin) – 2 mg<br/>(Helps convert food into energy)</li><li>Vitamin B3 (Niacin) – 20 mg<br/>(Improves digestion, skin health, and energy levels)</li><li>Vitamin B5 (Pantothenic Acid) – 4 mg<br/>(Supports stress response and metabolism)</li><li>Vitamin B6 (Pyridoxine) – 1 mg<br/>(Supports protein metabolism and brain function)</li><li>Choline – 30 mg<br/>(Supports liver function and brain health)</li><li>Vitamin B12 – 2 mcg<br/>(Supports red blood cell formation and nerve health)</li><li>Vitamin C – 30 mg<br/>(Boosts immunity and reduces oxidative stress)</li><li>Folic Acid – 40 mcg<br/>(Supports growth and red blood cell formation)</li><li>Biotin (Vitamin H) – 50 mcg<br/>(Improves coat shine and skin health)</li></ul>",
    feedingInstructions: "<p><strong>Dosage:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Puppies: 5 ml twice daily</li><li>Dogs: 10 ml twice daily</li><li>Cats: 2.5 ml twice daily</li><li>Pet Birds: 10–15 ml per 100 birds</li></ul><p class=\"mt-4\"><strong>Administration:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Give directly into the mouth or mix with food or water</li><li>Shake well before use</li><li>Or as directed by a veterinarian</li></ul>",
    highlights: ["Multivitamin blend", "Skin health", "Coat shine"],
    specs: [
      { key: "Volume", value: "250ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
  "pet-plus-fertile": {
    slug: "pet-plus-fertile",
    title: "Pet + Fertile",
    brand: "Ollie's Paw",
    price: 550,
    originalPrice: 650,
    badge: null,
    category: "dog",
    subCategory: "Immunity Boosters",
    petCategory: "Health & Wellness",
    customerFavourite: false,
    featuredCategory: false,
    featuredBrand: false,
    dietaryInfo: "Fertility and immunity support",
    deliveryTime: "2-3 days",
    accent: "#00ff95",
    images: [
      { url: "/images/PET FERTILE.jpeg", alt: "Pet + Fertile" },
    ],
    description: "<p>Ollie's Paw PET+ FERTILE is a natural animal feed supplement formulated to support reproductive health and fertility in male and female dogs. Enriched with herbal extracts and amino acids, it helps stimulate reproductive hormones, improve ovarian and testicular function, reduce stress and anxiety, and support healthy mating cycles.</p><p>The presence of Ashwagandha (Withania somnifera) helps improve stamina, hormonal balance, and overall reproductive performance.</p><p><strong>Highly recommended before mating</strong></p><p><strong>Key Benefits:</strong></p><ul class=\"list-disc pl-6 space-y-1\"><li>Supports fertility in male and female dogs</li><li>Helps regulate heat and mating cycles</li><li>Improves reproductive hormone activity</li><li>Reduces stress and anxiety linked to low fertility</li><li>Enhances overall reproductive health</li></ul>",
    nutritionInfo: "<p><strong>Each 15 ml contains:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Withania somnifera (Ashwagandha) – 200 mg<br/>(Helps reduce stress, improves hormonal balance, and supports fertility)</li><li>Asparagus racemosus – 200 mg<br/>(Stimulates reproductive hormones, improves oogenesis, and increases follicle count)</li><li>L-Arginine Hydrochloride – 1 g<br/>(Improves blood circulation to reproductive organs and supports sperm and egg quality)</li></ul><p class=\"mt-4\">Contains permitted colour and flavour.</p>",
    feedingInstructions: "<p><strong>Dosage:</strong></p><p class=\"mb-2\"><strong>Male & Female Dogs:</strong></p><ul class=\"list-disc pl-6 space-y-1 mb-4\"><li>15 ml twice daily for every 30 kg body weight</li><li>(Equivalent to 0.5 ml per kg body weight, twice daily)</li></ul><p class=\"mt-4\"><strong>Directions for Use:</strong></p><p class=\"mb-2 font-semibold\">Male Dogs:</p><ul class=\"list-disc pl-6 space-y-1 mb-4\"><li>Start 15 days before mating and continue until mating is completed.</li><li>Regular Stud Dogs: Give daily for better reproductive results.</li></ul><p class=\"mb-2 font-semibold\">Female Dogs:</p><ul class=\"list-disc pl-6 space-y-1 mb-4\"><li>Start from the first day of heat and continue for 30 days.</li><li>Irregular or Abnormal Heat Cycles: Give daily for 1 year or until cycles normalize.</li></ul><p class=\"mt-4\"><strong>Administration:</strong></p><ul class=\"list-disc pl-6 space-y-2\"><li>Give directly into the mouth or mix with food or water</li><li>Shake well before use</li></ul>",
    highlights: ["Immunity booster", "Reproductive health", "Vet formulated"],
    specs: [
      { key: "Volume", value: "200ml" },
      { key: "Form", value: "Liquid" },
    ],
  },
};

export async function GET(_req, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const conn = await dbConnect();
    if (!conn) {
      const item = FALLBACK_INDEX[slug];
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ product: item }, { status: 200 });
    }
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      // Fallback to in-memory data if not in DB
      const item = FALLBACK_INDEX[slug];
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ product: item }, { status: 200 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    console.error("[API] Error fetching product:", err);
    // Try fallback on error
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const item = FALLBACK_INDEX[slug];
    if (item) return NextResponse.json({ product: item }, { status: 200 });
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}


