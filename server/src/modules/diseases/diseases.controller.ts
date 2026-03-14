import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/enums/role.enum';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Get()
  findAll() {
    return this.diseasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseasesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.DOCTOR, Role.PHARMACIST)
  @Post()
  create(@Body() body: any) {
    return this.diseasesService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.DOCTOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.diseasesService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.DOCTOR)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.diseasesService.delete(id);
  }
}