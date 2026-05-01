const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const HTML_FILES = fs.readdirSync(ROOT).filter((file) => file.toLowerCase().endsWith('.html'));
const JS_FILES = ['app.js', 'ethernum-shared.js', 'cartola.js'];
const EXPECTED_VERSION = 'v2.8';

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function existsLocal(ref) {
  if (/^(https?:|mailto:|javascript:|data:|#)/i.test(ref)) return true;
  if (/^[a-z]:\\/i.test(ref)) return false;
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (!clean) return true;
  return fs.existsSync(path.join(ROOT, clean));
}

for (const file of JS_FILES) {
  try {
    new vm.Script(read(file), { filename: file });
    pass(`${file} parses`);
  } catch (error) {
    fail(`${file} syntax error: ${error.message}`);
  }
}

for (const file of HTML_FILES) {
  const html = read(file);
  const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
  for (let index = 0; index < scripts.length; index += 1) {
    try {
      new vm.Script(scripts[index][1], { filename: `${file} inline script ${index + 1}` });
    } catch (error) {
      fail(`${file} inline script ${index + 1}: ${error.message}`);
    }
  }

  const refs = [...html.matchAll(/(?:href|src)=["']([^"'#]+)(?:#[^"']*)?["']/gi)].map((match) => match[1]);
  for (const ref of refs) {
    if (!existsLocal(ref)) fail(`${file} references missing local asset: ${ref}`);
  }
  pass(`${file} inline scripts and local references checked`);
}

const testsHtml = read('TESTS.html');
const testIds = [...testsHtml.matchAll(/test(\d+): false/g)].map((match) => Number(match[1]));
const missingTestValidators = testIds.filter((id) => !testsHtml.includes(`function validateTest${id}()`));
if (testIds.length !== 19) fail(`expected 19 tests, found ${testIds.length}`);
else pass('TESTS.html exposes 19 manual tests');
if (missingTestValidators.length) fail(`missing validators for tests: ${missingTestValidators.join(', ')}`);
else pass('all manual tests have validators');

for (const file of ['index.html', 'TESTS.html', 'app.js']) {
  if (!read(file).includes(EXPECTED_VERSION)) fail(`${file} does not mention ${EXPECTED_VERSION}`);
  else pass(`${file} mentions ${EXPECTED_VERSION}`);
}

const cartolaSource = read('cartola.js');
const cartolaEffects = [...cartolaSource.matchAll(/\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g)].length;
const cartolaStages = [...cartolaSource.matchAll(/stageBadge\("([^"]+)"/g)].length;
if (cartolaEffects !== 85) fail(`cartola.js expected 85 effects, found ${cartolaEffects}`);
else pass('cartola.js has 85 detected effects');
if (cartolaStages !== 6) fail(`cartola.js expected 6 stage badges, found ${cartolaStages}`);
else pass('cartola.js has 6 detected stages');

if (failures) {
  console.error(`\n${failures} self-test failure(s).`);
  process.exit(1);
}

console.log('\nAll self-tests passed.');
