import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from '../routes/@roles(admin)/admin.service';
import { ProductsModule } from '../../products/products.module';
import { PrismaModule } from '../../protection/prisma.module';

@Module({
    imports: [ProductsModule, PrismaModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }