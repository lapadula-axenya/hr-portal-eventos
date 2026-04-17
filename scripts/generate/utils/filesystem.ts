import fs from "fs";

export function ensureIndexFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", "utf8");
  }
}

export function appendExportIfMissing(filePath: string, exportLine: string) {
  const content = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (!lines.includes(exportLine)) {
    lines.push(exportLine);
    lines.sort((a, b) => a.localeCompare(b));
    fs.writeFileSync(filePath, lines.join("\n") + "\n", "utf8");
  }
}
