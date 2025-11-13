export const metadata = {
  title: "About Us — Ollie’s Paw",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-3xl md:text-4xl">Because Every Paw Deserves the Best 🐾</h1>
      <p className="mt-4 leading-7 text-foreground/85">
        Ollie’s Paw began with a simple belief that our pets deserve the same love, care, and
        attention we give to any member of our family. We craft premium, wellness-focused products
        made with love and guided by science—only our own creations that meet the highest standards
        of quality, safety, and care.
      </p>
      <p className="mt-4 leading-7 text-foreground/85">
        Our goal is to help every pet live longer, stronger, and happier—by empowering pet parents
        across India to make healthier choices.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5">
        <li>Love & Compassion</li>
        <li>Wellness & Science</li>
        <li>Quality & Transparency</li>
        <li>Community & Care</li>
      </ul>
    </section>
  );
}


