# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT                                      │
│                    Next.js (Frontend App)                                │
│                      Client Store Only                                   │
└───────────────────────┬─────────────────────────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
┌─────────▼─────────┐     ┌───────────▼───────────┐
│    Strapi v5     │     │      Medusa v2        │
│  + Visual Builder│     │   + Admin Dashboard   │
│   (Headless CMS) │     │   (E-commerce API)    │
└─────────┬─────────┘     └───────────┬───────────┘
          │                           │
          │         ┌─────────────────┤
          │         │                 │
┌─────────▼─────────▼──┐  ┌────────────▼────────┐
│      Meilisearch     │  │   PostgreSQL 15     │
│  • Product Search   │  │   ┌───────────┐     │
└─────────────────────┘  │   │  Strapi  │     │
                          │   │  Medusa  │     │
                          │   └───────────┘     │
                          └────────────────────┘
```

## Services

### Frontend (Next.js)
- **Port**: 3000
- **Purpose**: Client store (public-facing)
- **Admin**: NOT included - use Medusa/Strapi admin panels directly

### Medusa (E-commerce API)
- **Port**: 9000
- **Purpose**: Products, Cart, Orders, Customers, Promotions
- **Admin**: Built-in admin panel at /app/admin

### Strapi (Headless CMS)
- **Port**: 1337
- **Purpose**: Blog Posts, Pages, Events, Media
- **Admin**: Built-in admin panel with Visual Builder

### Meilisearch
- **Port**: 7700
- **Purpose**: Product search, typo-tolerant, Vietnamese support

## Database Schema

### Medusa Database

```typescript
// Products
interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  region: string;
  grape_variety: string;
  size: string;
  price: number;
  compare_at_price?: number;
  inventory: number;
  categories: Category[];
}

// Orders
interface Order {
  id: string;
  customer_id: string;
  email: string;
  items: OrderItem[];
  shipping_address: Address;
  billing_address: Address;
  payment_status: 'pending' | 'paid' | 'cancelled';
  fulfillment_status: 'pending' | 'fulfilled' | 'shipped';
  vnpay_transaction_id?: string;
  created_at: Date;
}

// Loyalty
interface LoyaltyAccount {
  id: string;
  customer_id: string;
  points_balance: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  lifetime_points: number;
  birthday_month?: number;
}
```

### Strapi Content Types

```typescript
// Blog Post
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  author: string;
  featured_image: string;
  published_at: Date;
}

// Event
interface Event {
  id: string;
  title: string;
  slug: string;
  content: string;
  event_date: Date;
  event_time: string;
  event_location: string;
  ticket_price: number;
  featured_image: string;
  status: 'draft' | 'published';
}
```

## API Contracts

### Medusa Store API

```
GET    /store/products
GET    /store/products/:id
POST   /store/carts
POST   /store/carts/:id/line-items
DELETE /store/carts/:id/line-items/:line_id
POST   /store/orders
GET    /store/orders/:id
POST   /store/customers
GET    /store/customers/me
POST   /store/vnpay/initialize
POST   /store/vnpay/return
```

### Strapi API

```
GET    /api/blog-posts
GET    /api/blog-posts/:slug
GET    /api/events
GET    /api/events/:slug
GET    /api/pages/:slug
GET    /api/site-settings
```

### Loyalty API

```
GET    /store/loyalty/points
GET    /store/loyalty/tier
GET    /store/loyalty/history
GET    /store/loyalty/rewards
POST   /store/loyalty/redeem
```

## Frontend Routes

| Route | Purpose | Data Source |
|-------|---------|-------------|
| `/` | Homepage | Strapi + Medusa |
| `/shop/` | Product catalog | Medusa |
| `/product/[slug]` | Product detail | Medusa |
| `/su-kien` | Events | Strapi |
| `/bai-viet` | Blog | Strapi |
| `/account/*` | User account | Medusa |
| `/admin/` | Medusa admin | Medusa |
| `/strapi/` | Strapi admin | Strapi |
