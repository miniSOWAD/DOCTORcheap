import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '@/database/schemas/doctor.schema';
export declare class DoctorsService {
    private readonly doctorModel;
    constructor(doctorModel: Model<DoctorDocument>);
    create(payload: Partial<Doctor>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, payload: Partial<Doctor>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
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
