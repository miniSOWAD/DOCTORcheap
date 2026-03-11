import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Disease, DiseaseSchema } from '@/database/schemas/disease.schema';
import { Doctor, DoctorSchema } from '@/database/schemas/doctor.schema';
import { Medicine, MedicineSchema } from '@/database/schemas/medicine.schema';
import { Nutrition, NutritionSchema } from '@/database/schemas/nutrition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Disease.name, schema: DiseaseSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Medicine.name, schema: MedicineSchema },
      { name: Nutrition.name, schema: NutritionSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}