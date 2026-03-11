import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nutrition, NutritionDocument } from '@/database/schemas/nutrition.schema';

@Injectable()
export class NutritionService {
  constructor(@InjectModel(Nutrition.name) private readonly nutritionModel: Model<NutritionDocument>) {}

  async create(payload: Partial<Nutrition>) {
    return this.nutritionModel.create(payload);
  }

  async findAll() {
    return this.nutritionModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const item = await this.nutritionModel.findById(id);
    if (!item) throw new NotFoundException('Nutrition not found');
    return item;
  }

  async update(id: string, payload: Partial<Nutrition>) {
    const updated = await this.nutritionModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) throw new NotFoundException('Nutrition not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.nutritionModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Nutrition not found');
    return { message: 'Nutrition deleted successfully' };
  }
}