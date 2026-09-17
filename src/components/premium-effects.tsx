"use client";

import { useEffect } from "react";

export function PremiumEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    body.classList.add("premium-ready");

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));

    const finePointer = window.matchMedia("(pointer:fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer || reducedMotion) return;
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      root.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      root.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      root.style.setProperty("--portrait-x", `${((x - 0.5) * 12).toFixed(2)}px`);
      root.style.setProperty("--portrait-y", `${((y - 0.5) * 10).toFixed(2)}px`);
    };

    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", `${Math.min(window.scrollY / max, 1)}`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      body.classList.remove("premium-ready");
    };
  }, []);

  return null;
}
