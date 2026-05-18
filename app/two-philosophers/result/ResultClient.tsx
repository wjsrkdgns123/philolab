"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getResultByCode } from "@/lib/results";
import { getPhilosopherVisual } from "@/lib/philosophers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const result = getResultByCode(code);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  // 코드 없거나 잘못된 경우 — 인트로로 안내
  if (!code || !result) {
    return (
      <>
        <Header />
        <main className="container-content py-20 text-center">
          <p className="mb-6 text-muted">결과를 찾을 수 없습니다.</p>
          <Link href="/two-philosophers" className="btn-primary">
            진단 시작하기
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 복사 실패 — 무시
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    result.shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <Header />
      <main className="container-content py-12 md:py-16">
        {/* 상단 라벨 */}
        <div className="mb-10 animate-fade-in text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted">
            Two Philosophers
          </p>
          <p className="text-sm text-muted">당신을 이루는 두 철학자</p>
        </div>

        {/* 본성 섹션 */}
        <section className="animate-fade-in-up">
          <SectionLabel text="본성" />
          <Portrait name={result.nature.philosopher} />
          <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
            {result.nature.philosopher}
          </h2>
          <p className="mt-2 text-base italic text-muted md:text-lg">
            — {result.nature.tagline}
          </p>

          <div className="quote-block mt-8">
            <p className="quote-text text-lg md:text-xl">
              "{result.nature.quote}"
            </p>
            {result.nature.quoteSimple && (
              <p className="mt-3 text-sm text-muted">{result.nature.quoteSimple}</p>
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed md:text-lg">
            {result.nature.description}
          </p>

          <p className="mt-6 text-sm text-muted">
            <span className="text-foreground/80">읽어볼 책</span> · {result.nature.book}
          </p>
        </section>

        <div className="divider" />

        {/* 그림자 섹션 */}
        <section className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="그림자" />
          <Portrait name={result.shadow.philosopher} />
          <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
            {result.shadow.philosopher}
          </h2>
          <p className="mt-2 text-base italic text-muted md:text-lg">
            — {result.shadow.tagline}
          </p>

          <div className="quote-block mt-8">
            <p className="quote-text text-lg md:text-xl">
              "{result.shadow.quote}"
            </p>
            {result.shadow.quoteSimple && (
              <p className="mt-3 text-sm text-muted">{result.shadow.quoteSimple}</p>
            )}
          </div>

          <p className="mt-6 text-base leading-relaxed md:text-lg">
            {result.shadow.description}
          </p>

          <p className="mt-6 text-sm text-muted">
            <span className="text-foreground/80">읽어볼 책</span> · {result.shadow.book}
          </p>
        </section>

        <div className="divider" />

        {/* 화두 */}
        <section className="animate-fade-in-up py-6 text-center" style={{ animationDelay: "200ms" }}>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted">
            당신의 화두
          </p>
          <p className="quote-text mx-auto max-w-md text-xl leading-relaxed md:text-2xl">
            {result.motto}
          </p>
        </section>

        <div className="divider" />

        {/* 공유 섹션 */}
        <section className="space-y-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <p className="text-center text-sm text-muted">
            결과를 친구와 나눠보세요
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              X에 공유
            </a>
            <button onClick={handleCopy} className="btn-secondary">
              {copied ? "✓ 복사됨" : "링크 복사"}
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 space-y-3">
          <Link href="/" className="btn-primary w-full">
            다른 진단 보기
          </Link>
          <Link
            href="/two-philosophers"
            className="block w-full text-center text-sm text-muted transition-colors hover:text-foreground"
          >
            다시 진단하기
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-accent" />
      <span className="text-xs uppercase tracking-widest text-accent">{text}</span>
    </div>
  );
}

function Portrait({ name }: { name: string }) {
  const visual = getPhilosopherVisual(name);
  const sizeClass = "h-[120px] w-[120px] md:h-[160px] md:w-[160px]";

  if (visual.image) {
    return (
      <div className={`mt-6 overflow-hidden rounded-full bg-elevated ring-1 ring-border ${sizeClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={visual.image}
          alt={name}
          width={240}
          height={240}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(100%) brightness(0.92)" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`mt-6 flex items-center justify-center rounded-full bg-elevated ring-1 ring-border ${sizeClass}`}
      aria-label={name}
    >
      <span className="heading-serif text-5xl text-accent md:text-6xl">{visual.monogram}</span>
    </div>
  );
}
