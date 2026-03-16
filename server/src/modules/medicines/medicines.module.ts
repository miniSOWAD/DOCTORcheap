import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { Medicine, MedicineSchema } from '@/database/schemas/medicine.schema';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Medicine.name, schema: MedicineSchema }]), AuthModule,],
  controllers: [MedicinesController],
  providers: [MedicinesService],
  exports: [MedicinesService],
})
export class MedicinesModule {}