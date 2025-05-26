
🧪 Usage Examples

🔧 Local Dev:
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

🚀 Production Mode:
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

MAKEFILE USAG

🧪 Example Usage

# Start hot reload environment
make dev

# Build full production stack (backend + Nginx)
make prod

# Clean up
make down

# Watch logs
make logs