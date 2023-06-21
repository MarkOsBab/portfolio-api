import { SocialRepository } from "../repositories/social.repository.js";
import Socialinterface from "../../interfaces/social.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "./validations/social.validation.js";

export class SocialService {
    private repository: SocialRepository;

    constructor(){
        this.repository = new SocialRepository();
    }

    public async getAll(): Promise<Socialinterface[]> {
        try {
            return await this.repository.getAll();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async getOne(id: string): Promise<Socialinterface | null> {
        try {
            const social: Socialinterface | null = await this.repository.getOne(id);
            if(!social) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
            return social;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async create(social: Socialinterface): Promise<Socialinterface> {
        try {
            return await this.repository.create(social);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async update(id: string, social: Socialinterface): Promise<Socialinterface | null> {
        try {
            const existingSocial = this.repository.getOne(id);
            if(!existingSocial) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
            return await this.repository.update(id, social);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async delete(id: string): Promise<Socialinterface | null> {
        try {
            const existingSocial = this.repository.getOne(id);
            if(!existingSocial) {
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