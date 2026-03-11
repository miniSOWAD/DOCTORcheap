import { DiseasesService } from './diseases.service';
export declare class DiseasesController {
    private readonly diseasesService;
    constructor(diseasesService: DiseasesService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../database/schemas/disease.schema").Disease, {}, {}> & import("../../database/schemas/disease.schema").Disease & {
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
