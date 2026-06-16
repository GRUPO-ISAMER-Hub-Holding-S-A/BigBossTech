import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from '../payments/payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(
        private readonly paymentsService: PaymentsService
    ) { }

    @Post('create-preference')
    createPreference(
        @Body() body: { orderId: string }
    ) {

        return this.paymentsService.createPreference(
            body.orderId
        );
    }
}