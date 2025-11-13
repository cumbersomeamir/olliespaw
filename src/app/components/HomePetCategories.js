export default function HomePetCategories() {
  const items = [
    { key: "dogs", label: "dogs", color: "#E6DED2", outline: DogOutline, filled: DogFilled },
    { key: "cats", label: "cats", color: "#C2B8A3", outline: CatOutline, filled: CatFilled },
    { key: "puppies", label: "puppies", color: "#FAF9F6", outline: PuppyOutline, filled: PuppyFilled },
    { key: "kittens", label: "kittens", color: "#E6DED2", outline: KittenOutline, filled: KittenFilled },
    { key: "senior-dogs", label: "senior dogs", color: "#C2B8A3", outline: SeniorDogOutline, filled: SeniorDogFilled },
    { key: "senior-cats", label: "senior cats", color: "#FAF9F6", outline: SeniorCatOutline, filled: SeniorCatFilled },
    { key: "active-pets", label: "active pets", color: "#E6DED2", outline: ActivePetOutline, filled: ActivePetFilled },
    { key: "sensitive-skin", label: "sensitive skin", color: "#C2B8A3", outline: SensitiveSkinOutline, filled: SensitiveSkinFilled },
  ];

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl">our products</h2>
            <p className="mt-1 text-sm text-foreground/70">
              A carefully curated collection bringing together the best for every pet.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous"
              className="h-8 w-8 rounded-md border border-foreground/20 text-sm"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              className="h-8 w-8 rounded-md border border-foreground/20 text-sm"
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 rounded-xl bg-foreground/[0.04] p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {items.map((i) => (
            <CategoryCard
              key={i.key}
              label={i.label}
              color={i.color}
              Outline={i.outline}
              Filled={i.filled}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ label, color, Outline, Filled }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div
        className="relative aspect-[5/4] w-full max-w-[160px] overflow-hidden rounded-md text-foreground"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Outline icon (default) */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <Outline />
        </div>
        {/* Hover image (filled silhouette over soft background) */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: color }}
        >
          <Filled />
        </div>
      </div>
      <div className="mt-3 text-sm text-foreground/80">{label}</div>
    </div>
  );
}

/* ----- Custom minimal line-art icons (outline + filled) ----- */
function DogOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <path d="M70 92c0-24 18-40 40-40 10 0 18 4 26 10" />
        {/* Ear */}
        <path d="M112 58c0-8 10-14 18-12 6 2 6 10 0 14" />
        {/* Snout */}
        <path d="M130 84c10 0 18 6 20 10" />
        {/* Chin */}
        <path d="M110 98c-6 4-16 6-24 2" />
        {/* Eye and nose */}
        <circle cx="116" cy="76" r="2.5" />
        <circle cx="144" cy="92" r="2.5" />
      </g>
    </svg>
  );
}

function DogFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <path d="M70 102c2-28 22-48 44-48 10 0 20 4 28 10 8 6 12 14 16 22H70z" />
        <circle cx="116" cy="76" r="3" fill="#FAF9F6" />
        <circle cx="144" cy="92" r="3" fill="#FAF9F6" />
      </g>
    </svg>
  );
}

function CatOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Face circle */}
        <circle cx="100" cy="84" r="26" />
        {/* Ears */}
        <path d="M82 74l-8-10 14 4" />
        <path d="M118 74l8-10-14 4" />
        {/* Eyes */}
        <circle cx="92" cy="84" r="2.5" />
        <circle cx="108" cy="84" r="2.5" />
        {/* Nose and mouth */}
        <path d="M100 88l0 4" />
        <path d="M96 92c2 2 6 2 8 0" />
        {/* Whiskers */}
        <path d="M76 86h12" />
        <path d="M76 92h12" />
        <path d="M112 86h12" />
        <path d="M112 92h12" />
      </g>
    </svg>
  );
}
function CatFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <path d="M82 74l-8-10 14 4a26 26 0 0 1 24 0l14-4-8 10a26 26 0 1 1-36 0z" />
        <circle cx="92" cy="84" r="3" fill="#FAF9F6" />
        <circle cx="108" cy="84" r="3" fill="#FAF9F6" />
      </g>
    </svg>
  );
}

function PuppyOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* rounder puppy face */}
        <circle cx="100" cy="86" r="22" />
        {/* floppy ears */}
        <path d="M78 80c-8 2-12-6-10-12 4-6 12-6 16 0" />
        <path d="M122 80c8 2 12-6 10-12-4-6-12-6-16 0" />
        {/* eyes, nose, tongue */}
        <circle cx="92" cy="86" r="2.5" />
        <circle cx="108" cy="86" r="2.5" />
        <path d="M100 90v4" />
        <path d="M96 96c2 3 6 3 8 0" />
      </g>
    </svg>
  );
}
function PuppyFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <circle cx="100" cy="86" r="22" />
        <circle cx="92" cy="86" r="3" fill="#FAF9F6" />
        <circle cx="108" cy="86" r="3" fill="#FAF9F6" />
      </g>
    </svg>
  );
}

function KittenOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="86" r="22" />
        <path d="M86 74l-8-10 12 4" />
        <path d="M114 74l8-10-12 4" />
        <circle cx="94" cy="86" r="2.5" />
        <circle cx="106" cy="86" r="2.5" />
        <path d="M88 92h8" />
        <path d="M104 92h8" />
      </g>
    </svg>
  );
}
function KittenFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <path d="M86 74l-8-10 12 4a22 22 0 0 1 20 0l12-4-8 10a22 22 0 1 1-28 0z" />
        <circle cx="94" cy="86" r="3" fill="#FAF9F6" />
        <circle cx="106" cy="86" r="3" fill="#FAF9F6" />
      </g>
    </svg>
  );
}

function SeniorDogOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 92c0-24 18-40 40-40 10 0 18 4 26 10" />
        <path d="M112 58c0-8 10-14 18-12 6 2 6 10 0 14" />
        <path d="M130 84c10 0 18 6 20 10" />
        <path d="M110 98c-6 4-16 6-24 2" />
        <circle cx="116" cy="76" r="2.5" />
        <circle cx="144" cy="92" r="2.5" />
        <HeartSmall x={146} y={78} />
      </g>
    </svg>
  );
}
function SeniorDogFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <path d="M70 102c2-28 22-48 44-48 10 0 20 4 28 10 8 6 12 14 16 22H70z" />
      </g>
      <HeartFilled x={146} y={78} />
    </svg>
  );
}

function SeniorCatOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="84" r="26" />
        <path d="M82 74l-8-10 14 4" />
        <path d="M118 74l8-10-14 4" />
        <circle cx="92" cy="84" r="2.5" />
        <circle cx="108" cy="84" r="2.5" />
        <path d="M100 88l0 4" />
        <path d="M96 92c2 2 6 2 8 0" />
        <HeartSmall x={140} y={82} />
      </g>
    </svg>
  );
}
function SeniorCatFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <path d="M82 74l-8-10 14 4a26 26 0 0 1 24 0l14-4-8 10a26 26 0 1 1-36 0z" />
        <circle cx="92" cy="84" r="3" fill="#FAF9F6" />
        <circle cx="108" cy="84" r="3" fill="#FAF9F6" />
      </g>
      <HeartFilled x={140} y={82} />
    </svg>
  );
}

function ActivePetOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* running dog silhouette */}
        <path d="M48 96c18-12 38-18 64-14 16 2 34 2 50-4" />
        <path d="M130 66c10 2 18 8 26 18" />
        <circle cx="120" cy="70" r="3" />
        <path d="M80 88l-12-6" />
        <path d="M100 94l-10 8" />
      </g>
    </svg>
  );
}
function ActivePetFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <path d="M48 96c18-12 38-18 64-14 16 2 34 2 50-4v18H48z" />
      </g>
    </svg>
  );
}

function SensitiveSkinOutline() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Paw */}
        <circle cx="92" cy="74" r="12" />
        <circle cx="70" cy="58" r="6" />
        <circle cx="114" cy="58" r="6" />
        <circle cx="82" cy="44" r="6" />
        <circle cx="102" cy="44" r="6" />
        {/* Droplet */}
        <path d="M136 82c8-12 10-16 10-22 8 6 14 14 14 22 0 8-6 14-12 14s-12-6-12-14z" />
      </g>
    </svg>
  );
}
function SensitiveSkinFilled() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="h-28 w-40">
      <g fill="currentColor">
        <circle cx="92" cy="74" r="12" />
        <circle cx="70" cy="58" r="6" />
        <circle cx="114" cy="58" r="6" />
        <circle cx="82" cy="44" r="6" />
        <circle cx="102" cy="44" r="6" />
        <path d="M136 82c8-12 10-16 10-22 8 6 14 14 14 22 0 8-6 14-12 14s-12-6-12-14z" />
      </g>
    </svg>
  );
}

/* small heart glyph used in senior variants */
function HeartSmall({ x = 0, y = 0 }) {
  const path = `M ${x} ${y} c 2 -4 8 -4 10 0 c 2 -4 8 -4 10 0 c 0 6 -10 10 -10 14 c 0 -4 -10 -8 -10 -14 z`;
  return <path d={path} />;
}
function HeartFilled({ x = 0, y = 0 }) {
  const d = `M ${x} ${y} c 2 -4 8 -4 10 0 c 2 -4 8 -4 10 0 c 0 6 -10 10 -10 14 c 0 -4 -10 -8 -10 -14 z`;
  return <path d={d} fill="#A46B47" />;
}

