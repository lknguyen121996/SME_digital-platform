# Project Overview

## Project Description

**NhoNho** là nền tảng thương mại điện tử headless chuyên bán rượu vang cao cấp tại Việt Nam.

- **Website**: https://nhonho.vn
- **Email**: xinchao@nhonho.vn
- **Điện thoại**: 037 917 1768
- **Giấy phép**: Giấy phép bán lẻ rượu số 313/GPR-PKT

## Repository Structure

```
nhonho/
├── frontend/              # Next.js 16 frontend (App Router)
├── backend/               # Medusa v2 E-commerce API
│   └── apps/backend/      # Medusa application
├── docker-compose.yml     # PostgreSQL 15 database
├── nginx/                 # Reverse proxy config
├── scripts/               # Database init scripts
├── .env.example           # Environment template
├── ARCHITECTURE.md        # Full architecture documentation
├── SPEC.md                # Technical specification
└── CLAUDE.md             # This file
```

## Development Priorities

### MVP (Launch)
| Priority | Feature | Component |
|----------|---------|-----------|
| 🔴 **1** | VNPay Payment | Medusa + Custom Plugin |
| 🔴 **1** | Products, Cart, Checkout | Medusa |
| 🔴 **1** | Client Store Frontend | Next.js |
| 🟡 **2** | CMS (Blog, Pages, Events) | Strapi |
| 🟡 **2** | User Authentication | NextAuth.js |

### V2 (Post-Launch)
| Priority | Feature | Component |
|----------|---------|-----------|
| 🟢 **3** | Loyalty System | Medusa extensions |
| 🟢 **3** | Membership Tiers | Medusa extensions |
| 🟢 **3** | Birthday Rewards | Medusa extensions |

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), TypeScript |
| CMS | Strapi v5 + Visual Builder |
| E-commerce | Medusa v2 |
| Database | PostgreSQL 15 |
| Search | Meilisearch |
| Payments | VNPay |
| Testing | Vitest (unit), Playwright (integration) |
