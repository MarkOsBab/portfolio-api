import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { KnowledgeRepository } from "../repositories/knowledge.repository.js";
import VisibleEnum from "../../enums/visible.enum.js";
import { ErrorNames, ErrorMessages } from "./validations/knowledge.validation.js";
import { validationResult } from "express-validator";

export class KnowledgeService {
    private repository: KnowledgeRepository;

    constructor(){
        this.repository = new KnowledgeRepository();
    }

    public async getAll(category?: string): Promise<KnowledgeInterface[]> {
        try {
            return await this.repository.getAll(category);
        } catch(error: any) {
            throw new Error(error);
        }
    }

    public async getOne(id: string): Promise<KnowledgeInterface | null> {
        try {
            const knowledge: KnowledgeInterface | null = await this.repository.getOne(id);
            if(!knowledge) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
            return knowledge;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async create(knowledge: KnowledgeInterface): Promise<KnowledgeInterface> {
        try {
            const existingKnowledge = await this.repository.getByName(knowledge.name);

            if (existingKnowledge) {
                CustomError.generateCustomError({
                    name: ErrorNames.FIELD_VALIDATION_NAME,
                    message: ErrorMessages.NAME_ALREADY_EXISTS_MESSAGE
                });
            }
            
            return this.repository.create(knowledge);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async update(id: string, knowledge: KnowledgeInterface): Promise<KnowledgeInterface | null> {
        try {
            const knowledgeToUpdate = await this.repository.getOne(id);
            
            if(!knowledgeToUpdate) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
            
            const existingKnowledgeName = await this.repository.getByName(knowledge.name);

            if (existingKnowledgeName) {
                CustomError.generateCustomError({
                    name: ErrorNames.FIELD_VALIDATION_NAME,
                    message: ErrorMessages.NAME_ALREADY_EXISTS_MESSAGE
                });
            }

            return await this.repository.update(id, knowledge);

        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async delete(id: string): Promise<KnowledgeInterface | null> {
        try {
            const knowladgeExists = await this.repository.getOne(id);
            if(!knowladgeExists) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }

            return await this.repository.delete(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}