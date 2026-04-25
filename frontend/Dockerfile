# ===========================================
# Next.js Frontend Dockerfile
# ===========================================

# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user (gid 1001, uid 1001)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy application from builder
COPY --from=builder /app .
COPY --from=builder /app/node_modules ./node_modules

# Set ownership
USER nextjs

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production

# Health check - wget is available in alpine
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start Next.js
CMD ["npm", "run", "start"]
