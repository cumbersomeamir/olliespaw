"use client";

export default function ColorSwatches({ colors, selectedColor, onColorChange }) {
  return (
    <div className="border-t border-foreground/10 pt-4">
      <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground">
        OTHER COLORS
      </h3>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`h-12 w-12 border-2 ${
              selectedColor === color
                ? "border-foreground"
                : "border-foreground/20 hover:border-foreground/40"
            } transition-colors`}
            style={{ backgroundColor: color }}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </div>
  );
}

