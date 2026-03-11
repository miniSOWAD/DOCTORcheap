import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Disease, DiseaseDocument } from '@/database/schemas/disease.schema';
import { Doctor, DoctorDocument } from '@/database/schemas/doctor.schema';
import { Medicine, MedicineDocument } from '@/database/schemas/medicine.schema';
import { Nutrition, NutritionDocument } from '@/database/schemas/nutrition.schema';
import { buildRegex } from '@/common/utils/build-regex';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Disease.name) private readonly diseaseModel: Model<DiseaseDocument>,
    @InjectModel(Doctor.name) private readonly doctorModel: Model<DoctorDocument>,
    @InjectModel(Medicine.name) private readonly medicineModel: Model<MedicineDocument>,
    @InjectModel(Nutrition.name) private readonly nutritionModel: Model<NutritionDocument>,
  ) {}

  async globalSearch(keyword: string) {
    const regex = buildRegex(keyword);

    const [diseases, doctors, medicines, nutrition] = await Promise.all([
      this.diseaseModel.find({ name: regex }),
      this.doctorModel.find({ $or: [{ name: regex }, { specialization: regex }] }),
      this.medicineModel.find({ $or: [{ name: regex }, { genericName: regex }, { brand: regex }] }),
      this.nutritionModel.find({ title: regex }),
    ]);

    return { diseases, doctors, medicines, nutrition };
  }
}