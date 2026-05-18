import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About | philolab",
  description: "philolab은 철학으로 자기 자신을 비추는 진단 시리즈입니다.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container-content py-12 md:py-20">
        <div className="animate-fade-in-up space-y-8">
          <h1 className="heading-serif text-3xl md:text-4xl">about philolab</h1>

          <div className="space-y-5 leading-relaxed text-foreground">
            <p>
              <strong className="text-accent">philolab</strong>은 "Philosophy + Laboratory"의 합성어입니다.
              철학을 실험실로 끌어와, 일상의 직관을 통해 자기 자신을 비춰보는 가벼운 진단 시리즈입니다.
            </p>
            <p>
              MBTI와 사주가 익숙한 한국 콘텐츠 시장에서, philolab은 동서양 철학의 깊이를 더합니다.
              니체와 장자, 칸트와 노자, 카뮈와 공자가 같은 자리에서 당신에게 말을 겁니다.
            </p>
            <p>
              모든 진단은 <span className="text-accent">서버에 어떤 데이터도 저장하지 않습니다</span>.
              당신의 답변은 당신의 기기 안에서만 처리되고, 결과는 URL에 담겨 공유 가능한 형태로만 남습니다.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-elevated px-6 py-5 text-sm leading-relaxed text-muted">
            philolab의 진단 콘텐츠는 <span className="text-foreground">오락 및 철학 입문</span> 목적으로 제작되었습니다.
            학술적·심리학적 진단이 아니며, 의학적·심리치료적 조언을 대체하지 않습니다.
          </div>

          <div className="pt-4 text-sm text-muted">
            만든 곳 · philolab
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
