export interface Question {
  id: number;
  axis: 1 | 2 | 3 | 4;
  question: string;
  optionA: string;
  optionB: string;
}

export const questions: Question[] = [
  // 축 1: 존재론 (변화 A ↔ 본질 B)
  {
    id: 1,
    axis: 1,
    question: "강이 흐른다. 어제 본 강과 오늘 본 강은 같은 강일까?",
    optionA: "다른 강이다. 물은 이미 흘러갔다.",
    optionB: "같은 강이다. 강이라는 이름이 있다.",
  },
  {
    id: 2,
    axis: 1,
    question: "10년 전의 나와 지금의 나, 변하지 않은 핵심이 있을까?",
    optionA: "없다. 그래도 '나'라고 부른다.",
    optionB: "있다. 그게 '나'다.",
  },
  {
    id: 3,
    axis: 1,
    question: "좋은 친구 관계의 본질은 무엇일까?",
    optionA: "변화를 함께 통과하는 능력",
    optionB: "변하지 않는 신뢰와 약속",
  },
  // 축 2: 인식론 (경험 C ↔ 이성 D)
  {
    id: 4,
    axis: 2,
    question: "누군가의 말이 옳은지 판단할 때, 더 중요한 것은?",
    optionA: "그 사람이 겪은 일과 사례",
    optionB: "그 말 자체의 논리",
  },
  {
    id: 5,
    axis: 2,
    question: "처음 가는 도시, 어떤 방식이 더 끌릴까?",
    optionA: "일단 걸어다닌다. 감으로 안다.",
    optionB: "지도와 정보를 먼저 본다. 구조로 안다.",
  },
  {
    id: 6,
    axis: 2,
    question: "강한 직관이 들 때, 어떻게 반응할까?",
    optionA: "직관을 따른다. 몸이 먼저 안다.",
    optionB: "직관을 의심한다. 이유를 찾는다.",
  },
  // 축 3: 윤리관 (욕망 긍정 E ↔ 절제 F)
  {
    id: 7,
    axis: 3,
    question: "강렬한 욕망이 떠올랐다. 그것을 어떻게 다룰까?",
    optionA: "솔직히 마주하고 따른다. 욕망은 신호다.",
    optionB: "거리를 두고 다스린다. 욕망은 충동이다.",
  },
  {
    id: 8,
    axis: 3,
    question: "고통에 대한 생각, 어느 쪽에 가까울까?",
    optionA: "의미가 있다. 견디면 더 강해진다.",
    optionB: "가능하면 피해야 한다. 의미 부여는 자기위안이다.",
  },
  {
    id: 9,
    axis: 3,
    question: "누군가를 미워하는 마음이 든다. 어떻게 다룰까?",
    optionA: "미움도 나의 일부다. 부정하지 않는다.",
    optionB: "미움은 나를 좀먹는다. 흘려보낸다.",
  },
  // 축 4: 태도 (행동 G ↔ 관조 H)
  {
    id: 10,
    axis: 4,
    question: "부조리한 상황을 만났을 때, 어느 쪽에 가까울까?",
    optionA: "바꾸려고 움직인다.",
    optionB: "거리를 두고 본다.",
  },
  {
    id: 11,
    axis: 4,
    question: "\"세상은 원래 그렇다\"는 말, 어떻게 받아들일까?",
    optionA: "동의 못 한다. 세상은 바꿀 수 있다.",
    optionB: "어느 정도 받아들인다. 흐름을 거스르지 않는 지혜도 있다.",
  },
  {
    id: 12,
    axis: 4,
    question: "1년 뒤, 어떤 모습이 되고 싶을까?",
    optionA: "무언가를 성취하고 변화시킨 사람",
    optionB: "더 깊이 이해하고 평온한 사람",
  },
];

export type Answer = "a" | "b";

/**
 * 12개 답변 배열을 받아 4글자 결과 코드(예: "ACEG")를 반환
 */
export function calculateCode(answers: Answer[]): string {
  if (answers.length !== 12) {
    throw new Error("12개의 답변이 필요합니다.");
  }

  // 각 축의 (a) 선택 횟수 계산
  const axis1A = countA(answers, [0, 1, 2]);
  const axis2A = countA(answers, [3, 4, 5]);
  const axis3A = countA(answers, [6, 7, 8]);
  const axis4A = countA(answers, [9, 10, 11]);

  // 점수 → 글자 변환 (3문항 중 2회 이상 a면 첫 글자)
  const char1 = axis1A >= 2 ? "A" : "B";
  const char2 = axis2A >= 2 ? "C" : "D";
  const char3 = axis3A >= 2 ? "E" : "F";
  const char4 = axis4A >= 2 ? "G" : "H";

  return char1 + char2 + char3 + char4;
}

function countA(answers: Answer[], indices: number[]): number {
  return indices.filter((i) => answers[i] === "a").length;
}
