import { Model } from "mongoose";
import { KnowledgeModel } from "../models/knowledge.model.js";
import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import CustomError from "../../utils/customErrors.js";

export class KnowledgeRepository {
    private model: Model<KnowledgeInterface>;

    constructor(){
        this.model = KnowledgeModel;
    }

    public async getAllKnowledge(): Promise<KnowledgeInterface[]> {
        try {
            return await this.model.find();
        } catch(error: any) {
            throw new Error(error.message);
        }
    }
}