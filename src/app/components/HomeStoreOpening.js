export default function HomeStoreOpening() {
  const panels = [
    { color: "#1E3AFF" }, // vivid blue
    { color: "#3B2219" }, // deep brown
    { color: "#121212" }, // near black
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {panels.map((p, i) => (
          <Panel key={i} color={p.color} />
        ))}
      </div>
    </section>
  );
}

function Panel({ color }) {
  return (
    <div
      className="relative h-[80vh] w-full overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <h2 className="pointer-events-none absolute left-6 top-6 z-10 font-sans text-[48px] font-extrabold uppercase leading-none tracking-tight text-white md:left-10 md:top-10 md:text-[72px] lg:left-12 lg:top-12 lg:text-[92px]">
        <span className="block">DOG</span>
      </h2>

      {/* Wireframe overlay (inline SVG) */}
      <div className="absolute inset-0 opacity-90">
        <svg
          viewBox="0 0 1600 1200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <g
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.85"
          >
            {/* Simple architectural wireframe approximation */}
            <rect x="80" y="180" width="1440" height="760" />
            <rect x="160" y="260" width="1280" height="600" />
            <rect x="240" y="340" width="1120" height="440" />
            <line x1="80" y1="180" x2="240" y2="340" />
            <line x1="1520" y1="180" x2="1360" y2="340" />
            <line x1="80" y1="940" x2="240" y2="780" />
            <line x1="1520" y1="940" x2="1360" y2="780" />
            {/* inner grid */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={320 + i * 160}
                y1="360"
                x2={320 + i * 160}
                y2="760"
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="320"
                y1={420 + i * 100}
                x2="1280"
                y2={420 + i * 100}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Bottom info (address/time) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex items-end justify-between px-6 text-white md:bottom-8 md:px-10">
        <div className="text-[14px] leading-[1.25] tracking-widest md:text-[16px]">
          <p>27 RUE</p>
          <p>DE SAINTONGE</p>
          <p>75003 PARIS</p>
        </div>
        <div className="text-right text-[14px] leading-[1.25] tracking-widest md:text-[16px]">
          <p>A PARTIR</p>
          <p>DU 14.11.25</p>
          <p>11H00.19H30</p>
        </div>
      </div>
    </div>
  );
}


