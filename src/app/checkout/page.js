export const metadata = {
  title: "Checkout — Ollie’s Paw",
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-serif text-3xl md:text-4xl">Checkout</h1>
      <p className="mt-2 text-foreground/80">Secure payment with PAN India delivery.</p>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3 rounded-lg border border-foreground/10 bg-white p-4">
          <h2 className="font-medium">Order Summary</h2>
          <div className="rounded-md bg-accent/40 p-3 text-sm">Your cart is empty (placeholder).</div>
        </div>
        <div className="space-y-3 rounded-lg border border-foreground/10 bg-white p-4">
          <h2 className="font-medium">Customer Details</h2>
          <input className="w-full rounded-md border border-foreground/20 bg-white px-3 py-2" placeholder="Full Name" />
          <input className="w-full rounded-md border border-foreground/20 bg-white px-3 py-2" placeholder="Email" type="email" />
          <input className="w-full rounded-md border border-foreground/20 bg-white px-3 py-2" placeholder="Phone" type="tel" />
          <input className="w-full rounded-md border border-foreground/20 bg-white px-3 py-2" placeholder="Address" />
          <button className="mt-2 w-full rounded-full bg-primary px-6 py-3 text-background">
            Pay Securely
          </button>
          <p className="text-xs text-foreground/70">
            Payments via Razorpay / Paytm / Stripe / Google Pay. By paying, you agree to our returns & refund policy.
          </p>
        </div>
      </div>
    </section>
  );
}


