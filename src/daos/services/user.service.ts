import { UserRepository } from "../repositories/user.repository.js";
import UserInterface from "../../interfaces/user.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "./validations/user.validation.js";

export class UserService {
    private repository: UserRepository;

    constructor(){
        this.repository = new UserRepository();
    }

    public async findById(id: string): Promise<UserInterface | null> {
        try {
            const user = await this.repository.findById(id);
            if(!user) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async create(user: UserInterface): Promise<UserInterface> {
        try {           
            const existingEmail = await this.repository.findByEmail(user.email);
            if(existingEmail) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.EMAIL_ALREADY_REGISTRED
                });
            }

            const existingUsername = await this.repository.findByUsername(user.username);
            if(existingUsername) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.USERNAME_ALREADY_REGISTRED
                });
            }
            
            return await this.repository.create(user);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}