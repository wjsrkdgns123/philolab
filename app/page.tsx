import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhilosopherBackdrop from "@/components/PhilosopherBackdrop";

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
    <div className="relative isolate overflow-clip">
      <PhilosopherBackdrop />
      <Header />
      <main className="container-content py-16 md:py-24 relative">
        {/* 히어로 */}
        <section className="mb-16 animate-fade-in-up md:mb-24">
          <h1 className="heading-serif mb-6 text-4xl leading-tight md:text-5xl">
            철학연구소
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
    </div>
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

