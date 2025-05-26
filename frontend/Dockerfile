# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies (for prod use build cache; dev skips this)
COPY package*.json ./
RUN npm install

# Copy app source (not used in dev mode with volume mounts)
COPY . .

# Default: run vite dev server (can be overridden by docker-compose)
CMD ["npm", "run", "dev"]
