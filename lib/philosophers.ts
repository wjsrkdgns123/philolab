// 철학자 이름 → 시각 표현(사진 또는 모노그램) 매핑.
// 사진은 Wikimedia Commons의 free license 이미지만 사용. 라이선스 보고서:
// scripts/download-report.json. fallback은 모노그램(이름 첫 글자, 세리프).

export interface PhilosopherVisual {
  image?: string;   // free license 사진 — public/philosophers/{slug}.webp
  monogram: string; // fallback 또는 alt
}

export const philosopherVisuals: Record<string, PhilosopherVisual> = {
  니체:       { image: "/philosophers/nietzsche.webp",    monogram: "N" },
  칸트:       { image: "/philosophers/kant.webp",         monogram: "K" },
  장자:       { image: "/philosophers/zhuangzi.webp",     monogram: "莊" },
  헤겔:       { image: "/philosophers/hegel.webp",        monogram: "H" },
  카뮈:       { image: "/philosophers/camus.webp",        monogram: "C" },
  플라톤:     { image: "/philosophers/plato.webp",        monogram: "P" },
  마르크스:   { image: "/philosophers/marx.webp",         monogram: "M" },
  스피노자:   { image: "/philosophers/spinoza.webp",      monogram: "S" },
  사르트르:   { image: "/philosophers/sartre.webp",       monogram: "S" },
  헤라클레이토스: { image: "/philosophers/heraclitus.webp", monogram: "H" },
  에피쿠로스: { image: "/philosophers/epicurus.webp",     monogram: "E" },
  아리스토텔레스: { image: "/philosophers/aristotle.webp", monogram: "A" },
  쇼펜하우어: { image: "/philosophers/schopenhauer.webp", monogram: "S" },
  공자:       { image: "/philosophers/confucius.webp",    monogram: "孔" },
  세네카:     { image: "/philosophers/seneca.webp",       monogram: "S" },

  // 사진 미사용 — free license 확인 불가 또는 적합 이미지 없음
  노자:       { monogram: "老" },  // 영문 위키 lead가 한자 텍스트 이미지였음
  들뢰즈:     { monogram: "D" },   // Commons에서 라이선스 not-found
};

export function getPhilosopherVisual(name: string): PhilosopherVisual {
  return philosopherVisuals[name] ?? { monogram: name.charAt(0) };
}
