import { social } from "../daos/managers/index.js";
import Socialinterface from "../interfaces/social.interface.js";

export class SocialRepository {
    private manager: typeof social;;

    constructor(){
        this.manager = social;
    }

    public async getAll(): Promise<Socialinterface[]> {
        try {
            return await this.manager.getAll();
        } catch (error: any) {
            throw error;
        }
    }

    public async getOne(id: string): Promise<Socialinterface | null> {
        try {
            return await this.manager.getOne(id);
        } catch (error: any) {
            throw error;
        }
    }

    public async create(social: Socialinterface): Promise<Socialinterface> {
        try {
            return await this.manager.create(social);
        } catch (error: any) {
            throw error;
        }
    }

    public async update(id: string, social: Socialinterface): Promise<Socialinterface | null> {
        try {
            return await this.manager.update(id, social);
        } catch (error: any) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Socialinterface | null> {
        try {
            return await this.manager.delete(id);
        } catch (error: any) {
            throw error;
        }
    }
}