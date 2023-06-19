import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import { KnowledgeRepository } from "../repositories/knowledge.repository.js";

export class KnowledgeService {
    private repository: KnowledgeRepository;

    constructor(){
        this.repository = new KnowledgeRepository();
    }

    public async getAllKnowledge(): Promise<KnowledgeInterface[]> {
        try {
            return await this.repository.getAllKnowledge();
        } catch(error: any) {
            throw new Error(error);
        }
    }
}