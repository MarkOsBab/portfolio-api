import ContactInterface from "../interfaces/contact.interface.js";
import { CustomError } from "../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../enums/contact.enum.js";
import { contactRepository } from "../repositories/index.js";
import { contactTemplate } from "../emails/contact.template.js";
import { sendMail } from "../utils/sendMail.js";
import { generateUUID } from "../utils/utils.js";

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

    public async create(contact: ContactInterface): Promise<ContactInterface> {
        try {            
            const checkEmailAlreadyHasRequest = await this.repository.getIfNotAnswered(contact.email);

            if(checkEmailAlreadyHasRequest) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.ALREADY_CONTACT_REQUEST_IN_REPLY_LIST,
                });
            }

            const token = generateUUID();
            const data: ContactInterface = {
                firstname: contact.firstname,
                lastname: contact.lastname ? contact.lastname : "",
                email: contact.email,
                code: token,
                message: contact.message
            };
            

            const result = await this.repository.create(data);
            
            if(!result) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.NOT_CREATED_MESSAGE,
                });
            } else {
                const mailName = contact.lastname ? `${contact.firstname} ${contact.lastname}` : `${contact.firstname}`;  
                const subject = `Hi ${mailName}, your contact request has been sended`;
                const message = contactTemplate(mailName);

                await sendMail(contact.email, subject, message);
            }
            
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    } 
}