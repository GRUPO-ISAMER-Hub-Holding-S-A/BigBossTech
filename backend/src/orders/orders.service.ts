import { Injectable } from '@nestjs/common';
import { PrismaService } from '../protection/prisma.service';

@Injectable()
export class OrdersService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(dto: any) {

        return this.prisma.order.create({
            data: {
                customerName: dto.nombre,
                customerEmail: dto.email,
                customerPhone: dto.telefono,

                codigoPostal: dto.codigoPostal,
                calle: dto.calle,
                altura: dto.altura,

                piso: dto.piso,
                departamento: dto.departamento,
                referencia: dto.referencia,

                provincia: dto.provincia,
                localidad: dto.localidad,

                products: dto.productos,

                total: dto.productos.reduce(
                    (acc, p) =>
                        acc + (p.price * p.cantidad),
                    0
                )
            }
        });
    }
}