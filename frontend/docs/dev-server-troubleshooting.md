# Next.js Dev Server Troubleshooting Guide

## Problem: 500 Errors with Missing Chunks

### Error Messages
```
Cannot find module '../chunks/ssr/[turbopack]_runtime.js'
ENOENT: no such file or directory, open '...build-manifest.json'
```

### Root Cause
**Multiple Next.js processes running simultaneously** causes Turbopack cache corruption due to race conditions when multiple processes try to write/read the same cache files.

---

## Diagnosis Steps

### 1. Check for Multiple Next.js Processes

```bash
# macOS/Linux - list all next processes
pgrep -f "next" -a

# or use ps
ps aux | grep next
```

**Expected:** Only 1-2 Next.js processes
**Problem:** 10+ processes indicates multiple instances running

### 2. Check Port 3000 Usage

```bash
lsof -i :3000
```

This shows what's using port 3000.

### 3. Check Recent Errors in Dev Log

```bash
tail -50 /tmp/next-dev.log
```

Look for:
- `ENOENT` errors
- `MODULE_NOT_FOUND` errors
- `turbopack` cache compaction failures

---

## Solution: Clean Restart

### Step 1: Kill ALL Next.js Processes

```bash
# Force kill all next processes
pkill -9 -f "next"
pkill -9 -f "node.*next"

# Verify no processes remain
pgrep -f "next" || echo "No next processes"
```

### Step 2: Clean Turbopack Cache

```bash
cd /Users/lk.nguyen/Documents/SME_digital-platform/frontend
rm -rf .next
```

### Step 3: Restart Dev Server

```bash
npm run dev > /tmp/next-dev.log 2>&1 &
```

### Step 4: Verify It's Working

```bash
# Wait for server to start
sleep 10

# Test endpoints
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/shop
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/cart
```

Both should return `200`.

---

## Prevention

### 1. Use a Single Dev Server

Never start multiple `npm run dev` instances. If you need to restart:
```bash
pkill -f "next" && npm run dev
```

### 2. Add Dev Script to package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:clean": "pkill -f next 2>/dev/null; sleep 1; rm -rf .next && next dev"
  }
}
```

Usage: `npm run dev:clean` for a guaranteed clean start.

### 3. Check Before Starting

```bash
# Check if port 3000 is already in use
lsof -i :3000

# If something's running, kill it first
lsof -ti:3000 | xargs kill -9
```

### 4. Production Mode (More Stable)

For long-running servers, consider using production build:
```bash
npm run build && npm start
```

---

## Monitoring in Production

### Check Server Health

```bash
# Check if server responds
curl -I http://localhost:3000/shop

# Check for error logs
tail -100 /path/to/server.log
```

### Common Health Indicators

| Status Code | Meaning |
|-------------|---------|
| 200 | OK - server working |
| 500 | Server error - check logs |
| 502 | Bad gateway - server crashed |
| 503 | Service unavailable - overloaded |

---

## If Problem Persists

1. Check Node.js version compatibility with Next.js
2. Clear npm cache: `npm cache clean --force`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Check disk space - cache needs room to build
5. Check file permissions on `.next` directory