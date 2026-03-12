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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../../database/schemas/user.schema");
const role_enum_1 = require("../../shared/enums/role.enum");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingUserId = await this.userModel.findOne({ userId: dto.userId });
        if (existingUserId) {
            throw new common_1.BadRequestException('User ID already exists');
        }
        const existingPhone = await this.userModel.findOne({ phone: dto.phone });
        if (existingPhone) {
            throw new common_1.BadRequestException('Phone already exists');
        }
        if (dto.email) {
            const existingEmail = await this.userModel.findOne({ email: dto.email });
            if (existingEmail) {
                throw new common_1.BadRequestException('Email already exists');
            }
        }
        const rolesNeedingApproval = [
            role_enum_1.Role.DOCTOR,
            role_enum_1.Role.PHARMACIST,
            role_enum_1.Role.SELLER,
            role_enum_1.Role.ADMIN,
        ];
        if (rolesNeedingApproval.includes(dto.role)) {
            if (!dto.nidImage || !dto.licenseImage) {
                throw new common_1.BadRequestException('NID image and license image are required');
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const approvalStatus = rolesNeedingApproval.includes(dto.role)
            ? 'pending'
            : 'approved';
        const user = await this.userModel.create(Object.assign(Object.assign({}, dto), { password: hashedPassword, approvalStatus }));
        return {
            message: approvalStatus === 'pending'
                ? 'Registration successful. Please wait for superadmin approval.'
                : 'User registered successfully',
            user,
        };
    }
    async login(dto) {
        const query = {
            $or: [
                { email: dto.identifier },
                { userId: dto.identifier },
                { phone: dto.identifier },
            ],
        };
        if ((0, mongoose_2.isValidObjectId)(dto.identifier)) {
            query.$or.push({ _id: dto.identifier });
        }
        const user = await this.userModel.findOne(query);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        if (user.approvalStatus !== 'approved') {
            throw new common_1.UnauthorizedException(user.approvalStatus === 'pending'
                ? 'Your account is pending superadmin approval'
                : 'Your account has been rejected');
        }
        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role,
            userId: user.userId,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userId: user.userId,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage,
                approvalStatus: user.approvalStatus,
            },
        };
    }
    async forgotPassword(dto) {
        const query = {
            $or: [
                { email: dto.identifier },
                { userId: dto.identifier },
                { phone: dto.identifier },
            ],
        };
        if ((0, mongoose_2.isValidObjectId)(dto.identifier)) {
            query.$or.push({ _id: dto.identifier });
        }
        const user = await this.userModel.findOne(query);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return {
            message: 'Password updated successfully',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map