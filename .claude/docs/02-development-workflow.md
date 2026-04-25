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
