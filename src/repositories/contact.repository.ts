import ContactInterface from "../interfaces/contact.interface.js";
import { contact } from "../daos/managers/index.js";

export class ContactRepository {
    private manager: typeof contact;

    constructor(){
        this.manager = contact;
    }

    public async getAll(): Promise<ContactInterface[]> {
        try {
            return await this.manager.getAll();
        } catch (error: any) {
            throw error;
        }
    }

    public async getOne(id: string): Promise<ContactInterface | null> {
        try {
            return await this.manager.getOne(id);
        } catch (error: any) {
            throw error;
        }
    }
}