import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id || p.slug} product={p} />
      ))}
    </div>
  );
}


