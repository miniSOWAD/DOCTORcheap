import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Disease, DiseaseDocument } from '@/database/schemas/disease.schema';

@Injectable()
export class DiseasesService {
  constructor(@InjectModel(Disease.name) private readonly diseaseModel: Model<DiseaseDocument>) {}

  async create(payload: Partial<Disease>) {
    return this.diseaseModel.create(payload);
  }

  async findAll() {
    return this.diseaseModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const item = await this.diseaseModel.findById(id);
    if (!item) throw new NotFoundException('Disease not found');
    return item;
  }

  async update(id: string, payload: Partial<Disease>) {
    const updated = await this.diseaseModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) throw new NotFoundException('Disease not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.diseaseModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Disease not found');
    return { message: 'Disease deleted successfully' };
  }
}