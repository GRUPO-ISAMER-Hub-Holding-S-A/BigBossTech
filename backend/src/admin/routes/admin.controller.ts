import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/module/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/module/guards/roles.guard';
import { Roles } from '../../auth/module/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {

    @Get('dashboard')
    @Roles('ADMIN')
    getDashboard() {
        return { message: 'Admin dashboard' };
    }

    @Get('users')
    @Roles('ADMIN', 'SUPPORT')
    getUsers() {
        return { users: [] };
    }
}
