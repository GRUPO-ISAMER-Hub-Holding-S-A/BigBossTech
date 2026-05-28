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
}