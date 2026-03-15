import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { PDFParse } from "pdf-parse";

function pickFirstMatch(text, re) {
  const m = text.match(re);
  return m ? m[0] : null;
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function normalizeWhitespace(s) {
  return s.replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function sectionize(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Heuristic: treat ALL CAPS or "Title Case-ish" lines as possible headers.
  const headers = new Set([
    "summary",
    "profile",
    "experience",
    "work experience",
    "projects",
    "education",
    "skills",
    "technical skills",
    "certifications",
    "certification",
    "awards",
    "publications",
    "activities",
    "contact",
  ]);

  const sections = new Map();
  let current = "top";
  sections.set(current, []);

  for (const line of lines) {
    const lower = line.toLowerCase();
    const looksLikeHeader =
      headers.has(lower) ||
      (/^[A-Z][A-Z\s/&-]{2,}$/.test(line) && line.length <= 40) ||
      (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,5}$/.test(line) && line.length <= 28 && headers.has(lower));

    if (looksLikeHeader) {
      current = lower;
      if (!sections.has(current)) sections.set(current, []);
      continue;
    }
    sections.get(current).push(line);
  }

  return Object.fromEntries(sections.entries());
}

async function main() {
  const pdfPath = process.argv[2];
  if (!pdfPath) {
    // eslint-disable-next-line no-console
    console.error("usage: node scripts/extract-resume.mjs <resume.pdf>");
    process.exit(2);
  }

  const abs = path.resolve(pdfPath);
  const buf = await fs.readFile(abs);
  const parser = new PDFParse({ data: buf });
  const parsed = await parser.getText();
  const text = normalizeWhitespace(parsed.text || "");

  const email = pickFirstMatch(text, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phone = pickFirstMatch(
    text,
    /(\+\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/
  );
  const urls = uniq(
    (text.match(/https?:\/\/[^\s)]+/gi) || [])
      .map((u) => u.replace(/[.,;]+$/, ""))
      .filter((u) => u.length <= 200)
  );

  const linkedIn = urls.find((u) => /linkedin\.com\/in\//i.test(u)) || null;
  const github = urls.find((u) => /github\.com\//i.test(u)) || null;

  const sections = sectionize(text);
  const top = (sections.top || []).slice(0, 12);

  const guessName = top
    .find((l) => /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(l) && l.length <= 40)
    || null;

  const result = {
    name: guessName,
    email,
    phone,
    linkedIn,
    github,
    urls,
    sections,
    rawText: text,
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(String(err?.stack || err));
  process.exit(1);
});
