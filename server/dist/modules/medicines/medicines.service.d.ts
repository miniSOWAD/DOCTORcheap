import { Model } from 'mongoose';
import { Medicine, MedicineDocument } from '@/database/schemas/medicine.schema';
export declare class MedicinesService {
    private readonly medicineModel;
    constructor(medicineModel: Model<MedicineDocument>);
    create(payload: Partial<Medicine>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
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
    update(id: string, payload: Partial<Medicine>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
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
