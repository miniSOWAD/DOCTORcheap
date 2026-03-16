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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../../database/schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.find().select('-password').sort({ createdAt: -1 });
    }
    async findById(id) {
        const user = await this.userModel.findById(id).select('-password');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async create(payload) {
        const existingUserId = await this.userModel.findOne({ userId: payload.userId });
        if (existingUserId)
            throw new common_1.BadRequestException('User ID already exists');
        const existingPhone = await this.userModel.findOne({ phone: payload.phone });
        if (existingPhone)
            throw new common_1.BadRequestException('Phone already exists');
        if (payload.email) {
            const existingEmail = await this.userModel.findOne({ email: payload.email });
            if (existingEmail)
                throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(payload.password || '123456', 10);
        const user = await this.userModel.create(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
        return {
            message: 'User created successfully',
            user,
        };
    }
    async update(id, payload) {
        if (payload.userId) {
            const existingUserId = await this.userModel.findOne({
                userId: payload.userId,
                _id: { $ne: id },
            });
            if (existingUserId)
                throw new common_1.BadRequestException('User ID already exists');
        }
        if (payload.phone) {
            const existingPhone = await this.userModel.findOne({
                phone: payload.phone,
                _id: { $ne: id },
            });
            if (existingPhone)
                throw new common_1.BadRequestException('Phone already exists');
        }
        if (payload.email) {
            const existingEmail = await this.userModel.findOne({
                email: payload.email,
                _id: { $ne: id },
            });
            if (existingEmail)
                throw new common_1.BadRequestException('Email already exists');
        }
        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        }
        const updated = await this.userModel
            .findByIdAndUpdate(id, payload, { new: true })
            .select('-password');
        if (!updated)
            throw new common_1.NotFoundException('User not found');
        return updated;
    }
    async updateRole(id, role) {
        const updated = await this.userModel
            .findByIdAndUpdate(id, { role }, { new: true })
            .select('-password');
        if (!updated)
            throw new common_1.NotFoundException('User not found');
        return updated;
    }
    async updateApprovalStatus(id, approvalStatus) {
        const updated = await this.userModel
            .findByIdAndUpdate(id, { approvalStatus }, { new: true })
            .select('-password');
        if (!updated)
            throw new common_1.NotFoundException('User not found');
        return updated;
    }
    async delete(id) {
        const deleted = await this.userModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map