import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    globalSearch(keyword: string): Promise<{
        diseases: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        doctors: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/doctor.schema").Doctor, {}, {}> & import("../../database/schemas/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/doctor.schema").Doctor, {}, {}> & import("../../database/schemas/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        medicines: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/medicine.schema").Medicine, {}, {}> & import("../../database/schemas/medicine.schema").Medicine & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        nutrition: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/nutrition.schema").Nutrition, {}, {}> & import("../../database/schemas/nutrition.schema").Nutrition & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
}
