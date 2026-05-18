import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/50 py-10">
      <div className="container-content space-y-3 text-sm text-muted">
        <p className="leading-relaxed">
          philolab의 진단 콘텐츠는 오락 및 철학 입문 목적으로 제작되었습니다. 학술적·심리학적 진단이 아니며, 의학적·심리치료적 조언을 대체하지 않습니다.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link href="/" className="hover:text-foreground transition-colors">
            home
          </Link>
          <span className="text-border">·</span>
          <Link href="/about" className="hover:text-foreground transition-colors">
            about
          </Link>
        </div>
        <p className="pt-2 text-xs">© {new Date().getFullYear()} philolab</p>
      </div>
    </footer>
  );
}
