import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "당신을 이루는 두 철학자 | philolab",
  description: "12개의 질문으로 당신의 본성 철학자와 그림자 철학자를 찾아보세요. 약 3분.",
};

export default function IntroPage() {
  return (
    <>
      <Header />
      <main className="container-content py-12 md:py-20">
        <div className="animate-fade-in-up space-y-10">
          <div>
            <p className="mb-3 text-sm uppercase tracking-widest text-muted">
              Two Philosophers
            </p>
            <h1 className="heading-serif text-3xl leading-tight md:text-5xl">
              당신을 이루는
              <br />
              두 철학자
            </h1>
          </div>

          <div className="space-y-5 leading-relaxed text-foreground">
            <p>
              사람은 한 명의 철학으로 설명되지 않습니다. 당신 안에는 늘
              <span className="text-accent"> 본성의 철학자</span>가 있고,
              그 곁에는 당신이 마주해야 할
              <span className="text-accent"> 그림자의 철학자</span>가 함께 걷습니다.
            </p>
            <p>
              12개의 질문이 그 두 사람을 비춥니다. 정답은 없습니다.
              직관에 가까운 쪽을 골라주세요.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-elevated px-5 py-4 text-sm text-muted">
            <div className="flex items-center justify-between">
              <span>소요 시간</span>
              <span className="text-foreground">약 3분</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>문항 수</span>
              <span className="text-foreground">12문항</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>결과 저장</span>
              <span className="text-foreground">없음 (서버에 저장하지 않음)</span>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/two-philosophers/quiz" className="btn-primary w-full md:w-auto">
              시작하기 →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
