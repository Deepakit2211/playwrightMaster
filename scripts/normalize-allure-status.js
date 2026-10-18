// Marks every "broken" Allure result (test, step, hook) as "failed".
// Synchronous on purpose: it is also called from a process 'exit' handler.
const fs = require('fs');
const path = require('path');

const fix = (node) => {
  if (!node || typeof node !== 'object') return;
  if (node.status === 'broken') node.status = 'failed';
  ['steps', 'befores', 'afters'].forEach((k) => (node[k] || []).forEach(fix));
};

function normalize(dir = 'allure-results') {
  const resultsDir = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(resultsDir)) return;

  fs.readdirSync(resultsDir)
    .filter((f) => f.endsWith('-result.json') || f.endsWith('-container.json'))
    .forEach((f) => {
      const p = path.join(resultsDir, f);
      try {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        fix(data);
        fs.writeFileSync(p, JSON.stringify(data));
      } catch (e) {
        console.warn(`normalize-allure-status: skipped ${f} (${e.message})`);
      }
    });
}

module.exports = normalize;

// Allow: node scripts/normalize-allure-status.js [dir]
if (require.main === module) normalize(process.argv[2]);
