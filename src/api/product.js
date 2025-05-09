import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const all = await prisma.product.findMany();
    return res.json(all);
  }
  if (req.method === 'POST') {
    const data = req.body;
    const created = await prisma.product.create({ data });
    return res.status(201).json(created);
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
