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
exports.DiseasesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const disease_schema_1 = require("../../database/schemas/disease.schema");
let DiseasesService = class DiseasesService {
    constructor(diseaseModel) {
        this.diseaseModel = diseaseModel;
    }
    async create(payload) {
        return this.diseaseModel.create(payload);
    }
    async findAll() {
        return this.diseaseModel.find().sort({ createdAt: -1 });
    }
    async findOne(id) {
        const item = await this.diseaseModel.findById(id);
        if (!item)
            throw new common_1.NotFoundException('Disease not found');
        return item;
    }
    async update(id, payload) {
        const updated = await this.diseaseModel.findByIdAndUpdate(id, payload, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Disease not found');
        return updated;
    }
    async delete(id) {
        const deleted = await this.diseaseModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Disease not found');
        return { message: 'Disease deleted successfully' };
    }
};
exports.DiseasesService = DiseasesService;
exports.DiseasesService = DiseasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(disease_schema_1.Disease.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DiseasesService);
//# sourceMappingURL=diseases.service.js.map