---
name: commit-conventional
description: 'Enforce Conventional Commits on every commit. Inspects staged diff, proposes a type(scope): message, splits mixed-purpose changes, and validates the final message before committing. Use when the user says "commit" or asks for a commit message.'
---

# Commit Conventional

Enforce [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Every commit is single-purpose, machine-readable, and ready for changelog/release tooling.

## Workflow

1. Inspect staged changes: `git diff --cached` and `git diff --cached --stat`.
2. Reject mixed-purpose changes — surface logical groups, ask the user to confirm a split, and commit one group at a time.
3. Propose one message:
   ```
   <type>(<scope>): <imperative subject, lowercase, no period>

   <body, 72-char wrap, explains WHY not WHAT>

   <footer: BREAKING CHANGE: ... or Closes: #42>
   ```
4. Run the commit with the chosen message. Do not push unless asked.

## Types

| Type | Use for |
|------|---------|
| `feat` | New user-facing feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting — no logic change |
| `refactor` | Code change that neither fixes nor adds |
| `perf` | Measurably faster |
| `test` | Adding or fixing tests |
| `build` | Dependencies, build system, Dockerfile |
| `ci` | CI pipeline / config |
| `chore` | Tooling, scripts, maintenance |
| `revert` | Reverting a previous commit |

## Rules

- Subject: lowercase, imperative ("add" not "added"), no trailing period, ≤ 72 chars.
- Body: 72-char wrap, blank line after subject, explains **why** not **what**.
- `BREAKING CHANGE` footer (or `!` after type/scope) only when public contract changes.
- Scope is optional, single lowercase word per module.
- One type per commit.
- Strip agent/Claude attribution footers from the subject.
- No commit until the message is validated.

## Multi-Purpose Changes

When `git diff --cached` has separable concerns:

```
Detected 3 logical groups:
  A. auth/login.ts + auth/session.ts  → fix(auth): reject expired tokens
  B. package-lock.json                → build: bump jsonwebtoken
  C. README.md                        → docs: add token FAQ
```

Present the groups, ask for confirmation, then stage A and commit. Loop for the remaining groups.

## Edge Cases

- Empty stage + unstaged changes → ask which files to stage.
- Binaries only → ask user for a short description, wrap as `chore: <desc>`.
- `--amend` → re-validate the new message.
- `squash!` commits → skip validation for intermediates, validate the final.

## Examples

**Good:**
```
feat(auth): verify email before issuing session token

Prevents account takeover via unverified email claims. Tokens
issued for unverified identities are scoped to /verify only.

Closes: #318
```

**Bad (and what to do):**
- `Updated stuff` → refuse, no type, vague.
- `Fix: bug in login` → `Fix:` capitalized. Propose `fix(auth): handle expired tokens on login`.
- `feat(api): Added new endpoint` → past tense. Propose `feat(api): add user profile endpoint`.
- `feat: bump deps and fix typo` → two purposes. Ask to split.
- `feat(login): add OAuth 🤖 Generated with Claude Code` → drop attribution.

## Out of Scope

- Generating CHANGELOG.
- Signing commits (`-S`).
- Pushing — say "commit ready, push?" and wait for ok.
