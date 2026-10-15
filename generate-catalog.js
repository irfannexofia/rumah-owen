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

const text = fs.readFileSync("Katalog Properti BSD & Serpong (Residential & Commercial) - Residential.csv", "utf8");
const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim().length > 0);
const headers = parseCSVLine(lines[0]).map((h) => h.trim());
const rows = lines.slice(1).map((line) => {
  const values = parseCSVLine(line);
  const obj = {};
  headers.forEach((h, idx) => {
    if (h) obj[h] = (values[idx] || "").trim();
  });
  obj._columns = values;
  return obj;
});

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parsePrice(str) {
  if (!str) return { text: "Hubungi Owen untuk Harga", value: undefined };
  let clean = str.replace(/^"|"$/g, "").trim();
  if (!clean.toLowerCase().startsWith("rp")) {
    clean = "Rp " + clean;
  }
  const match = clean.match(/(\d+([.,]\d+)?)\s*M/i);
  let value = undefined;
  if (match) {
    const num = parseFloat(match[1].replace(",", "."));
    value = Math.round(num * 1000);
  }
  return { text: `Mulai ${clean}`, value };
}

function determineSubCategory(priceVal) {
  if (!priceVal) return "Rumah 1-2M";
  if (priceVal <= 2500) return "Rumah 1-2M";
  if (priceVal <= 4500) return "Rumah 3-4M";
  if (priceVal <= 8000) return "Rumah 5-7M";
  return "Rumah 9-20M";
}

const items = rows.map((row) => {
  const dev = row["Developer"] || "Sinar Mas Land";
  const areaRaw = row["Kawasan/Area"] || "BSD";
  const cluster = row["Nama Cluster"] || "";
  const subCluster = row["Sub-Cluster"] || cluster;
  const tipe = row["Tipe Unit"] || "";
  const lt = row["Luas Tanah"] || "";
  const lb = row["Luas Bangunan"] || "";
  const bed = row["Kamar tidur"] || "";
  const bath = row["Kamar mandi"] || "";
  const priceRaw = row["Start From"] || "";
  const layout = row["Layout"] || "";
  const extraImg = "";

  const galleryCols = row._columns.slice(11, 19).map((value) => (value || "").trim()).filter(Boolean);

  let mainImage = galleryCols[0] || "\/properties\/bsd\/eonna-elyon-8-frontal.jpg";
  let gallery = [];
  gallery = galleryCols.slice(1);

  const { text: priceText, value: priceVal } = parsePrice(priceRaw);
  const subCategory = determineSubCategory(priceVal);

  const slug = slugify(`${cluster}-${tipe}`);
  const title = `${cluster} ${tipe} (${subCluster})`;

  return {
    slug,
    title,
    category: "Residential",
    subCategory,
    location: "BSD",
    developer: dev,
    price: priceText,
    priceValue: priceVal,
    landSize: `LT ${lt.trim().endsWith("m") ? lt.trim() + "²" : lt.trim()}`,
    buildingSize: `LB ${lb.trim().endsWith("m") ? lb.trim() + "²" : lb.trim()}`,
    bedrooms: `${bed} Kamar Tidur`,
    bathrooms: `${bath} Kamar Mandi`,
    type: `${cluster} - ${subCluster}`,
    image: mainImage,
    gallery,
    layout: layout || undefined,
    highlight: `Cluster ${cluster} persembahan ${dev} di ${areaRaw}, tipe ${tipe} dengan luas tanah ${lt} dan luas bangunan ${lb}.`,
    description: `Hunian modern di ${areaRaw} (${subCluster}). Unit tipe ${tipe} dengan ${bed} kamar tidur dan ${bath} kamar mandi dirancang untuk kenyamanan keluarga modern dengan fasilitas lingkungan terlengkap.`
  };
});

const tsCode = `import { PropertyItem } from "./commercial";

export interface CatalogProperty extends PropertyItem {
  gallery?: string[];
  layout?: string;
}

export const catalogProperties: CatalogProperty[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync("data/catalog-import.ts", tsCode);
console.log("Wrote data/catalog-import.ts with", items.length, "items.");


