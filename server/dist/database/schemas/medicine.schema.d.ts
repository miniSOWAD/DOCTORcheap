import { HydratedDocument } from 'mongoose';
export type MedicineDocument = HydratedDocument<Medicine>;
export declare class Medicine {
    name: string;
    genericName?: string;
    brand?: string;
    dosage?: string;
    price: number;
    unitPrice?: number;
    ingredients?: string;
    usage?: string;
    usedFor?: string[];
    sideEffects?: string[];
    imageUrl?: string;
    pdfUrl?: string;
}
export declare const MedicineSchema: import("mongoose").Schema<Medicine, import("mongoose").Model<Medicine, any, any, any, import("mongoose").Document<unknown, any, Medicine, any, {}> & Medicine & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Medicine, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Medicine>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Medicine> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
