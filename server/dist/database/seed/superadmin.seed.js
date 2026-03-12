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
exports.SuperAdminSeed = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../schemas/user.schema");
const role_enum_1 = require("../../shared/enums/role.enum");
let SuperAdminSeed = class SuperAdminSeed {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async onModuleInit() {
        console.log('🔎 Checking SuperAdmin...');
        const exists = await this.userModel.findOne({ role: role_enum_1.Role.SUPERADMIN });
        if (exists) {
            console.log('✅ SuperAdmin already exists');
            return;
        }
        const password = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD || 'superadmin123', 10);
        await this.userModel.create({
            name: process.env.SUPERADMIN_NAME || 'System SuperAdmin',
            email: process.env.SUPERADMIN_EMAIL || 'superadmin@doctorcheap.com',
            phone: process.env.SUPERADMIN_PHONE || '9999999999',
            userId: process.env.SUPERADMIN_USER_ID || 'SUPERADMIN001',
            password,
            role: role_enum_1.Role.SUPERADMIN,
            approvalStatus: 'approved',
        });
        console.log('🔥 SuperAdmin created successfully');
    }
};
exports.SuperAdminSeed = SuperAdminSeed;
exports.SuperAdminSeed = SuperAdminSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SuperAdminSeed);
//# sourceMappingURL=superadmin.seed.js.map