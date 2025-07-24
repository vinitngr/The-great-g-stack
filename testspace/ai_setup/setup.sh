#!/bin/bash
# setup.sh - SaaS project bootstrapper with TypeScript, Node.js+Express, Next.js+Shadcn, TurboRepo, Vite test, Postgres, Redis, Drizzle ORM, Docker, Vercel

set -e

# Project root structure:
# /apps
#    /next-app (Next.js + shadcn)
#    /node-api (Express + Drizzle ORM)
# /packages
#    /authbuilder (custom package)
# /docker
# /libs
#    /db (database config, schema, etc)
# /tests

echo "1. Initialize repo & turbo config"
git init
npm init -y

npm install -D turbo typescript ts-node vite vitest @testing-library/react @testing-library/jest-dom @types/node @types/jest eslint prettier eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks

# Turbo config
cat > turbo.json <<EOF
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    }
  }
}
EOF

echo "2. Setup apps and packages folders"
mkdir -p apps/next-app apps/node-api packages/authbuilder libs/db docker tests

echo "3. Setup Next.js + shadcn in apps/next-app"
cd apps/next-app
npx create-next-app@latest . --typescript --eslint --src-dir --import-alias "@/*" --use-npm

# Add shadcn/ui setup
npm install @shadcn/ui tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwind.config.js (minimal)
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/authbuilder/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# basic tailwind import in styles/globals.css
echo '@tailwind base;\n@tailwind components;\n@tailwind utilities;' > src/styles/globals.css

cd ../..

echo "4. Setup Express + Node.js + Drizzle ORM in apps/node-api"
cd apps/node-api
npm init -y
npm install express cors dotenv pg drizzle-orm @drizzle-orm/postgres @types/express @types/node typescript ts-node nodemon

# Create tsconfig.json minimal
cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
EOF

mkdir -p src src/database src/routes

# src/index.ts (minimal express server)
cat > src/index.ts <<EOF
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { router } from './routes';

const app = express();
app.use(cors());
app.use(json());

app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
EOF

# src/routes/index.ts
mkdir -p src/routes
cat > src/routes/index.ts <<EOF
import { Router } from 'express';
export const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
EOF

# Setup Drizzle ORM
mkdir -p src/database

# src/database/schema.ts (example schema)
cat > src/database/schema.ts <<EOF
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
EOF

# src/database/db.ts (database connection)
cat > src/database/db.ts <<EOF
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
EOF

cd ../..

echo "5. Setup custom package authbuilder in packages/authbuilder"
cd packages/authbuilder
npm init -y
npm install

# minimal index.ts
mkdir -p src
cat > src/index.ts <<EOF
export function authBuilder() {
  // Custom auth logic placeholder
  return 'AuthBuilder initialized';
}
EOF

# package.json mod for typescript
cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
EOF

cd ../../

echo "6. Setup Redis client lib in libs/db"

mkdir -p libs/db

cat > libs/db/redis.ts <<EOF
import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis() {
  if (!redisClient.isOpen) await redisClient.connect();
}
EOF

echo "7. Setup Docker and docker-compose files"

mkdir -p docker

cat > docker/Dockerfile.api <<EOF
FROM node:20-alpine
WORKDIR /app
COPY ./apps/node-api/package*.json ./
RUN npm install
COPY ./apps/node-api ./src
RUN npm run build
CMD ["node", "dist/index.js"]
EOF

cat > docker/Dockerfile.next <<EOF
FROM node:20-alpine
WORKDIR /app
COPY ./apps/next-app/package*.json ./
RUN npm install
COPY ./apps/next-app ./
RUN npm run build
CMD ["npm", "start"]
EOF

cat > docker/docker-compose.yml <<EOF
version: '3.9'

services:
  api:
    build:
      context: ..
      dockerfile: docker/Dockerfile.api
    ports:
      - '4000:4000'
    env_file:
      - .env
    depends_on:
      - postgres
      - redis

  nextjs:
    build:
      context: ..
      dockerfile: docker/Dockerfile.next
    ports:
      - '3000:3000'
    env_file:
      - .env

  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: saasdb
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

volumes:
  pgdata:
EOF

echo "8. Setup Vite + Vitest test config at root"
cat > vite.config.ts <<EOF
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
EOF

mkdir -p tests
echo "import '@testing-library/jest-dom';" > tests/setup.ts

echo "9. Setup .env.example file"
cat > .env.example <<EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/saasdb
REDIS_URL=redis://localhost:6379
PORT=4000
EOF

echo "10. Setup basic .gitignore"
cat > .gitignore <<EOF
node_modules
dist
.env
.vscode
.DS_Store
EOF

echo "Setup complete.

Next steps:
- Fill .env with real secrets
- Run 'docker-compose up' to start full stack
- Use 'turbo run build' to build all
- Run tests with 'vitest'
"

exit 0
