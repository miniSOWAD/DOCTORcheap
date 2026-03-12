import { HydratedDocument } from 'mongoose';
import { Role } from '@/shared/enums/role.enum';
export type UserDocument = HydratedDocument<User>;
export type ApprovalStatus = 'approved' | 'pending' | 'rejected';
export declare class User {
    name: string;
    email?: string;
    userId: string;
    phone: string;
    password: string;
    role: Role;
    profileImage?: string;
    nidImage?: string;
    licenseImage?: string;
    approvalStatus: ApprovalStatus;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
