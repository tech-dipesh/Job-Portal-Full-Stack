FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production 

COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./server.js

EXPOSE 3000
USER node
CMD ["node", "server.js"]
