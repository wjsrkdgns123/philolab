// 다운로드한 철학자 초상화를 240x240 cover webp(품질 82)로 일괄 변환.
// 원본 파일은 삭제. 사용 안 하는 laozi/deleuze는 정리.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "..", "public", "philosophers");

const SKIP = new Set(["laozi", "deleuze"]); // 모노그램 fallback — 파일 정리

const files = fs.readdirSync(DIR);
for (const f of files) {
  const ext = path.extname(f).toLowerCase();
  const stem = path.basename(f, ext);
  const src = path.join(DIR, f);

  if (SKIP.has(stem)) {
    fs.unlinkSync(src);
    console.log(`  ✕ removed ${f} (using monogram)`);
    continue;
  }

  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

  const out = path.join(DIR, `${stem}.webp`);
  const tmp = path.join(DIR, `${stem}.tmp.webp`);

  await sharp(src)
    .resize({ width: 240, height: 240, fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(tmp);

  if (src !== out) fs.unlinkSync(src);
  fs.renameSync(tmp, out);

  const { size } = fs.statSync(out);
  console.log(`  ✓ ${stem}.webp  ${(size / 1024).toFixed(1)} KB`);
}

console.log("\nDone.");
