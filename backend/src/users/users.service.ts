import { Injectable } from '@nestjs/common';
import { PrismaService } from '../protection/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService
    ) {}

    async createAdmin(
        email:string,
        password:string
    ){

        const hash =
            await bcrypt.hash(
                password,
                10
            );

        return this.prisma.user.create({

            data:{
                email,
                password:hash,
                role:"ADMIN"
            }
        });
    }
}