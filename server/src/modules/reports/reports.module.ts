import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report, ReportSchema } from '@/database/schemas/report.schema';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]), AuthModule,],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}