import { NutritionService } from './nutrition.service';
export declare class NutritionController {
    private readonly nutritionService;
    constructor(nutritionService: NutritionService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
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
