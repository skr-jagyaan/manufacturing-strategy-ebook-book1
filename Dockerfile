# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:18-alpine

WORKDIR /app

# Copy installed modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY server.js        ./
COPY public/          ./public/
COPY chapters/        ./chapters/
COPY onboarding/      ./onboarding/

# Copy assets if they exist (workbook PDF etc.)
COPY assets* ./assets/

# Cloud Run requires PORT 8080
ENV PORT=8080
EXPOSE 8080

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "server.js"]
