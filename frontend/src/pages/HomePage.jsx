import { Link } from "react-router-dom";

const highlights = [
  { title: "Easy Booking", text: "Pick date and slot in seconds with a tap-friendly flow." },
  { title: "Affordable Pricing", text: "Transparent per-slot pricing with no hidden charges." },
  { title: "Instant Confirmation", text: "Secure your turf instantly right after payment." }
];

const HomePage = () => {
  return (
    <main className="page-shell">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-turf-hero bg-cover bg-center p-6 shadow-glow sm:p-10">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-turf-300/30 blur-2xl" />
        <div className="absolute -bottom-10 left-0 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-xl animate-float">
          <p className="text-xs uppercase tracking-[0.25em] text-turf-100/80">Premium Box Cricket Experience</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Book your turf slot with speed and style
          </h1>
          <p className="mt-4 text-sm text-turf-100/90 sm:text-base">
            A modern, mobile-first booking journey designed for players. Choose your slot, checkout fast, and hit the turf.
          </p>
          <Link
            to="/book"
            className="mt-7 inline-flex items-center rounded-full bg-turf-300 px-6 py-3 text-sm font-semibold text-turf-900 shadow-soft hover:scale-[1.02] hover:bg-turf-200"
          >
            Book Your Slot
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="glass-card p-5">
            <h2 className="text-base font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-turf-100/80">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
