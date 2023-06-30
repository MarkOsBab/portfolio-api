import path from "path";
import KnowledgeInterface from "../interfaces/knowledge.interface.js";
import { CustomError } from "../utils/customErrors.js";
import { knowledgeRepository } from "../repositories/index.js";
import { ErrorNames, ErrorMessages } from "../enums/knowledge.enum.js";
import fs from "fs";
import __dirname from "../utils/utils.js";

export class KnowledgeService {
    private repository: typeof knowledgeRepository;

    constructor(){
        this.repository = knowledgeRepository;
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
            
            if (knowledgeToUpdate && knowledge.name !== knowledgeToUpdate.name) {
                const existingKnowledgeName = await this.repository.getByName(knowledge.name);
          
                if (existingKnowledgeName) {
                  CustomError.generateCustomError({
                    name: ErrorNames.FIELD_VALIDATION_NAME,
                    message: ErrorMessages.NAME_ALREADY_EXISTS_MESSAGE,
                  });
                }
            }

            if (knowledge.thumbnail && knowledgeToUpdate?.thumbnail) {
                const thumbnailFileName = path.basename(knowledgeToUpdate.thumbnail);
                const thumbnailPath = path.resolve(__dirname, '../public/images', thumbnailFileName);
                const existingFile = fs.existsSync(thumbnailPath);
                if(existingFile) {
                    fs.unlinkSync(thumbnailPath);
                }
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

            if (knowladgeExists && knowladgeExists.thumbnail) {
                const thumbnailFileName = path.basename(knowladgeExists.thumbnail);
                const thumbnailPath = path.resolve(__dirname, '../public/images', thumbnailFileName);
                const existingFile = fs.existsSync(thumbnailPath);
                if(existingFile) {
                    fs.unlinkSync(thumbnailPath);
                }
            }

            return await this.repository.delete(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}