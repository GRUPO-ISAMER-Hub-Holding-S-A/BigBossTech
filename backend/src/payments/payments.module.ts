import { Module } from '@nestjs/common';
import { PaymentsController } from '../payments/payments.controller';
import { PaymentsService } from '../payments/payments.service';
import { PrismaModule } from '../protection/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule { }