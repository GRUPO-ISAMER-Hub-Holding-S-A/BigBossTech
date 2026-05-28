import { Module } from '@nestjs/common';
import { AdminController } from '../routes/admin.controller';

@Module({
    controllers: [AdminController],
})
export class AdminModule { }