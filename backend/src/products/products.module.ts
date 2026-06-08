import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../protection/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProductsController],
    providers: [ProductsService],

    exports: [ProductsService] // 👈 AGREGAR
})
export class ProductsModule { }