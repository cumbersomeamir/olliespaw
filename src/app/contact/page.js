export const metadata = {
  title: "Contact Us — Ollie’s Paw",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-3xl md:text-4xl">Get in Touch</h1>
      <p className="mt-2 text-foreground/80">
        We’d love to hear from you. Fill out the form and we’ll get back soon.
      </p>

      <form className="mt-8 grid grid-cols-1 gap-4">
        <input className="rounded-md border border-foreground/20 bg-white px-4 py-3" placeholder="Name" />
        <input className="rounded-md border border-foreground/20 bg-white px-4 py-3" placeholder="Email" type="email" />
        <input className="rounded-md border border-foreground/20 bg-white px-4 py-3" placeholder="Phone" type="tel" />
        <textarea className="min-h-32 rounded-md border border-foreground/20 bg-white px-4 py-3" placeholder="Message" />
        <button className="mt-2 w-fit rounded-full bg-primary px-6 py-3 text-background">Send Message</button>
      </form>

      <div className="mt-10 space-y-2 text-sm">
        <p>Email: <a className="underline" href="mailto:info@olliespaw.com">info@olliespaw.com</a></p>
        <p>Phone: <a className="underline" href="tel:+918090005050">+91 8090005050</a></p>
        <p>Address: Khasra No. 513, Bharuwala, Clementtown, Dehradun-248002, Uttarakhand, India</p>
      </div>
      <div className="mt-6 aspect-video w-full rounded-lg bg-accent/50">
        {/* Embedded Google Map placeholder */}
      </div>
    </section>
  );
}


