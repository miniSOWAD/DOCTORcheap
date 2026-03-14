import { HydratedDocument } from 'mongoose';
export type NutritionDocument = HydratedDocument<Nutrition>;
export declare class Nutrition {
    title: string;
    foodLines?: string[];
    diseaseUsedFor?: string;
    precautions?: string;
    recommendedFoods?: string[];
    avoidedFoods?: string[];
    notes?: string;
}
export declare const NutritionSchema: import("mongoose").Schema<Nutrition, import("mongoose").Model<Nutrition, any, any, any, import("mongoose").Document<unknown, any, Nutrition, any, {}> & Nutrition & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Nutrition, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Nutrition>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Nutrition> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
