export default function ProductDescription({ product }) {
  return (
    <div className="space-y-6 border-t border-foreground/10 pt-6">
      <div>
        <p className="text-sm leading-relaxed text-foreground/80">
          Ollie's Paw, our brand of essentials designed without compromise on quality, where every detail is thought to make a difference.
        </p>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground">
          WHAT CONVINCED US
        </h3>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
          <p>
            We reviewed everything: materials, cuts, comfort... to create the perfect {product.title.toLowerCase()}. A piece at the crossroads of all your favorite pet wellness products.
          </p>
          <p>
            Made with premium, natural ingredients and backed by science, this {product.title.toLowerCase()} is crafted for your pet's wellbeing. Every formula is tested, trusted, and made with love in India.
          </p>
        </div>
      </div>
    </div>
  );
}

