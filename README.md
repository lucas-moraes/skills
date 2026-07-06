# Agent Skills

Reusable coding-agent skills for opencode / Claude Code.

## Skills

| Skill                                                        | Description                                                                                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| [`commit-conventional`](skills/commit-conventional/SKILL.md) | Enforce Conventional Commits on every commit — inspect staged diff, propose type(scope): message, split mixed-purpose changes.   |
| [`frontend`](skills/frontend/SKILL.md)                       | This skill transforms UI requirements into highly reusable, accessible, and testable frontend component specifications and code. |

## Install

```bash
# Install to opencode (project-local)
npx skills add lucas-moraes/skills --skill commit-conventional -a opencode
npx skills add lucas-moraes/skills --skill front-end -a opencode

# Install globally (available in any project)
npx skills add lucas-moraes/skills --skill commit-conventional -a opencode -g
npx skills add lucas-moraes/skills --skill frontend -a opencode -g

# Install to all detected agents
npx skills add lucas-mroaes/skills --skill commit-conventional --all
npx skills add lucas-mroaes/skills --skill frontend --all
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
