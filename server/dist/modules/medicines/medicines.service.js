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
exports.MedicinesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const medicine_schema_1 = require("../../database/schemas/medicine.schema");
let MedicinesService = class MedicinesService {
    constructor(medicineModel) {
        this.medicineModel = medicineModel;
    }
    async findAll() {
        return this.medicineModel.find().sort({ createdAt: -1 });
    }
    async create(payload) {
        return this.medicineModel.create(payload);
    }
    async bulkImport(payload) {
        var _a;
        if (!((_a = payload.medicines) === null || _a === void 0 ? void 0 : _a.length)) {
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
            sellerId: item.sellerId || '',
            sellerName: item.sellerName || '',
            sellerUserId: item.sellerUserId || '',
            sellerPhone: item.sellerPhone || '',
            shopName: item.shopName || '',
            companyOrBrand: item.companyOrBrand || '',
            shopLocation: item.shopLocation || '',
            shopContactInfo: item.shopContactInfo || '',
        }));
        const inserted = await this.medicineModel.insertMany(docs, {
            ordered: false,
        });
        return {
            message: 'Medicines imported successfully',
            insertedCount: inserted.length,
        };
    }
    async update(id, payload) {
        const updated = await this.medicineModel.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!updated)
            throw new common_1.NotFoundException('Medicine not found');
        return updated;
    }
    async delete(id) {
        const deleted = await this.medicineModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Medicine not found');
        return { message: 'Medicine deleted successfully' };
    }
};
exports.MedicinesService = MedicinesService;
exports.MedicinesService = MedicinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medicine_schema_1.Medicine.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MedicinesService);
//# sourceMappingURL=medicines.service.js.map