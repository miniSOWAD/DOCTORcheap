"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const search_controller_1 = require("./search.controller");
const search_service_1 = require("./search.service");
const disease_schema_1 = require("../../database/schemas/disease.schema");
const doctor_schema_1 = require("../../database/schemas/doctor.schema");
const medicine_schema_1 = require("../../database/schemas/medicine.schema");
const nutrition_schema_1 = require("../../database/schemas/nutrition.schema");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: disease_schema_1.Disease.name, schema: disease_schema_1.DiseaseSchema },
                { name: doctor_schema_1.Doctor.name, schema: doctor_schema_1.DoctorSchema },
                { name: medicine_schema_1.Medicine.name, schema: medicine_schema_1.MedicineSchema },
                { name: nutrition_schema_1.Nutrition.name, schema: nutrition_schema_1.NutritionSchema },
            ]),
        ],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map