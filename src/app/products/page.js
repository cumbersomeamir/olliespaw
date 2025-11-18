import FiltersBar from "./components/FiltersBar";
import ProductsGrid from "./components/ProductsGrid";

export const metadata = {
  title: "Products — Ollie’s Paw",
};

async function fetchProducts() {
  try {
    // In server components, use absolute URL or relative path
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {
      // Next.js fetch caching config for server components
      next: { revalidate: 0 }, // Always fetch fresh data
    });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return Array.isArray(data.products) ? data.products : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array on error, let the API handle fallback
    return [];
  }
}

export default function ProductsPage() {
  // Convert server component to async and fetch data on the server
  return (
    <section className="min-h-screen bg-background">
      {/* Using a client boundary for data fetch with Suspense is an option.
          Here we fetch in a Server Component-compatible way */}
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ProductsPageContent />
    </section>
  );
}

async function ProductsPageContent() {
  const products = await fetchProducts();
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground">bestsellers</h1>
            <p className="mt-2 text-sm text-foreground/70">
              Discover our demanding curation of the best pieces of pet wellness from around the country.
            </p>
          </div>
          <div className="text-sm text-foreground/60">{products.length} products</div>
        </div>
        <div className="mb-6 sm:mb-8">
          <FiltersBar />
        </div>
      </div>
      <ProductsGrid products={products} />
    </>
  );
}


