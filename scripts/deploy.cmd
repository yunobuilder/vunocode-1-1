#!/bin/bash
echo 'Starting deploy...'
npm run build && vercel --prod
npx prisma migrate deploy