import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Patch,
    UseGuards,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/module/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/module/guards/roles.guard';
import { Roles } from '../../auth/module/decorators/roles.decorator';

import { ProductsService } from '../../products/products.service';
import { CreateProductDto } from '../../products/dto/create-product.dto';

import { AdminService } from '../routes/@roles(admin)/admin.service';

import { PrismaService } from '../../protection/prisma.service';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin')
@UseGuards(
    JwtAuthGuard,
    RolesGuard
)
export class AdminController {

    constructor(
        private readonly productsService: ProductsService,
        private readonly adminService: AdminService,
        private readonly prisma: PrismaService
    ) { }

    @Get('dashboard')
    @Roles('ADMIN')
    getDashboard() {

        return {
            message: 'Panel Admin'
        };
    }

    @Get('products')
    @Roles('ADMIN')
    getProducts() {

        return this.productsService.getProducts();
    }

    @Get('orders')
    @Roles('ADMIN')
    getOrders() {

        return this.prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }



    @Get('stats')
    @Roles('ADMIN')
    async getStats() {

        const orders =
            await this.prisma.order.findMany();

        const totalVentas =
            orders.reduce(
                (acc, order) =>
                    acc + order.total,
                0
            );

        const pendientes =
            orders.filter(
                o => o.status === 'PENDING'
            ).length;

        const enviadas =
            orders.filter(
                o => o.status === 'SHIPPED'
            ).length;

        return {

            totalVentas,

            totalOrdenes:
                orders.length,

            pendientes,

            enviadas
        };
    }




    @Put('orders/:id/status')
    @Roles('ADMIN')
    updateOrderStatus(

        @Param('id')
        id: string,

        @Body()
        body: { status: string }

    ) {

        return this.prisma.order.update({

            where: {
                id
            },

            data: {
                status: body.status
            }
        });
    }

    @Post('upload')
    @Roles('ADMIN')
    @UseInterceptors(
        FileInterceptor(
            'image',
            {
                storage: diskStorage({

                    destination: './uploads',

                    filename: (
                        req,
                        file,
                        callback
                    ) => {

                        const uniqueName =
                            Date.now() +
                            extname(
                                file.originalname
                            );

                        callback(
                            null,
                            uniqueName
                        );
                    }
                }),

                fileFilter: (
                    req,
                    file,
                    callback
                ) => {

                    if (
                        !file.mimetype.match(
                            /\/(jpg|jpeg|png|webp)$/
                        )
                    ) {

                        return callback(
                            new Error(
                                'Solo imágenes JPG, PNG o WEBP'
                            ),
                            false
                        );
                    }

                    callback(
                        null,
                        true
                    );
                },

                limits: {
                    fileSize:
                        5 * 1024 * 1024
                }
            }
        )
    )
    uploadImage(
        @UploadedFile()
        file: Express.Multer.File
    ) {

        return {
            image:
                `/uploads/${file.filename}`
        };
    }

    @Post('products')
    @Roles('ADMIN')
    createProduct(
        @Body()
        data: CreateProductDto
    ) {

        return this.productsService.createProduct(
            data
        );
    }

    @Put('products/:id')
    @Roles('ADMIN')
    updateProduct(
        @Param('id')
        id: string,

        @Body()
        data: CreateProductDto
    ) {

        return this.productsService.updateProduct(
            id,
            data
        );
    }

    @Delete('products/:id')
    @Roles('ADMIN')
    deleteProduct(
        @Param('id')
        id: string
    ) {

        return this.productsService.deleteProduct(
            id
        );
    }


    @Patch('orders/:id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() body: { status: string }
    ) {
        return this.prisma.order.update({
            where: { id },
            data: {
                status: body.status
            }
        });
    }



}