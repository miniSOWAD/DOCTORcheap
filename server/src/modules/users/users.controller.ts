import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.PHARMACIST)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.PHARMACIST)
  create(@Body() body: any, @Req() req: any) {
    if (req.user?.role === Role.PHARMACIST && body.role !== Role.SELLER) {
      throw new ForbiddenException('Pharmacist can only create seller accounts');
    }

    if (req.user?.role === Role.PHARMACIST) {
      body.approvalStatus = 'pending';
    }

    return this.usersService.create(body);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.PHARMACIST)
  update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    if (req.user?.role === Role.PHARMACIST && body.role && body.role !== Role.SELLER) {
      throw new ForbiddenException('Pharmacist can only edit seller accounts');
    }

    return this.usersService.update(id, body);
  }

  @Patch(':id/role')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.usersService.updateRole(id, body.role);
  }

  @Patch(':id/approval-status')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  updateApprovalStatus(
    @Param('id') id: string,
    @Body() body: { approvalStatus: string },
  ) {
    return this.usersService.updateApprovalStatus(id, body.approvalStatus);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Req() req: any, @Body() body: any) {
    const allowedFields = [
      'name',
      'email',
      'phone',
      'profileImage',
      'shopName',
      'companyOrBrand',
      'shopLocation',
      'shopContactInfo',
    ];

    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowedFields.includes(key)),
    );

    return this.usersService.update(req.user.userId, filteredBody);
  }
}
