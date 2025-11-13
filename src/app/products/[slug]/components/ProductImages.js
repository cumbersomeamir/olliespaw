export default function ProductImages({ product }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Main product image - flat lay */}
      <div className="aspect-square w-full bg-white" />
      {/* Model wearing product */}
      <div className="aspect-[4/5] w-full bg-white" />
      {/* Close-up detail shots */}
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square w-full bg-white" />
        <div className="aspect-square w-full bg-white" />
      </div>
    </div>
  );
}

