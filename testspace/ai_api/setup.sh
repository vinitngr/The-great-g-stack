#!/bin/bash

set -e

echo "Creating monorepo structure for SAAS-level project..."

# Initialize TurboRepo monorepo
npx create-turbo@latest vinitnagarStackProject --no-install
cd vinitnagarStackProject

# Create apps/web using Next.js (ESM-compatible)
cd apps
npx create-next-app@latest web --typescript --eslint --app --no-tailwind --src-dir --import-alias "@/*"
cd ..

# Add packages and common folders
mkdir -p packages/db packages/utils

# Install dependencies in root
cd ..
cd vinitnagarStackProject
npm init -y
npm install -D turbo
npm install ioredis

# Setup Prisma in db package
cd packages/db
npm init -y
npm install prisma @prisma/client

npx prisma init --datasource-provider postgresql

# Replace schema.prisma with SaaS Project model (Neon DB)
cat <<EOF > prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Project {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  likes     Int      @default(0)
}
EOF

# Create db.ts for Prisma Client export
cat <<EOF > src/db.ts
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
EOF

# Move back to root and finalize
cd ../../

# Create vercel.json in root
cat <<EOF > vercel.json
{
  "version": 2,
  "builds": [],
  "routes": []
}
EOF

# Reminder for user
echo "✅ Monorepo structure created with Next.js, Prisma (Neon), Redis (ioredis), and Vercel config."
echo "⚠️ Please manually add your Neon DATABASE_URL in .env file inside packages/db"
