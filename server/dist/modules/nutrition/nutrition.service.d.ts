import { Model } from 'mongoose';
import { Nutrition, NutritionDocument } from '@/database/schemas/nutrition.schema';
export declare class NutritionService {
    private readonly nutritionModel;
    constructor(nutritionModel: Model<NutritionDocument>);
    create(payload: Partial<Nutrition>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, payload: Partial<Nutrition>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
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
