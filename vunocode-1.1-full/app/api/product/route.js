// app/api/user/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: { id: true, name: true, email: true, createdAt: true },
  })
  return NextResponse.json(users)
}