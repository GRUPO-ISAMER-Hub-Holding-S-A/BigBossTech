import { Injectable } from '@nestjs/common';
import { PrismaService } from '../protection/prisma.service';

import {
    MercadoPagoConfig,
    Preference
} from 'mercadopago';

@Injectable()
export class PaymentsService {

    constructor(
        private prisma: PrismaService
    ) { }

    async createPreference(
        orderId: string
    ) {

        const order =
            await this.prisma.order.findUnique({
                where: {
                    id: orderId
                }
            });

        if (!order) {
            throw new Error(
                'Orden no encontrada'
            );
        }

        const client =
            new MercadoPagoConfig({
                accessToken:
                    process.env.MP_ACCESS_TOKEN
            });

        const preference =
            new Preference(client);

        const result =
            await preference.create({

                body: {

                    items: (order.products as any[]).map(
                        producto => ({

                            id: String(producto.id),

                            title: producto.name,

                            quantity: Number(
                                producto.cantidad
                            ),

                            unit_price: Number(
                                producto.price
                            ),

                            currency_id: "USD"

                        })
                    ),

                    external_reference:
                        order.id,

                    back_urls: {

                        success:
                            'http://localhost:5500/frontend/success.html',

                        failure:
                            'http://localhost:5500/frontend/failure.html',

                        pending:
                            'http://localhost:5500/frontend/pending.html'
                    },

                    auto_return:
                        'approved'
                }
            });

        return {
            init_point:
                result.init_point
        };
    }
}