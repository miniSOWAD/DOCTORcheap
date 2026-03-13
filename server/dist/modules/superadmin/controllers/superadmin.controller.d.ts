import { SuperAdminService } from '../services/superadmin.service';
export declare class SuperAdminController {
    private readonly service;
    constructor(service: SuperAdminService);
    getStats(): Promise<{
        totalUsers: number;
        pendingUsers: number;
        doctors: number;
        pharmacists: number;
    }>;
    getPendingUsers(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../../database/schemas/user.schema").User, {}, {}> & import("../../../database/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../../database/schemas/user.schema").User, {}, {}> & import("../../../database/schemas/user.schema").User & {
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
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../../database/schemas/user.schema").User, {}, {}> & import("../../../database/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../../database/schemas/user.schema").User, {}, {}> & import("../../../database/schemas/user.schema").User & {
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
