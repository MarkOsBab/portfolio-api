import KnowledgeInterface from "../interfaces/knowledge.interface.js";
import { knowledge } from "../daos/managers/index.js";

export class KnowledgeRepository {
    private manager: typeof knowledge;

    constructor(){
        this.manager = knowledge;
    }

    public async getAll(category?: string): Promise<KnowledgeInterface[]> {
        try {
            return await this.manager.getAll(category);
        } catch(error: any) {
            throw error
        }
    }

    public async getOne(id: string): Promise<KnowledgeInterface | null> {
        try {
            return await this.manager.getOne(id);
        } catch(error: any) {
            throw error;
        }
    }

    public async create(knowledge: KnowledgeInterface): Promise<KnowledgeInterface> {
        try {
            return await this.manager.create(knowledge);
        } catch (error: any) {
            throw error;
        }
    }

    public async getByName(name: string): Promise<KnowledgeInterface | null> {
        try {
            return await this.manager.getByName(name);
        } catch (error: any) {
            throw error;
        }
    }

    public async update(id:string, knowledge: KnowledgeInterface): Promise<KnowledgeInterface | null> {
        try {
            return await this.manager.update(id, knowledge);
        } catch (error: any) {
            throw error;
        }
    };

    public async delete(id: string): Promise<KnowledgeInterface | null> {
        try {
            return await this.manager.delete(id);
        } catch (error: any) {
            throw error;
        }
    }
}