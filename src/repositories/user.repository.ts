import UserInterface from "../interfaces/user.interface.js";
import { user } from "./../daos/managers/index.js";

export class UserRepository {
    private manager: typeof user;

    constructor(){
        this.manager = user;
    }

    public async findById(id: string): Promise<UserInterface | null> {
        try {
            return await this.manager.findById(id);
        } catch (error: any) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserInterface | null> {
        try {
            return await this.manager.findByEmail(email);
        } catch (error: any) {
            throw error;
        }
    }

    public async findByUsername(username: string): Promise<UserInterface | null> {
        try {
            return await this.manager.findByUsername(username);
        } catch (error: any) {
            throw error;
        }
    }

    public async create(user: UserInterface): Promise<UserInterface> {
        try {
            return await this.manager.create(user);
        } catch (error: any) {
            throw error;
        }
    }
    
    public async findByUsernameAndPassword(username: String, password: String): Promise<UserInterface | null | undefined> {
        try {
            return await this.manager.findByUsernameAndPassword(username, password);
        } catch (error: any) {
            throw error;
        }
    }
    
}