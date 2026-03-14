import { Model } from 'mongoose';
import { Medicine, MedicineDocument } from '@/database/schemas/medicine.schema';
export declare class MedicinesService {
    private readonly medicineModel;
    constructor(medicineModel: Model<MedicineDocument>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    create(payload: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    bulkImport(payload: {
        medicines: any[];
    }): Promise<{
        message: string;
        insertedCount: number;
    }>;
    update(id: string, payload: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
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
