import { HydratedDocument } from 'mongoose';
export type ReportDocument = HydratedDocument<Report>;
export declare class Report {
    userName: string;
    sellerId?: string;
    email: string;
    subject: string;
    message: string;
    fileUrl?: string;
    type?: string;
}
export declare const ReportSchema: import("mongoose").Schema<Report, import("mongoose").Model<Report, any, any, any, import("mongoose").Document<unknown, any, Report, any, {}> & Report & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Report, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Report>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Report> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
