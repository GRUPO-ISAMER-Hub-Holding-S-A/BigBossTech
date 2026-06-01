import { Injectable } from '@nestjs/common';
import { PrismaService } from '../protection/prisma.service';

@Injectable()
export class ProductsService {

    constructor(
        private prisma: PrismaService
    ) { }

    async getProducts() {

        return this.prisma.product.findMany();

    }

    async getProductById(id: string) {

        return this.prisma.product.findUnique({
            where: {
                id
            }
        });

    }
}