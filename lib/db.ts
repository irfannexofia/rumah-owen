import Database from "better-sqlite3";
import path from "path";
import { defaultContent } from "@/lib/content-defaults";
import { getCached, invalidateCache, setCached } from "@/lib/cache";

export type ContentBlock = {
  id: number;
  key: string;
  title: string;
  content: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type PromoLandingPage = {
  id: number;
  slug: string;
  title: string;
  isPublished: boolean;
  content: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type ContentRow = {
  id: number;
  key: string;
  title: string;
  content_json: string;
  created_at: string;
  updated_at: string;
};

type PromoRow = {
  id: number;
  slug: string;
  title: string;
  is_published: number;
  content_json: string;
  created_at: string;
  updated_at: string;
};

const dbPath = process.env.DATABASE_PATH || "./data/content.sqlite";
const resolvedDbPath = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);

let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    db = new Database(resolvedDbPath);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS content_blocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        content_json TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS promo_landing_pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        is_published INTEGER NOT NULL DEFAULT 0,
        content_json TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    seedDefaults();
  }
  return db;
}

function seedDefaults() {
  const database = db;
  if (!database) return;
  const insert = database.prepare(`
    INSERT OR IGNORE INTO content_blocks (key, title, content_json)
    VALUES (@key, @title, @contentJson)
  `);

  Object.entries(defaultContent).forEach(([key, content]) => {
    insert.run({
      key,
      title: key.replace(/-/g, " "),
      contentJson: JSON.stringify(content, null, 2)
    });
  });
}

function parseRow(row: ContentRow): ContentBlock {
  return {
    id: row.id,
    key: row.key,
    title: row.title,
    content: JSON.parse(row.content_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function parsePromoRow(row: PromoRow): PromoLandingPage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    isPublished: Boolean(row.is_published),
    content: JSON.parse(row.content_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function listContentBlocks() {
  const cacheKey = "content:list";
  const cached = getCached<ContentBlock[]>(cacheKey);
  if (cached) return cached;

  const rows = getDb().prepare("SELECT * FROM content_blocks ORDER BY key ASC").all() as ContentRow[];
  const blocks = rows.map(parseRow);
  setCached(cacheKey, blocks);
  return blocks;
}

export function getContentBlock(key: string) {
  const cacheKey = `content:${key}`;
  const cached = getCached<ContentBlock>(cacheKey);
  if (cached) return cached;

  const row = getDb().prepare("SELECT * FROM content_blocks WHERE key = ?").get(key) as ContentRow | undefined;
  if (!row) return null;
  const block = parseRow(row);
  setCached(cacheKey, block);
  return block;
}

export function getContent<T extends Record<string, unknown>>(key: string, fallback: T): T {
  const block = getContentBlock(key);
  return block ? ({ ...fallback, ...block.content } as T) : fallback;
}

export function createContentBlock(input: { key: string; title: string; content: Record<string, unknown> }) {
  const result = getDb()
    .prepare("INSERT INTO content_blocks (key, title, content_json) VALUES (?, ?, ?)")
    .run(input.key, input.title, JSON.stringify(input.content, null, 2));
  invalidateContent(input.key);
  return result.lastInsertRowid;
}

export function updateContentBlock(key: string, input: { title: string; content: Record<string, unknown> }) {
  const result = getDb()
    .prepare("UPDATE content_blocks SET title = ?, content_json = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?")
    .run(input.title, JSON.stringify(input.content, null, 2), key);
  invalidateContent(key);
  return result.changes;
}

export function deleteContentBlock(key: string) {
  const result = getDb().prepare("DELETE FROM content_blocks WHERE key = ?").run(key);
  invalidateContent(key);
  return result.changes;
}

function invalidateContent(key: string) {
  invalidateCache(`content:${key}`);
  invalidateCache("content:list");
}

export function listPromoPages() {
  const cacheKey = "promos:list";
  const cached = getCached<PromoLandingPage[]>(cacheKey);
  if (cached) return cached;

  const rows = getDb().prepare("SELECT * FROM promo_landing_pages ORDER BY updated_at DESC").all() as PromoRow[];
  const pages = rows.map(parsePromoRow);
  setCached(cacheKey, pages);
  return pages;
}

export function getPromoPage(slug: string, includeDraft = false) {
  const cacheKey = `promo:${slug}:${includeDraft ? "draft" : "published"}`;
  const cached = getCached<PromoLandingPage>(cacheKey);
  if (cached) return cached;

  const query = includeDraft
    ? "SELECT * FROM promo_landing_pages WHERE slug = ?"
    : "SELECT * FROM promo_landing_pages WHERE slug = ? AND is_published = 1";
  const row = getDb().prepare(query).get(slug) as PromoRow | undefined;
  if (!row) return null;
  const page = parsePromoRow(row);
  setCached(cacheKey, page);
  return page;
}

export function createPromoPage(input: { slug: string; title: string; isPublished: boolean; content: Record<string, unknown> }) {
  const result = getDb()
    .prepare("INSERT INTO promo_landing_pages (slug, title, is_published, content_json) VALUES (?, ?, ?, ?)")
    .run(input.slug, input.title, input.isPublished ? 1 : 0, JSON.stringify(input.content, null, 2));
  invalidatePromo(input.slug);
  return result.lastInsertRowid;
}

export function updatePromoPage(slug: string, input: { title: string; isPublished: boolean; content: Record<string, unknown> }) {
  const result = getDb()
    .prepare("UPDATE promo_landing_pages SET title = ?, is_published = ?, content_json = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?")
    .run(input.title, input.isPublished ? 1 : 0, JSON.stringify(input.content, null, 2), slug);
  invalidatePromo(slug);
  return result.changes;
}

export function deletePromoPage(slug: string) {
  const result = getDb().prepare("DELETE FROM promo_landing_pages WHERE slug = ?").run(slug);
  invalidatePromo(slug);
  return result.changes;
}

function invalidatePromo(slug: string) {
  invalidateCache(`promo:${slug}:draft`);
  invalidateCache(`promo:${slug}:published`);
  invalidateCache("promos:list");
}
