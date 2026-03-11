import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '@/database/schemas/doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor.name) private readonly doctorModel: Model<DoctorDocument>) {}

  async create(payload: Partial<Doctor>) {
    return this.doctorModel.create(payload);
  }

  async findAll() {
    return this.doctorModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const item = await this.doctorModel.findById(id);
    if (!item) throw new NotFoundException('Doctor not found');
    return item;
  }

  async update(id: string, payload: Partial<Doctor>) {
    const updated = await this.doctorModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) throw new NotFoundException('Doctor not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.doctorModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Doctor not found');
    return { message: 'Doctor deleted successfully' };
  }
}