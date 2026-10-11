"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

function Playbook() {
  const [play, setPlay] = useState(0);

  return (
    <div className={styles.playbook} aria-label="Animated football route playbook">
      <div className={styles.playbookHeader}>
        <span>THE PLAYBOOK</span>
        <span>NO. 27</span>
      </div>

      <div className={styles.field} key={play} aria-hidden="true">
        <div className={styles.yardLine} />
        <div className={styles.yardLine} />
        <div className={styles.yardLine} />
        <div className={styles.yardLine} />
        <svg className={styles.route} viewBox="0 0 280 280" fill="none">
          <path d="M 46 227 C 83 221, 76 158, 124 155 S 183 187, 182 115 S 222 73, 241 55" />
        </svg>
        <span className={styles.startMarker}>X</span>
        <span className={styles.endMarker}>✦</span>
        <span className={styles.football} />
      </div>

      <button
        className={styles.replayButton}
        type="button"
        onClick={() => setPlay((current) => current + 1)}
      >
        Run the play <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full max-w-5xl px-3 sm:px-6 pt-16 pb-24 grid gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_320px] min-[900px]:items-center">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Sherlock Dong
          </h1>

          <p className="max-w-2xl font-mono text-base text-muted-foreground leading-relaxed mt-4">
            This is the website for Sherlock Dong. <br />
            Class of 2027, Linebacker &amp; Defensive End
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/fragments"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-8 font-mono text-xs font-bold text-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              Fragments ↗
            </Link>
            <Link
              href="mailto:sherlockdong2007@gmail.com"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Email
            </Link>
            <Link
              href="https://github.com/sherlockdong"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-8 font-mono text-xs font-bold text-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              Github
            </Link>
          </div>
          <p className="max-w-2xl font-mono text-base text-muted-foreground leading-relaxed mt-4">
            Currently working on:{" "}
            <Link
              href="https://www.ibm.com/think/topics/arima-model"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-link"
            >
              ARIMA model
            </Link>{" "}
            integration with{" "}
            <Link href="https://openwearables.io/" className="custom-link">
              Open-Wearables
            </Link>
          </p>
          <p className="font-mono text-sm text-muted-foreground">Collab welcomed.</p>
        </div>
        <Playbook />
      </section>
    </div>
  );
}
