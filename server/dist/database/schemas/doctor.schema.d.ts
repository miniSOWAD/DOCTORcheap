import { HydratedDocument } from 'mongoose';
export type DoctorDocument = HydratedDocument<Doctor>;
export declare class Doctor {
    name: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultationFee?: number;
    about?: string;
}
export declare const DoctorSchema: import("mongoose").Schema<Doctor, import("mongoose").Model<Doctor, any, any, any, import("mongoose").Document<unknown, any, Doctor, any, {}> & Doctor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Doctor, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Doctor>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Doctor> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
