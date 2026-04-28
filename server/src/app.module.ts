import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DiseasesModule } from './modules/diseases/diseases.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { MedicinesModule } from './modules/medicines/medicines.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SearchModule } from './modules/search/search.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { DatabaseModule } from './database/database.module';
import { SuperAdminModule } from './modules/superadmin/superadmin.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    AuthModule,
    DatabaseModule,
    UsersModule,
    DiseasesModule,
    DoctorsModule,
    MedicinesModule,
    NutritionModule,
    ReportsModule,
    SearchModule,
    UploadsModule,
    SuperAdminModule,
    ContactModule,
  ],
})
export class AppModule {}