import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
    async findAll() {
        return prisma.user.findMany();
    }

    async create(data: any) {
        return prisma.user.create({ data });
    }
}
