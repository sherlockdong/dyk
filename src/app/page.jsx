// src/app/page.jsx
"use client"; // 1. Tell Next.js this component runs on the client browser

import { useEffect } from "react"; // 2. Explicitly import the hook
import Link from "next/link";
import InterestsSection from "../components/InterestSection";

export default function Home() {
  useEffect(() => {
    fetch('/api/visitor-info').catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center w-full">

      {/* HERO — visible immediately, no scroll trigger */}
      <section className="w-full max-w-5xl px-6 pt-48 pb-32 flex flex-col items-start gap-6">
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Sherlock Dong <br />
          <span className="text-primary">Amature Athlete</span> <br />
          <span className="text-primary"> Wanna-be Cook</span> <br />
        </h1>

        <p className="max-w-2xl font-mono text-base text-muted-foreground leading-relaxed mt-4">
          This is the website for Sherlock Dong. For contact, please use the following methods. I am currently otherwise occupied, so I have shifted the logic of this website to a minimal, yet functional form.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link
            href="mailto:sherlockdong2007@gmail.com"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            Email
          </Link>
          <Link
            href="https://github.com/sherlockdong" target="_blank"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-8 font-mono text-xs font-bold text-foreground transition-all hover:bg-secondary hover:text-foreground"
          >
            Github
          </Link>
        </div>
      </section>
    </div>
  );
}