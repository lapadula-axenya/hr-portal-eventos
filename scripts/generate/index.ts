import { generateComponent } from "./component/generate";

const [, , type, ...args] = process.argv;

switch (type) {
  case "component": {
    const [section, component] = args;
    if (!section || !component) {
      console.error(
        "❌ Usage: tsx scripts/generate/index.ts component <section> <ComponentName>"
      );
      process.exit(1);
    }

    generateComponent(section, component);
    break;
  }

  default:
    console.error(`❌ Unknown generator type: ${type}`);
    process.exit(1);
}
