// Wikipedia summary + Commons imageinfo API로 17명 철학자 lead 초상화 다운로드.
// 결과: public/philosophers/{slug}.{ext} + scripts/download-report.json
import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(PROJECT_ROOT, "public", "philosophers");
fs.mkdirSync(OUT_DIR, { recursive: true });

const philosophers = {
  nietzsche: "Friedrich_Nietzsche",
  kant: "Immanuel_Kant",
  zhuangzi: "Zhuang_Zhou",
  hegel: "Georg_Wilhelm_Friedrich_Hegel",
  camus: "Albert_Camus",
  plato: "Plato",
  laozi: "Laozi",
  marx: "Karl_Marx",
  spinoza: "Baruch_Spinoza",
  sartre: "Jean-Paul_Sartre",
  heraclitus: "Heraclitus",
  epicurus: "Epicurus",
  aristotle: "Aristotle",
  schopenhauer: "Arthur_Schopenhauer",
  confucius: "Confucius",
  seneca: "Seneca_the_Younger",
  deleuze: "Gilles_Deleuze",
};

const UA = "philolab/1.0 (https://philolab.kr) Node-script";

function fetchJson(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error("too many redirects"));
    https
      .get(url, { headers: { "User-Agent": UA, "Accept": "application/json" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchJson(res.headers.location, redirectCount + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      })
      .on("error", reject);
  });
}

function downloadFile(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error("too many redirects"));
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, dest, redirectCount + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
        file.on("error", (e) => { try { fs.unlinkSync(dest); } catch {} reject(e); });
      })
      .on("error", reject);
  });
}

async function getImageLicense(filename) {
  const apiUrl =
    `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}` +
    `&prop=imageinfo&iiprop=extmetadata&format=json`;
  try {
    const json = await fetchJson(apiUrl);
    const pages = json.query?.pages || {};
    for (const p of Object.values(pages)) {
      const meta = p.imageinfo?.[0]?.extmetadata;
      if (meta) {
        return {
          license: meta.LicenseShortName?.value || meta.License?.value || "unknown",
          artist: (meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim(),
        };
      }
    }
  } catch (e) {
    return { license: "error", error: e.message };
  }
  return { license: "not-found" };
}

const FREE_HINTS = ["public domain", "cc0", "cc by", "cc-by", "pd-", "pd "];
function classify(lic) {
  if (!lic) return "unknown";
  const l = lic.toLowerCase();
  if (FREE_HINTS.some((f) => l.includes(f))) return "free";
  if (l === "unknown" || l === "not-found" || l === "error") return "unknown";
  return "non-free";
}

const report = [];
for (const [slug, title] of Object.entries(philosophers)) {
  process.stdout.write(`▸ ${slug.padEnd(14)} `);
  try {
    const summary = await fetchJson(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    );
    const imageUrl = summary.originalimage?.source || summary.thumbnail?.source;
    if (!imageUrl) { console.log("✗ no lead image"); report.push({ slug, status: "no-image" }); continue; }
    const filename = decodeURIComponent(path.basename(new URL(imageUrl).pathname));
    const lic = await getImageLicense(filename);
    const verdict = classify(lic.license);
    const ext = (path.extname(filename) || ".jpg").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
    const dest = path.join(OUT_DIR, `${slug}${safeExt}`);
    await downloadFile(imageUrl, dest);
    console.log(`✓ [${verdict.padEnd(8)}] ${lic.license}  ·  ${filename}`);
    report.push({
      slug,
      title,
      file: `${slug}${safeExt}`,
      source: imageUrl,
      filename,
      license: lic.license,
      artist: lic.artist || "",
      verdict,
    });
  } catch (e) {
    console.log(`✗ ${e.message}`);
    report.push({ slug, title, status: "error", error: e.message });
  }
}

fs.writeFileSync(path.join(__dirname, "download-report.json"), JSON.stringify(report, null, 2));

console.log("\n=== SUMMARY ===");
const groups = { free: [], "non-free": [], unknown: [], error: [], "no-image": [] };
for (const r of report) {
  const key = r.verdict || r.status || "unknown";
  (groups[key] || groups.unknown).push(r);
}
for (const [k, list] of Object.entries(groups)) {
  if (!list.length) continue;
  console.log(`\n[${k.toUpperCase()}] ${list.length}`);
  for (const r of list) {
    console.log(`  · ${r.slug}  ${r.license || r.status || ""}`);
  }
}
