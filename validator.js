const fs = require("fs");
const c = fs.readFileSync("skills/frontend/SKILL.md", "utf-8");
const parts = c.split("---");
const fm = parts[1];
for (const line of fm.trim().split("\n")) {
  const m = line.match(/^(\w+):\s(.*)$/);
  if (m && m[1] === "description" && m[2].includes(": ") && !/^["']/.test(m[2])) {
    console.error('FAIL: unquoted \": \"');
    process.exit(1);
  }
}
console.log("OK");
