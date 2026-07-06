---
name: skill-scaffold
description: 'Scaffold a new skill in this repo. Creates skills/<name>/SKILL.md with valid frontmatter, registers it in .claude-plugin/plugin.json, updates README.md and skills.sh.json, then stops for review. Use when the user says "add a skill", "create a skill", or "scaffold a skill".'
---

# Skill Scaffold

Scaffold a new skill in this repo following the house style. Never commits without the user's ok.

## When to use me

- The user says "add a skill", "create a skill", "scaffold a skill" or names a specific skill to create.
- The user says "new skill called X" or similar.

Do NOT use me for editing existing skills; edit `skills/<name>/SKILL.md` directly.

## Workflow

1. Collect `name`, `description`, and a one-line `README summary` from the user. `name` must match regex `^[a-z0-9]+(-[a-z0-9]+)*$`, 1-64 chars.
2. Create `skills/<name>/SKILL.md` from the template below. **Single-quote `description` if it contains `: ` (colon+space)**.
3. Append `"./skills/<name>"` to the `skills` array in `.claude-plugin/plugin.json`.
4. Add a row to the Skills table in `README.md`:
   `| [\`<name>\`](skills/<name>/SKILL.md) | <README summary> |`
5. (Optional, only if user wants grouping) add `<name>` to a `groupings[].skills` in `skills.sh.json`.
6. Validate: name equals directory name, description ≤ 1024 chars, frontmatter has no unquoted `: ` in plain scalars.
7. Show user a diff summary of all touched files and ask: "Ready to commit? (yes/no)".
8. If yes, create two commits:
   - `feat: add <name> skill` (SKILL.md + plugin.json)
   - `docs: add <name> to readme` (README + optional grouping)
9. Do NOT push unless asked.

## Template

```yaml
---
name: <name>
description: '<single-quoted if contains : >'
---
```

For the body, use section order: Workflow (numbered) → Types (table) → Rules (bullets) → Edge Cases → Examples → Out of Scope.

## Rules

- `name` must equal the directory name. Renaming a skill = renaming the folder.
- `description` 1-1024 chars, single paragraph. **MUST be YAML-quoted (single or double) if it contains `: `**.
- Frontmatter is minimal: only `name` and `description`. No `license`, `compatibility`, `metadata` unless `internal`.
- Section order: Workflow → Types (table) → Rules → Edge Cases → Examples → Out of Scope.
- Never inline examples in Workflow.
- Never commit without explicit user ok.
- Never push unless asked.

## Edge Cases

- Name collides with existing skill: refuse, ask for new name.
- Description contains both `: ` and `'`: double-quote it and escape the single quote.
- `plugin.json` missing: stop, repo is in drift; do not recreate.
- User wanted a group in skills.sh.json but only 1 skill exists: just omit the group.

## Examples

```
User: add a skill called skill-lint that validates SKILL.md frontmatter
→ name: skill-lint
→ description: 'Validates SKILL.md frontmatter.'
→ README summary: Validates SKILL.md frontmatter.

Agent: Created skills/skill-lint/SKILL.md, registered in plugin.json, added README row. Here's the diff. Ready to commit?
```

## Out of Scope

- Committing or pushing without user ok.
- Editing `.opencode/` or `.agents/` directory.
- Creating group in skills.sh.json when user only asked for a basic skill.
