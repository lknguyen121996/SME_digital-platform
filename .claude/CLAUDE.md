# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Quick Links

| Document | Purpose |
|----------|---------|
| [01-project-overview](./docs/01-project-overview.md) | Project description, goals, repository structure |
| [02-development-workflow](./docs/02-development-workflow.md) | GSD practices, command reference |
| [03-testing-strategy](./docs/03-testing-strategy.md) | Unit tests + Playwright integration tests |
| [04-architecture](./docs/04-architecture.md) | Tech stack, services, database |
| [05-naming-conventions](./docs/05-naming-conventions.md) | File naming patterns |
| [06-vietnamese-content](./docs/06-vietnamese-content.md) | i18n, formatting, content rules |
| [07-typescript-practices](./docs/07-typescript-practices.md) | TypeScript constraints and practices |
| [08-api-clients](./docs/08-api-clients.md) | API client patterns |

---

## Critical Rules

1. **TypeScript is primary language** - All code must be TypeScript with strict typing
2. **Run `npm run typecheck`** after modifying TypeScript files
3. **Run Playwright tests** after creating/modifying pages
4. **Use GSD workflow commands** for project management
5. **Commit messages in English**, Vietnamese for user communication

---

## Getting Started

```bash
# Start session
/gsd-progress

# Or advance to next step
/gsd-next
```
