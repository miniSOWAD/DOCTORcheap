import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicine, MedicineDocument } from '@/database/schemas/medicine.schema';

@Injectable()
export class MedicinesService {
  constructor(@InjectModel(Medicine.name) private readonly medicineModel: Model<MedicineDocument>) {}

  async create(payload: Partial<Medicine>) {
    return this.medicineModel.create(payload);
  }

  async findAll() {
    return this.medicineModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const item = await this.medicineModel.findById(id);
    if (!item) throw new NotFoundException('Medicine not found');
    return item;
  }

  async update(id: string, payload: Partial<Medicine>) {
    const updated = await this.medicineModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) throw new NotFoundException('Medicine not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.medicineModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Medicine not found');
    return { message: 'Medicine deleted successfully' };
  }
}