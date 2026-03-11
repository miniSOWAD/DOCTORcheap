"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const diseases_module_1 = require("./modules/diseases/diseases.module");
const doctors_module_1 = require("./modules/doctors/doctors.module");
const medicines_module_1 = require("./modules/medicines/medicines.module");
const nutrition_module_1 = require("./modules/nutrition/nutrition.module");
const reports_module_1 = require("./modules/reports/reports.module");
const search_module_1 = require("./modules/search/search.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || ''),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            diseases_module_1.DiseasesModule,
            doctors_module_1.DoctorsModule,
            medicines_module_1.MedicinesModule,
            nutrition_module_1.NutritionModule,
            reports_module_1.ReportsModule,
            search_module_1.SearchModule,
            uploads_module_1.UploadsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map