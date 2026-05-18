import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DiagnosisCard {
  title: string;
  description: string;
  href?: string;
  active: boolean;
}

const diagnoses: DiagnosisCard[] = [
  {
    title: "당신을 이루는 두 철학자",
    description: "12개의 질문이 당신의 본성과 그림자를 비춥니다.",
    href: "/two-philosophers",
    active: true,
  },
  {
    title: "당신을 가장 싫어할 철학자",
    description: "당신의 사고를 가장 날카롭게 비판할 사람은 누구인가.",
    active: false,
  },
  {
    title: "어두운 철학 진단",
    description: "당신이 인정하지 않는 무의식의 신념을 마주합니다.",
    active: false,
  },
  {
    title: "당신의 인지편향 진단",
    description: "당신의 사고에 깃든 보이지 않는 버그를 찾습니다.",
    active: false,
  },
  {
    title: "사후 환영 철학자",
    description: "마지막 순간 당신을 맞이할 한 사람.",
    active: false,
  },
  {
    title: "당신의 행복관",
    description: "당신이 행복이라 부르는 것의 진짜 이름.",
    active: false,
  },
];

export default function HomePage() {
  return (
    <>
      <PhilosopherBackdrop />
      <Header />
      <main className="container-content py-16 md:py-24 relative">
        {/* 히어로 */}
        <section className="mb-16 animate-fade-in-up md:mb-24">
          <h1 className="heading-serif mb-6 text-4xl leading-tight md:text-5xl">
            철학으로 나를
            <br />
            실험하다
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            MBTI와 사주가 닿지 못한 자리. philolab은 동서양 철학의 깊이로 당신을 비춥니다.
          </p>
        </section>

        {/* 카드 그리드 */}
        <section className="space-y-4">
          {diagnoses.map((d, i) => (
            <DiagnosisCardItem key={i} {...d} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

function DiagnosisCardItem({ title, description, href, active }: DiagnosisCard) {
  const content = (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-surface p-6 transition-all duration-300 md:p-7 ${
        active
          ? "border-border hover:border-accent/40 hover:bg-elevated"
          : "border-border/30 opacity-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h3 className="heading-serif text-xl md:text-2xl">{title}</h3>
          <p className="text-sm leading-relaxed text-muted md:text-base">{description}</p>
        </div>
        <div className="shrink-0 pt-1">
          {active ? (
            <span
              className="text-accent transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          ) : (
            <span className="rounded border border-border/50 px-2 py-0.5 text-xs text-muted">
              곧 출시
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (active && href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return <div className="cursor-not-allowed">{content}</div>;
}

// 메인 페이지 viewport에 안개처럼 떠다니는 철학자 초상화.
// 모두 free license. radial mask로 가장자리 자연스럽게 페이드.
function PhilosopherBackdrop() {
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

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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
