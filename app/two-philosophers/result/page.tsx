import { Suspense } from "react";
import ResultClient from "./ResultClient";

export const metadata = {
  title: "결과 — 당신을 이루는 두 철학자 | philolab",
  description: "당신의 본성과 그림자의 철학자.",
};

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="container-content py-20 text-center text-muted">불러오는 중...</div>}>
      <ResultClient />
    </Suspense>
  );
}
