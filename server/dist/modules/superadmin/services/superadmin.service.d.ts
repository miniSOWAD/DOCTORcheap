import { Model } from 'mongoose';
import { User, UserDocument } from '@/database/schemas/user.schema';
export declare class SuperAdminService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getPendingUsers(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    approveUser(id: string): Promise<{
        message: string;
    }>;
    rejectUser(id: string): Promise<{
        message: string;
    }>;
    getSystemStats(): Promise<{
        totalUsers: number;
        pendingUsers: number;
        doctors: number;
        pharmacists: number;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
