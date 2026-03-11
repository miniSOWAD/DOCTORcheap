import { Model } from 'mongoose';
import { Disease, DiseaseDocument } from '@/database/schemas/disease.schema';
import { Doctor, DoctorDocument } from '@/database/schemas/doctor.schema';
import { Medicine, MedicineDocument } from '@/database/schemas/medicine.schema';
import { Nutrition, NutritionDocument } from '@/database/schemas/nutrition.schema';
export declare class SearchService {
    private readonly diseaseModel;
    private readonly doctorModel;
    private readonly medicineModel;
    private readonly nutritionModel;
    constructor(diseaseModel: Model<DiseaseDocument>, doctorModel: Model<DoctorDocument>, medicineModel: Model<MedicineDocument>, nutritionModel: Model<NutritionDocument>);
    globalSearch(keyword: string): Promise<{
        diseases: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Disease, {}, {}> & Disease & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        doctors: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Doctor, {}, {}> & Doctor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        medicines: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Medicine, {}, {}> & Medicine & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        nutrition: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Nutrition, {}, {}> & Nutrition & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
}
