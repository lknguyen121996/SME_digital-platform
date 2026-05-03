# Development Workflow

## GSD (Get Shit Done) Practices

Sử dụng GSD workflow commands để quản lý tiến độ:

| Command | Purpose |
|---------|---------|
| `/gsd-next` | Tự động xác định và thực hiện bước tiếp theo |
| `/gsd-progress` | Kiểm tra tiến độ project và routing tới action tiếp |
| `/gsd-plan-phase` | Tạo phase plan chi tiết với verification loop |
| `/gsd-execute-phase` | Execute plans với atomic commits |
| `/gsd-verify-work` | Xác minh features qua conversational UAT |
| `/gsd-complete-milestone` | Archive milestone và chuẩn bị bước tiếp theo |
| `/gsd-discuss-phase` | Gather context trước khi planning |
| `/gsd-code-review` | Review code cho bugs, security, quality |
| `/gsd-ui-review` | Retroactive 6-pillar visual audit |
| `/gsd-health` | Chẩn đoán planning directory health |

## Session Start Checklist

1. Chạy `/gsd-progress` để xem tiến độ
2. Hoặc chạy `/gsd-next` để tự động advance

## Git Workflow

### Commit Message Format (English)

```
<type>(<scope>): <subject>

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `test`: Test changes
- `chore`: Maintenance tasks

**Examples:**
```
feat(cart): add VNPay payment integration
fix(checkout): resolve quantity update issue
refactor(product): simplify variant selection
```

## Code Review

Run `/gsd-code-review` before creating PR to catch:
- Bugs and logic errors
- Security vulnerabilities
- TypeScript type safety issues
- Performance problems

## Personal Preferences

- Trả lời bằng tiếng Việt khi hỏi bằng tiếng Việt
- Commit message bằng tiếng Anh
- Giải thích ngắn gọn, đi thẳng vào vấn đề
- Khi không chắc, hỏi trước khi làm

## Design-to-Code Workflow

### Figma MCP

```bash
# 1. Load Figma file
mcp__figma__add_figma_file { "url": "https://www.figma.com/file/xxx" }

# 2. View component/node thumbnail
mcp__figma__view_node { "file_key": "xxx", "node_id": "123:456" }

# 3. Read design comments
mcp__figma__read_comments { "file_key": "xxx" }

# 4. Post feedback comment
mcp__figma__post_comment { "file_key": "xxx", "node_id": "123:456", "x": 100, "y": 100, "message": "feedback" }
```

### Playwright MCP

```bash
# 1. Start browser
mcp__playwright__init-browser { "url": "http://localhost:3000" }

# 2. Take screenshot / get snapshot
mcp__playwright__get-screenshot
mcp__playwright__get-full-snapshot

# 3. Get interactive elements
mcp__playwright__get-interactive-snapshot

# 4. Run custom code
mcp__playwright__execute-code { "code": "async function run(page) { ... }" }
```

See [04-architecture](./04-architecture.md) and [03-testing-strategy](./03-testing-strategy.md) for details.
