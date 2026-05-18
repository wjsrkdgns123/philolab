"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions, calculateCode, type Answer } from "@/lib/questions";
import Header from "@/components/Header";

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: Answer) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
      } else {
        // 마지막 문항 — 결과 계산 후 리다이렉트
        const code = calculateCode(newAnswers);
        router.push(`/two-philosophers/result?code=${code}`);
      }
    }, 220);
  };

  const handleBack = () => {
    if (isTransitioning) return;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Header />

      {/* 진행률 바 */}
      <div className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container-content py-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="transition-colors hover:text-foreground disabled:opacity-30"
            >
              ← 이전
            </button>
            <span className="font-mono">
              {String(currentIndex + 1).padStart(2, "0")} / {questions.length}
            </span>
            <Link
              href="/two-philosophers"
              className="transition-colors hover:text-foreground"
            >
              나가기
            </Link>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="container-content py-12 md:py-16">
        <div
          key={currentQuestion.id}
          className={`animate-fade-in-up transition-opacity duration-200 ${
            isTransitioning ? "opacity-30" : "opacity-100"
          }`}
        >
          {/* 축 표시 */}
          <p className="mb-4 text-xs uppercase tracking-widest text-muted">
            Question {currentQuestion.id}
          </p>

          {/* 질문 */}
          <h2 className="heading-serif mb-12 text-2xl leading-snug md:text-3xl">
            {currentQuestion.question}
          </h2>

          {/* 선택지 */}
          <div className="space-y-3">
            <ChoiceButton
              onClick={() => handleAnswer("a")}
              label="A"
              text={currentQuestion.optionA}
              isSelected={answers[currentIndex] === "a"}
            />
            <ChoiceButton
              onClick={() => handleAnswer("b")}
              label="B"
              text={currentQuestion.optionB}
              isSelected={answers[currentIndex] === "b"}
            />
          </div>
        </div>
      </main>
    </>
  );
}

function ChoiceButton({
  onClick,
  label,
  text,
  isSelected,
}: {
  onClick: () => void;
  label: string;
  text: string;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group block w-full rounded-xl border bg-surface p-5 text-left transition-all duration-200 md:p-6 ${
        isSelected
          ? "border-accent bg-elevated"
          : "border-border hover:border-accent/40 hover:bg-elevated active:scale-[0.99]"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`shrink-0 font-mono text-sm transition-colors ${
            isSelected ? "text-accent" : "text-muted group-hover:text-accent"
          }`}
        >
          {label}
        </span>
        <span className="text-base leading-relaxed text-foreground md:text-lg">
          {text}
        </span>
      </div>
    </button>
  );
}
