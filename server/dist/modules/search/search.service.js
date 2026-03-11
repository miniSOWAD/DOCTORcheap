"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const disease_schema_1 = require("../../database/schemas/disease.schema");
const doctor_schema_1 = require("../../database/schemas/doctor.schema");
const medicine_schema_1 = require("../../database/schemas/medicine.schema");
const nutrition_schema_1 = require("../../database/schemas/nutrition.schema");
const build_regex_1 = require("../../common/utils/build-regex");
let SearchService = class SearchService {
    constructor(diseaseModel, doctorModel, medicineModel, nutritionModel) {
        this.diseaseModel = diseaseModel;
        this.doctorModel = doctorModel;
        this.medicineModel = medicineModel;
        this.nutritionModel = nutritionModel;
    }
    async globalSearch(keyword) {
        const regex = (0, build_regex_1.buildRegex)(keyword);
        const [diseases, doctors, medicines, nutrition] = await Promise.all([
            this.diseaseModel.find({ name: regex }),
            this.doctorModel.find({ $or: [{ name: regex }, { specialization: regex }] }),
            this.medicineModel.find({ $or: [{ name: regex }, { genericName: regex }, { brand: regex }] }),
            this.nutritionModel.find({ title: regex }),
        ]);
        return { diseases, doctors, medicines, nutrition };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(disease_schema_1.Disease.name)),
    __param(1, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __param(2, (0, mongoose_1.InjectModel)(medicine_schema_1.Medicine.name)),
    __param(3, (0, mongoose_1.InjectModel)(nutrition_schema_1.Nutrition.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SearchService);
//# sourceMappingURL=search.service.js.map