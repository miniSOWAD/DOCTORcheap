import { Model } from 'mongoose';
import { Disease, DiseaseDocument } from '@/database/schemas/disease.schema';
export declare class DiseasesService {
    private readonly diseaseModel;
    constructor(diseaseModel: Model<DiseaseDocument>);
    create(payload: Partial<Disease>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, payload: Partial<Disease>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
