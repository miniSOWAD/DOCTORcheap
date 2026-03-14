import { MedicinesService } from './medicines.service';
export declare class MedicinesController {
    private readonly medicinesService;
    constructor(medicinesService: MedicinesService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    bulkImport(body: {
        medicines: any[];
    }): Promise<{
        message: string;
        insertedCount: number;
    }>;
    update(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
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
