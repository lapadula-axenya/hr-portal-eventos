import fs from "fs";
import path from "path";
import { ensureIndexFile, appendExportIfMissing } from "../utils/filesystem";
import { toPascalCase, toCamelCase } from "../utils/naming";

const BASE_PATH = path.resolve("src/components");
const TEMPLATE_PATH = path.resolve(__dirname, "templates");

export function generateComponent(section: string, component: string) {
  const componentName = toPascalCase(component);
  const styleVarName = `${toCamelCase(component)}ContainerStyles`;

  const sectionDir = path.join(BASE_PATH, section);
  const sectionIndex = path.join(sectionDir, "index.ts");
  const globalIndex = path.join(BASE_PATH, "index.ts");
  const componentDir = path.join(sectionDir, component);

  // Create folders
  if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir, { recursive: true });
  if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir);

  // Update export indexes
  ensureIndexFile(globalIndex);
  appendExportIfMissing(globalIndex, `export * from "./${section}";`);

  ensureIndexFile(sectionIndex);
  appendExportIfMissing(sectionIndex, `export * from "./${component}";`);

  // Read templates and write component files
  const templates: Record<string, string> = {
    [`${componentName}.tsx`]: "Component.tsx.template",
    [`${componentName}.hook.ts`]: "Component.hook.ts.template",
    [`${componentName}.props.ts`]: "Component.props.ts.template",
    [`${componentName}.styles.ts`]: "Component.styles.ts.template",
    [`index.ts`]: "index.ts.template",
  };

  Object.entries(templates).forEach(([filename, templateFile]) => {
    const templatePath = path.join(TEMPLATE_PATH, templateFile);
    const targetPath = path.join(componentDir, filename);

    if (!fs.existsSync(templatePath)) return;

    const raw = fs.readFileSync(templatePath, "utf8");
    const parsed = raw
      .replace(/__COMPONENT__/g, componentName)
      .replace(/__STYLE_VAR__/g, styleVarName);

    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, parsed, "utf8");
      console.log(`✅ Created: ${targetPath}`);
    }
  });
}
