import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/user.schema").User, {}, {}> & import("../../database/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/user.schema").User, {}, {}> & import("../../database/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            userId: string;
            phone: string;
            role: string;
            profileImage: string;
            approvalStatus: "approved";
        };
    }>;
    forgotPassword(body: {
        identifier: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
