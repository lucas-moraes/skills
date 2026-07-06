# AGENTS.md

Read before editing this repo.

## What this repo is

Content repo that publishes reusable coding-agent **skills** as `SKILL.md` files. No build, test, lint, or typecheck pipeline — every file is Markdown. Don't look for `package.json`, CI, or test runners.

## Canonical layout (dual)

- `skills/<name>/SKILL.md` — real source. What the Vercel `skills` CLI discovers when this repo is the install source.
- `.agents/skills/` — symlink to `../skills`. Lets opencode auto-discover skills when *this* repo is the worktree git (opencode walks `.agents/skills/`).
- `.claude-plugin/plugin.json` — Claude Code plugin manifest. `skills` array paths must be `./skills/<name>`, not `./.agents/skills/<name>` (symlink resolves inconsistently across tools).

Edit files under `skills/` only. Never duplicate content into `.agents/skills/`. To add a skill: create `skills/<name>/SKILL.md`, then add `"./skills/<name>"` to `plugin.json`.

## `npx skills` gotcha

`npx skills add . --list` returns "No skills found" for this repo even with a valid `skills/<name>/SKILL.md`. Reproduced with skills@1.5.14; root cause not identified. To verify discoverability: clone to a fresh path and run `npx skills add /tmp/x --list`, or push to GitHub and run `npx skills add <owner>/<repo> --list`. Do not "fix" by moving skills into `.agents/skills/` as real files — that breaks opencode source-discovery (below).

## Discovery paths (do not contradict)

opencode auto-discovers `SKILL.md` at: `.opencode/skills/`, `.claude/skills/`, `.agents/skills/` (and the `~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/` globals). A repo-root `skills/` directory is NOT on opencode's discovery list — that's why the symlink exists.

`npx skills add <owner>/<repo> -a opencode` installs into `.agents/skills/` (project) or `~/.config/opencode/skills/` (global). It never installs into `.opencode/skills/`.

## SKILL.md hard rules

Frontmatter YAML:
- `name` — required. Lowercase kebab-case, regex `^[a-z0-9]+(-[a-z0-9]+)*$`, 1–64 chars, **must equal the directory name**. Renaming a skill = renaming the folder.
- `description` — required. 1–1024 chars. Single paragraph, not bulleted "Use when…".
- Optional: `metadata.internal: true` hides from listing unless `INSTALL_INTERNAL_SKILLS=1`.

Do NOT add `license`, `compatibility`, or other fields — minimal frontmatter is the house style; extra fields are ignored by `npx skills` and add nothing.

## House style

One `SKILL.md` per skill. Section order matches `skills/commit-conventional/SKILL.md`:
`Workflow (numbered) → Types (table) → Rules (bullets) → Multi-Purpose Changes → Edge Cases → Examples → Out of Scope`.

Keep it a reference card, not a tutorial. Put examples in `Examples`; never inline them in `Workflow`.

## Committing in this repo

The repo's only skill is `commit-conventional` — apply it to this repo's own commits. `fix:` / `feat:` / `docs:` / `chore:` only. Subject ≤72 chars, imperative, lowercase, no trailing period, no agent attribution footers.

## Known drift

If `README.md` and the filesystem disagree, trust the filesystem under `skills/` + `.claude-plugin/plugin.json` and reconcile the README. The README has previously pointed at `.agents/skills/commit-conventional/SKILL.md` as a real path — that is a symlink target, not a real file.