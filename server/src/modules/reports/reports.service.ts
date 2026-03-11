import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '@/database/schemas/report.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>) {}

  async create(payload: Partial<Report>) {
    return this.reportModel.create(payload);
  }

  async findAll() {
    return this.reportModel.find().sort({ createdAt: -1 });
  }

  async delete(id: string) {
    const deleted = await this.reportModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Report not found');
    return { message: 'Report deleted successfully' };
  }
}