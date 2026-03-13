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
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../../database/schemas/user.schema");
let SuperAdminService = class SuperAdminService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getPendingUsers() {
        return this.userModel.find({ approvalStatus: 'pending' });
    }
    async approveUser(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.approvalStatus = 'approved';
        await user.save();
        return { message: 'User approved successfully' };
    }
    async rejectUser(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.approvalStatus = 'rejected';
        await user.save();
        return { message: 'User rejected' };
    }
    async getSystemStats() {
        const totalUsers = await this.userModel.countDocuments();
        const pendingUsers = await this.userModel.countDocuments({
            approvalStatus: 'pending',
        });
        const doctors = await this.userModel.countDocuments({ role: 'doctor' });
        const pharmacists = await this.userModel.countDocuments({
            role: 'pharmacist',
        });
        return {
            totalUsers,
            pendingUsers,
            doctors,
            pharmacists,
        };
    }
    async getAllUsers() {
        return this.userModel.find();
    }
    async deleteUser(id) {
        await this.userModel.findByIdAndDelete(id);
        return { message: 'User deleted successfully' };
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SuperAdminService);
//# sourceMappingURL=superadmin.service.js.map