import { Model } from 'mongoose';
import { Report, ReportDocument } from '@/database/schemas/report.schema';
export declare class ReportsService {
    private readonly reportModel;
    constructor(reportModel: Model<ReportDocument>);
    create(payload: Partial<Report>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Report, {}, {}> & Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Report, {}, {}> & Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Report, {}, {}> & Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Report, {}, {}> & Report & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
