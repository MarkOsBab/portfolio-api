import { UserRepository } from "../repositories/user.repository.js";
import UserInterface from "../../interfaces/user.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "./../../enums/user.enum.js";
import { createHash, isValidPassword } from "../../utils/utils.js";

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

            const data = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: createHash(user.password as string),
                username: user.username
            };
            
            return await this.repository.create(data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async findByUsernameAndPassword(username: string, password: string): Promise<UserInterface | null | undefined> {
        try {
            const getUser = await this.repository.findByUsername(username);
    
            if (!getUser) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
    
            const isValid = isValidPassword(getUser, password);
    
            if (isValid) {
                return getUser;
            } else {
                CustomError.generateCustomError({
                    name: ErrorNames.INVALID_CREDENTIALS_NAME,
                    message: ErrorMessages.INVALID_CREDENTIALS_MESSAGE
                });
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }    
}