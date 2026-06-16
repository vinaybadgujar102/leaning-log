import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function defaultMonth(): string {
  const now = new Date();
  const month = MONTH_NAMES[now.getMonth()];
  return `${month}-${now.getFullYear()}`;
}

function defaultDay(): string {
  return String(new Date().getDate());
}

function topicTitle(topic: string): string {
  const leaf = topic.split("/").pop() ?? topic;
  return leaf
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function notesTemplate(title: string): string {
  return `# ${title}

## What I learned

## Key concepts

## Questions

## References
`;
}

function codeTemplate(topic: string): string {
  return `// Practice code for: ${topic}
console.log("Ready to practice");
`;
}

function ask(label: string, defaultValue: string, required = false): string {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const input = prompt(`${label}${suffix}:`)?.trim() ?? "";

  if (!input) {
    if (required && !defaultValue) {
      console.error(`${label} is required.`);
      process.exit(1);
    }
    return defaultValue;
  }

  return input;
}

const month = ask("Month", defaultMonth());
const day = ask("Day", defaultDay());
const topic = ask("Topic path (e.g. graphs/dag)", "", true);

const topicPath = join(month, day, topic);

if (existsSync(topicPath)) {
  console.error(`Folder already exists: ${topicPath}`);
  process.exit(1);
}

mkdirSync(topicPath, { recursive: true });

const title = topicTitle(topic);
writeFileSync(join(topicPath, "notes.md"), notesTemplate(title));
writeFileSync(join(topicPath, "index.ts"), codeTemplate(topic));

console.log(`\nCreated: ${topicPath}/`);
console.log(`  notes.md`);
console.log(`  index.ts`);
console.log(`\nRun: bun ${join(topicPath, "index.ts")}`);
