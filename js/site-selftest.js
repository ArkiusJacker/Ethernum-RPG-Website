const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const HTML_FILES = walk(ROOT).filter((file) =>
  file.toLowerCase().endsWith(".html"),
);
const JS_FILES = [
  "js/app.js",
  "js/index-app.js",
  "js/ethernum-shared.js",
  "js/api-reference.js",
  "js/cartola.js",
  "data/characters.js",
  "data/mechanics.js",
  "data/world.js",
];
const EXPECTED_VERSION = "v3.9";
const LEGACY_VERSION = "v3.8";
const REQUIRED_FILES = ["ROADMAP.md", "pages/sistema/roadmap.html"];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [path.relative(ROOT, full).replace(/\\/g, "/")];
  });
}

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function existsLocal(ref, baseFile) {
  if (/^(https?:|mailto:|javascript:|data:|#)/i.test(ref)) return true;
  if (/^[a-z]:\\/i.test(ref)) return false;
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (!clean) return true;
  return fs.existsSync(path.resolve(ROOT, path.dirname(baseFile), clean));
}

for (const file of JS_FILES) {
  try {
    new vm.Script(read(file), { filename: file });
    pass(`${file} parses`);
  } catch (error) {
    fail(`${file} syntax error: ${error.message}`);
  }
}

for (const file of REQUIRED_FILES) {
  if (!fs.existsSync(path.join(ROOT, file))) fail(`${file} is missing`);
  else pass(`${file} exists`);
}

for (const file of HTML_FILES) {
  const html = read(file);
  const scripts = [
    ...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  for (let index = 0; index < scripts.length; index += 1) {
    try {
      new vm.Script(scripts[index][1], {
        filename: `${file} inline script ${index + 1}`,
      });
    } catch (error) {
      fail(`${file} inline script ${index + 1}: ${error.message}`);
    }
  }

  const refs = [
    ...html.matchAll(/(?:href|src)=["']([^"'#]+)(?:#[^"']*)?["']/gi),
  ].map((match) => match[1]);
  for (const ref of refs) {
    if (!existsLocal(ref, file))
      fail(`${file} references missing local asset: ${ref}`);
  }
  pass(`${file} inline scripts and local references checked`);
}

const testsHtml = read("pages/ferramentas/tests.html");
const testIds = [...testsHtml.matchAll(/test(\d+): false/g)].map((match) =>
  Number(match[1]),
);
const missingTestValidators = testIds.filter(
  (id) => !testsHtml.includes(`function validateTest${id}()`),
);
if (testIds.length !== 22) fail(`expected 22 tests, found ${testIds.length}`);
else pass("pages/ferramentas/tests.html exposes 22 manual tests");
if (missingTestValidators.length)
  fail(`missing validators for tests: ${missingTestValidators.join(", ")}`);
else pass("all manual tests have validators");

for (const file of [
  "index.html",
  "js/index-app.js",
  "data/world.js",
]) {
  if (!read(file).includes(EXPECTED_VERSION))
    fail(`${file} does not mention ${EXPECTED_VERSION}`);
  else pass(`${file} mentions ${EXPECTED_VERSION}`);
}

for (const file of ["pages/ferramentas/tests.html", "js/app.js"]) {
  if (!read(file).includes(LEGACY_VERSION))
    fail(`${file} does not mention ${LEGACY_VERSION}`);
  else pass(`${file} mentions ${LEGACY_VERSION}`);
}

if (failures) {
  console.error(`\n${failures} self-test failure(s).`);
  process.exit(1);
}

console.log("\nAll self-tests passed.");
