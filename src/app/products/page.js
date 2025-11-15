import FiltersBar from "./components/FiltersBar";
import ProductsGrid from "./components/ProductsGrid";

export const metadata = {
  title: "Products — Ollie’s Paw",
};

const SAMPLE_PRODUCTS = [
  { id: "1", title: "NourishMax Kibble – Chicken", brand: "Ollie’s Paw", price: "₹ 580.00", badge: "exclusive" },
  { id: "2", title: "Shine & Coat Supplement", brand: "Ollie’s Paw", price: "₹ 320.00", badge: "new" },
  { id: "3", title: "Calm & Comfort Chews", brand: "Ollie’s Paw", price: "₹ 195.00" },
  { id: "4", title: "Daily Multivitamin Bites", brand: "Ollie’s Paw", price: "₹ 140.00" },
  { id: "5", title: "Classic Leash – Forest Green", brand: "Ollie’s Paw", price: "₹ 209.00", badge: "low" },
  { id: "6", title: "Hydrate Gentle Shampoo", brand: "Ollie’s Paw", price: "₹ 165.00" },
  { id: "7", title: "Travel Tote – Moss", brand: "Ollie’s Paw", price: "₹ 195.00" },
  { id: "8", title: "Cozy Hoodie – Heather Grey", brand: "Ollie’s Paw", price: "₹ 140.00" },
  { id: "9", title: "Raw Denim Treat Pouch", brand: "Ollie’s Paw", price: "₹ 209.00", badge: "low" },
  { id: "10", title: "Shaggy Dog Sweater – Dark Gray", brand: "Ollie’s Paw", price: "₹ 165.00" },
  { id: "11", title: "Corduroy Shirt – Olive", brand: "Ollie’s Paw", price: "₹ 195.00" },
  { id: "12", title: "Crewneck – Forest Green", brand: "Ollie’s Paw", price: "₹ 120.00" },
];

export default function ProductsPage() {
  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground">bestsellers</h1>
            <p className="mt-2 text-sm text-foreground/70">
              Discover our demanding curation of the best pieces of pet wellness from around the country.
            </p>
          </div>
          <div className="text-sm text-foreground/60">75 products</div>
        </div>

        <div className="mb-6 sm:mb-8">
          <FiltersBar />
        </div>
      </div>

      <ProductsGrid products={SAMPLE_PRODUCTS} />
    </section>
  );
}


