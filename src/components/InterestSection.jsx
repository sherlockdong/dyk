// src/components/InterestSection.jsx
"use client";

import { motion } from "motion/react";

const interestsData = [
  {
    id: 1,
    title: "Theoretical Mathematics",
    description: "Analyzing advanced mathematical physics arrays and implementing custom simulation models inside interactive scripts.",
    image: "/images/math.jpg",
  },
  {
    id: 2,
    title: "Computational Science",
    description: "Developing automated optimization frameworks, modeling acoustic behavior, and scripting backends.",
    image: "/images/science.jpg",
  },
];

const revealProfile = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function InterestsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">

      {/* Intro Hook — fades in on scroll */}
      <motion.div
        variants={revealProfile}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-24 max-w-xl text-left"
      >
        <h2 className="font-heading text-5xl font-bold tracking-tight mb-6">
          Out Front.
        </h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Hi there. I am a high school student with a deep focus on technical
          development and logic modeling. Scroll down to see what drives my
          active projects.
        </p>
      </motion.div>

      {/* Dynamic Stack */}
      <div className="flex flex-col gap-36">
        {interestsData.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={item.id}
              variants={revealProfile}
              initial="hidden"
              whileInView="visible"
              // `amount` replaces the old `margin` trick — works better with Lenis
              viewport={{ once: true, amount: 0.2 }}
              className={`flex flex-col gap-12 md:items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Picture Frame */}
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-xl border border-border/40 bg-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out scale-100 hover:scale-105"
                />
              </div>

              {/* Text Block */}
              <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
                <span className="font-mono text-xs text-primary tracking-widest uppercase font-bold">
                  // Core Focus Block 0{idx + 1}
                </span>
                <h3 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}