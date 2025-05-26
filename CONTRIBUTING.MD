## Contributing Guide

Welcome and thank you for considering contributing to Squaggle! This section walks you through how to get the project up and running in all environments (local host, Docker dev, Docker prod), and how to modify or extend the build pipelines.

---

### Prerequisites

* **Git** (to clone & branch)
* **Node.js 20.x** and **npm** (for frontend)
* **Java 21** (via the Gradle toolchain; no separate JDK install needed for backend)
* **Docker 20.x+** and **Docker Compose v2**
* **Make** (optional, but recommended for shortcut commands)

---

## 1. Running on Your Host (Local Profile)

Use this workflow if you want to edit backend Java and frontend TS/React directly, with only Postgres in Docker.

1. **Start Postgres**

   ```bash
   cd <project-root>
   docker compose -f docker-compose.local.yml up -d
   ```

2. **Run the backend**

   ```bash
   cd backend
   chmod +x gradlew       # only first time
   ./gradlew bootRun \
     --args='--spring.profiles.active=local'
   ```

    * Reads `application-local.yaml`
    * CORS for `http://localhost:5173` is enabled

3. **Run the frontend**

   ```bash
   cd frontend
   npm install
   npm run dev -- --mode local
   ```

    * Reads `.env.local` to set `VITE_API_URL=http://localhost:8080`
    * Live‑reload and HMR on `http://localhost:5173`

4. **Visit**

    * SPA:  `http://localhost:5173`
    * API:  `http://localhost:8080/smoke`

---

## 2. Dockerized Development (Dev Profile)

Spin up **everything** — DB, backend, and frontend — in containers with hot‑reload.

```bash
make dev
```

> Under the hood this runs:
>
> ```bash
> docker compose \
>   -f docker-compose.yml \
>   -f docker-compose.dev.yml \
>   up --build
> ```

* **Postgres** on `localhost:5432`
* **Backend** (profile “dev”) on `localhost:8080` via `./gradlew bootRun` in container
* **Frontend** (profile “dev”) on `localhost:5173` via `vite dev` in container

**Hot‑reload** for both backend (Spring DevTools) and frontend (Vite HMR) is enabled.

---

## 3. Production‐Style Build (Prod Profile)

Build optimized container images for deployment (fat‑JAR backend + Nginx‑served frontend).

```bash
make prod
```

> Under the hood this runs:
>
> ```bash
> docker compose \
>   -f docker-compose.yml \
>   -f docker-compose.prod.yml \
>   up --build -d
> ```

* **Backend** built via `backend/Dockerfile` → `app.jar`
* **Frontend** built via `frontend/Dockerfile` → `dist/` served by Nginx
* **API** exposed at `/api/*` proxy in Nginx

Visit:

* SPA:  `http://localhost/`
* API:  `http://localhost/api/smoke`

---

## 4. Modifying the Builds

### a. Environment files

* **Frontend**:

    * `.env.local`  → local host
    * `.env.dev`    → Docker dev
    * `.env.prod`   → Docker prod

* **Backend**:

    * `application-local.yaml`
    * `application-dev.yaml`
    * `application-prod.yaml`

### b. Docker Compose

* **Base** (`docker-compose.yml`) only defines Postgres
* **Dev** (`docker-compose.dev.yml`) overrides backend & frontend for hot‑reload
* **Prod** (`docker-compose.prod.yml`) defines production build steps

### c. Dockerfiles

* **Backend** (`backend/Dockerfile`) is multi‑stage: Gradle build → fat‑JAR image
* **Frontend** (`frontend/Dockerfile`) is multi‑stage: Vite build → Nginx image

To add a new service:

1. Create its folder (with code + Dockerfile).
2. Add it to the appropriate Compose override (dev or prod).
3. Expose ports or dependencies as needed.

---

## 5. Workflow Tips

* **Rebuild clean**:

  ```bash
  make down
  make dev   # or make prod
  ```

* **Tail logs**:

  ```bash
  make logs
  ```

* **Rebuild without cache**:

  ```bash
  make rebuild
  ```

* **Git branching**: branch off `main`, open PRs against `main`, and ensure builds pass in all three modes.

---

Thank you for contributing! If you hit any issues, please open an issue or a draft PR, describe which environment you’re running (local/dev/prod) and attach your logs.
