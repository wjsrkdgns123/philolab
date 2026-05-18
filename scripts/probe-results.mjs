// 16개 결과 코드를 두 방향에서 검증:
//   ① lib/results.ts 의 nature/shadow.philosopher 가 CLAUDE.md 명세와 일치하는지
//   ② dev 서버의 결과 페이지가 HTTP 200 으로 응답하는지
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// 명세서(CLAUDE.md "## 16개 결과 콘텐츠") 기준 기대값
const expected = {
  ACEG: ["니체", "칸트"],
  ACEH: ["장자", "헤겔"],
  ACFG: ["카뮈", "플라톤"],
  ACFH: ["노자", "마르크스"],
  ADEG: ["마르크스", "노자"],
  ADEH: ["스피노자", "사르트르"],
  ADFG: ["헤겔", "장자"],
  ADFH: ["헤라클레이토스", "에피쿠로스"],
  BCEG: ["아리스토텔레스", "쇼펜하우어"],
  BCEH: ["에피쿠로스", "헤라클레이토스"],
  BCFG: ["공자", "니체"],
  BCFH: ["세네카", "들뢰즈"],
  BDEG: ["사르트르", "스피노자"],
  BDEH: ["쇼펜하우어", "아리스토텔레스"],
  BDFG: ["칸트", "니체"],
  BDFH: ["플라톤", "카뮈"],
};

// --- ① results.ts 정적 파싱 -------------------------------------------------
// 각 코드를 앵커로 명시 검색해 정규식 backtrack 의존을 줄임.
const text = fs.readFileSync(path.join(PROJECT_ROOT, "lib", "results.ts"), "utf8");
const found = {};
for (const code of Object.keys(expected)) {
  const re = new RegExp(
    `\\b${code}:\\s*\\{[\\s\\S]*?nature[\\s\\S]*?philosopher:\\s*"([^"]+)"[\\s\\S]*?shadow[\\s\\S]*?philosopher:\\s*"([^"]+)"`,
  );
  const m = text.match(re);
  if (m) found[code] = [m[1], m[2]];
}

// --- ② HTTP probe ----------------------------------------------------------
const BASE = process.argv[2] || "http://localhost:3000";
const httpStatus = {};
for (const code of Object.keys(expected)) {
  try {
    const res = await fetch(`${BASE}/two-philosophers/result?code=${code}`);
    httpStatus[code] = res.status;
  } catch (e) {
    httpStatus[code] = `ERR:${e.code || e.message}`;
  }
}
console.log(`Probing against: ${BASE}\n`);

// --- 결과 ----------------------------------------------------------------
let pass = 0, fail = 0;
const W = (s, n) => String(s).padEnd(n);
console.log(W("code", 6) + W("expected", 30) + W("actual", 30) + W("http", 6) + "ok");
console.log("-".repeat(72));
for (const code of Object.keys(expected)) {
  const [eN, eS] = expected[code];
  const a = found[code];
  const actual = a ? `${a[0]} / ${a[1]}` : "MISSING";
  const dataOk = a && a[0] === eN && a[1] === eS;
  const httpOk = httpStatus[code] === 200;
  const ok = dataOk && httpOk;
  if (ok) pass++; else fail++;
  console.log(
    W(code, 6) +
    W(`${eN} / ${eS}`, 30) +
    W(actual, 30) +
    W(httpStatus[code], 6) +
    (ok ? "✓" : "✗")
  );
}

console.log("-".repeat(72));
console.log(`Result: ${pass}/${pass + fail} passed${fail ? `  (${fail} failed)` : ""}`);
process.exit(fail ? 1 : 0);
