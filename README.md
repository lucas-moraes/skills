# Agent Skills

Reusable coding-agent skills for opencode / Claude Code.

## Skills

| Skill | Description |
|---|---|
| [`commit-conventional`](skills/commit-conventional/SKILL.md) | Enforce Conventional Commits on every commit — inspect staged diff, propose type(scope): message, split mixed-purpose changes. |
| [`skill-scaffold`](skills/skill-scaffold/SKILL.md) | Scaffold a new skill — creates SKILL.md with valid frontmatter, registers in plugin.json, updates README. Stops for review before committing. |

## Install

```bash
# Install to opencode (project-local)
npx skills add your-username/skills --skill commit-conventional -a opencode
npx skills add your-username/skills --skill skill-scaffold -a opencode

# Install globally (available in any project)
npx skills add your-username/skills --skill commit-conventional -a opencode -g
npx skills add your-username/skills --skill skill-scaffold -a opencode -g

# Install to all detected agents
npx skills add your-username/skills --skill commit-conventional --all
npx skills add your-username/skills --skill skill-scaffold --all
```

Or copy `skills/commit-conventional/` into your project's `.agents/skills/` or `~/.config/opencode/skills/`.

### Claude plugin

This repo ships a [Claude plugin](https://docs.anthropic.com/en/docs/claude-code/plugins) manifest at `.claude-plugin/plugin.json`. Install the plugin from this repository in Claude Code, or copy individual skill directories as above.

## Repository Structure

```
.
├── README.md
├── AGENTS.md
├── .claude-plugin/
│   └── plugin.json
├── .agents/
│   └── skills -> ../skills   # symlink for opencode auto-discovery
└── skills/
    └── commit-conventional/
        └── SKILL.md
```

## GitHub Topics

```bash
gh repo edit your-username/skills --add-topic agent-skill,claude-code-skill,opencode-skill
```
