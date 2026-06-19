// src/app/page.jsx
import Link from "next/link";
import InterestsSection from "../components/InterestSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">

      {/* HERO — visible immediately, no scroll trigger */}
      <section className="w-full max-w-5xl px-6 pt-48 pb-32 flex flex-col items-start gap-6">
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Amateur Scholar. <br />
          <span className="text-primary">Professional Athlete.</span> <br />
          Gaming Enthusiast.
        </h1>

        <p className="max-w-2xl font-mono text-base text-muted-foreground leading-relaxed mt-4">
          I'm Sherlock. A high school student focused on theoretical mathematics,
          computational physics, and UI design engineering. I build tools, model
          systems, and push limits.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            href="/stories"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-8 font-mono text-xs font-bold text-foreground transition-all hover:bg-secondary hover:text-foreground"
          >
            Read Stories
          </Link>
        </div>
      </section>

      {/* SCROLL SECTION */}
      <InterestsSection />

    </div>
  );
}