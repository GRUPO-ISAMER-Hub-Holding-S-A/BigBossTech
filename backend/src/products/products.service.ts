import { Injectable } from '@nestjs/common';
import { PrismaService } from '../protection/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

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
            where: { id }
        });
    }

    async createProduct(data: CreateProductDto) {

        return this.prisma.product.create({
            data
        });

    }

    async updateProduct(
        id: string,
        data: CreateProductDto
    ) {

        const product =
            await this.prisma.product.findUnique({
                where: { id }
            });

        if (!product) {
            throw new Error(
                'Producto no encontrado'
            );
        }

        return this.prisma.product.update({
            where: { id },
            data
        });

    }

    async deleteProduct(id: string) {

        return this.prisma.product.delete({
            where: { id }
        });

    }

}


