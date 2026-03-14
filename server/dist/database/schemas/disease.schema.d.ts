import { HydratedDocument } from 'mongoose';
export type DiseaseDocument = HydratedDocument<Disease>;
export declare class Disease {
    name: string;
    seriousnessLevel?: string;
    symptoms?: string[];
    warningSymptoms?: string[];
    firstThingToDo?: string;
    doctorTypes?: string[];
    nutritionLink?: string;
    causes?: string[];
    precautions?: string[];
}
export declare const DiseaseSchema: import("mongoose").Schema<Disease, import("mongoose").Model<Disease, any, any, any, import("mongoose").Document<unknown, any, Disease, any, {}> & Disease & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Disease, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Disease>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Disease> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
