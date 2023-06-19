import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { KnowledgeRepository } from "../repositories/knowledge.repository.js";
import { ErrorNames, ErrorMessages } from "../../enums/errors/knowledge.errors.js";

export class KnowledgeService {
    private repository: KnowledgeRepository;

    constructor(){
        this.repository = new KnowledgeRepository();
    }

    public async getAll(): Promise<KnowledgeInterface[]> {
        try {
            return await this.repository.getAll();
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
}