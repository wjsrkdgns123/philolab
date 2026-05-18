"use client";

// 메인 페이지 배경에 떠다니는 철학자 초상화. 본문과 함께 스크롤되되,
// translate3d + scroll 이벤트로 본문 속도의 PARALLAX_FACTOR배만큼만 움직여
// 느리게 따라오는 듯한 깊이감을 만든다.
import { useEffect, useState } from "react";

const portraits = [
  { src: "/philosophers/nietzsche.webp",    top: "8%",  left: "4%",  size: 180, opacity: 0.12 },
  { src: "/philosophers/plato.webp",        top: "11%", left: "76%", size: 200, opacity: 0.10 },
  { src: "/philosophers/zhuangzi.webp",     top: "33%", left: "14%", size: 140, opacity: 0.13, hideOnMobile: true },
  { src: "/philosophers/kant.webp",         top: "38%", left: "82%", size: 160, opacity: 0.11 },
  { src: "/philosophers/camus.webp",        top: "52%", left: "42%", size: 110, opacity: 0.08, hideOnMobile: true },
  { src: "/philosophers/marx.webp",         top: "70%", left: "6%",  size: 130, opacity: 0.10 },
  { src: "/philosophers/confucius.webp",    top: "72%", left: "70%", size: 150, opacity: 0.12 },
  { src: "/philosophers/schopenhauer.webp", top: "55%", left: "88%", size: 90,  opacity: 0.09, hideOnMobile: true },
  { src: "/philosophers/spinoza.webp",      top: "88%", left: "30%", size: 120, opacity: 0.10, hideOnMobile: true },
];

// 본문 1px 스크롤 시 배경이 따라 올라가는 비율. 1.0이면 본문과 똑같이, 0이면 fixed.
// 0.5 = 본문보다 절반 속도로 따라옴 → 느리게 움직이는 깊이감.
const PARALLAX_FACTOR = 0.5;

export default function PhilosopherBackdrop() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(window.scrollY * PARALLAX_FACTOR);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: "transform" }}
    >
      {portraits.map((p) => (
        <div
          key={p.src}
          className={`absolute rounded-full ${p.hideOnMobile ? "hidden md:block" : ""}`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-full object-cover"
            style={{
              filter: "grayscale(100%) blur(1.5px)",
              maskImage: "radial-gradient(circle at center, black 38%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 38%, transparent 72%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
