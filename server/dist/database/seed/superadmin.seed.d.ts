import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class SuperAdminSeed implements OnModuleInit {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    onModuleInit(): Promise<void>;
}
