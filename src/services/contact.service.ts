import ContactInterface from "../interfaces/contact.interface.js";
import { CustomError } from "../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../enums/contact.enum.js";
import { contactRepository } from "../repositories/index.js";

export class ContactService {
    private repository: typeof contactRepository;

    constructor(){
        this.repository = contactRepository;
    }

    public async getAll(): Promise<ContactInterface[]> {
        try {
            return await this.repository.getAll();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async getOne(id: string): Promise<ContactInterface | null> {
        try {
            const contact = await this.repository.getOne(id);
            if(!contact) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE,
                });
            }
            return contact;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}