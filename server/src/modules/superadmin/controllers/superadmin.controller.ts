import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
import { SuperAdminService } from '../services/superadmin.service';

@Controller('superadmin')
export class SuperAdminController {
  constructor(private readonly service: SuperAdminService) {}

  @Get('stats')
  getStats() {
    return this.service.getSystemStats();
  }

  @Get('pending-users')
  getPendingUsers() {
    return this.service.getPendingUsers();
  }

  @Patch('approve/:id')
  approveUser(@Param('id') id: string) {
    return this.service.approveUser(id);
  }

  @Patch('reject/:id')
  rejectUser(@Param('id') id: string) {
    return this.service.rejectUser(id);
  }

  @Get('users')
  getAllUsers() {
    return this.service.getAllUsers();
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}