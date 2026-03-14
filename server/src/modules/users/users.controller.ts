import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() body: any) {
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
}