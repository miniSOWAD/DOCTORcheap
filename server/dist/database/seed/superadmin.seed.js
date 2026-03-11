"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../schemas/user.schema");
const role_enum_1 = require("../../shared/enums/role.enum");
async function seedSuperAdmin() {
    await mongoose_1.default.connect(process.env.MONGODB_URI || '');
    const User = mongoose_1.default.model('User', user_schema_1.UserSchema);
    const exists = await User.findOne({ role: role_enum_1.Role.SUPERADMIN });
    if (exists) {
        console.log('Superadmin already exists');
        process.exit(0);
    }
    const password = await bcrypt.hash('superadmin123', 10);
    await User.create({
        name: 'Super Admin',
        email: 'superadmin@medcare.com',
        password,
        role: role_enum_1.Role.SUPERADMIN,
    });
    console.log('Superadmin created');
    process.exit(0);
}
seedSuperAdmin();
//# sourceMappingURL=superadmin.seed.js.map