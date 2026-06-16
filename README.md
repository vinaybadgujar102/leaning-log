# learning-log

Personal learning log — notes and practice code organized by date and topic.

## Folder structure

```
{month-name}-{year}/
  {day}/
    {topic}/
      notes.md
      index.ts
```

**Examples:** `june-2026/16/graphs/dag/`, `june-2026/17/react/hooks/`

## Setup

```bash
bun install
```

## Scaffold a new topic

```bash
bun run new
```

Prompts for month, day, and topic path, then creates `notes.md` and `index.ts`.

## Run practice code

```bash
bun june-2026/16/graphs/dag/index.ts
```
