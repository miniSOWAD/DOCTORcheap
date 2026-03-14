import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicine, MedicineDocument } from '@/database/schemas/medicine.schema';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<MedicineDocument>,
  ) {}

  async findAll() {
    return this.medicineModel.find().sort({ createdAt: -1 });
  }

  async create(payload: any) {
    return this.medicineModel.create(payload);
  }

  async bulkImport(payload: { medicines: any[] }) {
    if (!payload.medicines?.length) {
      return { message: 'No medicines provided', insertedCount: 0 };
    }

    const docs = payload.medicines.map((item) => ({
      name: item.name,
      price: item.price || 0,
      unitPrice: item.unitPrice || 0,
      ingredients: item.ingredients || '',
      usage: item.usage || item.ingredients || '',
      usedFor: Array.isArray(item.usedFor) ? item.usedFor : [],
      sideEffects: Array.isArray(item.sideEffects) ? item.sideEffects : [],
      genericName: item.genericName || '',
      brand: item.brand || '',
      dosage: item.dosage || '',
      imageUrl: item.imageUrl || '',
      pdfUrl: item.pdfUrl || '',
    }));

    const inserted = await this.medicineModel.insertMany(docs, { ordered: false });

    return {
      message: 'Medicines imported successfully',
      insertedCount: inserted.length,
    };
  }

  async update(id: string, payload: any) {
    const updated = await this.medicineModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Medicine not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.medicineModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Medicine not found');
    return { message: 'Medicine deleted successfully' };
  }
}