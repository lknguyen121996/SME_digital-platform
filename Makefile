.PHONY: help dev backend frontend db seed migrate status

# Colors
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(CYAN)%-15s$(NC) %s\n", $$1, $$2}'

# Database
db-start: ## Start PostgreSQL and Redis containers
	docker-compose up -d
	@echo "$(GREEN)Database started$(NC) - Postgres: 5432, Redis: 6379"

db-stop: ## Stop containers
	docker-compose down

db-logs: ## View database logs
	docker-compose logs -f postgres

# Backend
backend-dev: ## Start Medusa backend in development
	cd backend && npm run dev

backend-build: ## Build Medusa backend
	cd backend && npm run build

backend-migrate: ## Run database migrations
	cd backend/apps/backend && npx medusa db:migrate

backend-seed: ## Seed database with sample data
	cd backend && npm run backend:seed

backend-user: ## Create admin user (set EMAIL and PASS)
	cd backend/apps/backend && npx medusa user --email $(EMAIL) --password $(PASS)

# Frontend
frontend-dev: ## Start Next.js frontend
	cd frontend && npm run dev

frontend-build: ## Build Next.js frontend
	cd frontend && npm run build

frontend-typecheck: ## Run TypeScript check
	cd frontend && npm run typecheck

# Development
dev: ## Start all services (backend + frontend)
	@echo "$(YELLOW)Starting backend...$(NC)"
	cd backend && npm run dev &
	@echo "$(YELLOW)Starting frontend...$(NC)"
	cd frontend && npm run dev &

# Status
status: ## Check service status
	@echo "=== Docker Containers ==="
	@docker-compose ps
	@echo ""
	@echo "=== Backend Health ==="
	@curl -s http://localhost:9000/health 2>/dev/null || echo "Backend not running"
	@echo ""
	@echo "=== Frontend ==="
	@curl -s -o /dev/null -w "HTTP %{http_code}" http://localhost:3000 2>/dev/null || echo "Frontend not running"