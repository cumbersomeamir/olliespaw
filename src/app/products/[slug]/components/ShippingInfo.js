export default function ShippingInfo() {
  return (
    <div className="space-y-3 border-t border-foreground/10 pt-4">
      <div className="flex items-start gap-3">
        <span className="text-lg">+</span>
        <span className="text-sm text-foreground/80">
          FREE SHIPPING ON ORDERS OVER ₹ 1500.00.
        </span>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-lg">📦</span>
        <span className="text-sm text-foreground/80">
          ORDER BEFORE 2H 14MIN AND IT SHIPS TOMORROW, FRIDAY, NOVEMBER 14.
        </span>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-lg">⇄</span>
        <span className="text-sm text-foreground/80">
          FREE EXCHANGES ON ALL ORDERS.
        </span>
      </div>
    </div>
  );
}

