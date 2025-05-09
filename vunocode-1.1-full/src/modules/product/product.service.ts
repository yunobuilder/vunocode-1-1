import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductService {
    async findAll() {
        return prisma.product.findMany();
    }

    async create(data: any) {
        return prisma.product.create({ data });
    }
}
