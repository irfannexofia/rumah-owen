const fs = require("fs");

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

const text = fs.readFileSync("test1 rumah - Sheet1.csv", "utf8");
const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim().length > 0);
const headers = parseCSVLine(lines[0]).map((h) => h.trim());
const rows = lines.slice(1).map((line) => {
  const values = parseCSVLine(line);
  const obj = {};
  headers.forEach((h, idx) => {
    obj[h] = (values[idx] || "").trim();
  });
  return obj;
});

rows.forEach((r, i) => {
  console.log(`=== ROW ${i} ===`);
  Object.entries(r).forEach(([k, v]) => {
    if (/^https?:/.test(v)) {
      console.log(`  ${k}: [IMG]`);
    } else {
      console.log(`  ${k}: "${v}"`);
    }
  });
});