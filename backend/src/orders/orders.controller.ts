import {
    Controller,
    Post,
    Body
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(
        private ordersService: OrdersService
    ) { }

@Post()
create(
    @Body() dto: any
) {

    return this.ordersService.create(dto);
}
}