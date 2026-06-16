import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../protection/prisma.service';

@Injectable()
export class AdminService {

    constructor(
        private prisma: PrismaService
    ) {}

    async getDashboard() {

        const products =
            await this.prisma.product.count();

        const orders =
            await this.prisma.order.count();

        const users =
            await this.prisma.user.count();

        return {
            products,
            orders,
            users
        };
    }

    async getOrders() {

        return this.prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async getProducts() {

        return this.prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async getStats() {

        const orders =
            await this.prisma.order.findMany();

        const revenue =
            orders.reduce(
                (acc, order) =>
                    acc + order.total,
                0
            );

        return {
            totalOrders: orders.length,
            revenue
        };
    }
}