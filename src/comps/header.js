"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/images", label: "Images" },
  { href: "/stories", label: "Stories" },
  { href: "/books", label: "Books" },
];

const Header = () => {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-6 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl rounded-full border border-border/40 bg-background/80 px-2 backdrop-blur-md">
      {/* Notice the "relative" class added here. 
        This is the anchor that lets us perfectly center the links.
      */}
      <div className="relative mx-auto flex h-16 w-full items-center justify-between px-4 md:px-6">
        
        {/* LEFT SIDE: Brand Logo */}
        <div className="z-10 flex w-40 shrink-0"> 
          <Link href="/" className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
            Sherlock Dong
          </Link>
        </div>

        {/* DEAD CENTER: Navigation Rig */}
        {/* The absolute positioning forces this to sit perfectly in the middle of the screen */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-1 font-mono text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span className="inline-block text-xs opacity-60 transition-transform duration-200 ease-out group-hover:translate-x-1">
                  -&gt;
                </span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE: Dynamic Auth Action Module */}
       <div className="z-10 flex w-40 shrink-0 items-center justify-end">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-full border border-border/40 bg-secondary/50 px-4 py-1.5 font-mono text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="max-w-[120px] truncate">{user.email}</span>
            </Link>
          ) : (
            <Link
              href="/component"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 font-mono text-xs font-medium text-primary-foreground shadow transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;