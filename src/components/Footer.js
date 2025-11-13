export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-accent/30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 text-sm text-foreground/90 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">Ollie’s Paw</h3>
          <p className="mt-2 max-w-xs">
            Every Paw Matters — Health, Nutrition & Care. Premium, made-in-India pet wellness products.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Contact</h4>
          <ul className="mt-2 space-y-1">
            <li>Email: <a className="underline" href="mailto:info@olliespaw.com">info@olliespaw.com</a></li>
            <li>Phone: <a className="underline" href="tel:+918090005050">+91 8090005050</a></li>
            <li>License No: U10809UT2025PTC019729</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Address</h4>
          <p className="mt-2">
            Khasra No. 513, Bharuwala, Clementtown, Dehradun-248002, Uttarakhand, India
          </p>
        </div>
      </div>
      <div className="border-t border-black/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} Ollie’s Paw. All rights reserved.
      </div>
    </footer>
  );
}


