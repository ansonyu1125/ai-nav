import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, ".."); const app = path.join(root, "app"); const failures = [];
function walk(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const file = path.join(dir, entry.name); if (entry.isDirectory()) walk(file); else if (entry.name === "page.tsx") { const source = fs.readFileSync(file, "utf8"); const route = file.slice(app.length).replaceAll("\\", "/").replace(/\/page\.tsx$/, ""); if (route && !source.includes("metadata") && !source.includes("generateMetadata")) failures.push(`${route}: missing metadata`); if (route && !route.includes("[") && !route.startsWith("/admin") && !source.includes("canonical")) failures.push(`${route}: missing canonical`); } } }
walk(app); if (failures.length) { console.error(failures.join("\n")); process.exit(1); } console.log("SEO audit passed: metadata and canonical coverage are complete for indexable static pages.");
