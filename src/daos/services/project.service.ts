import ProjectInterface from "../../interfaces/project.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { ErrorMessages, ErrorNames } from "./validations/project.validation.js";

export class ProjectService {
    private repository: ProjectRepository;
    constructor(){
        this.repository = new ProjectRepository();
    }

    public async getAll(): Promise<ProjectInterface[]> {
        try {
            return await this.repository.getAll();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async getOne(id: string): Promise<ProjectInterface | null> {
        try {
            const project: ProjectInterface | null = await this.repository.getOne(id);
            if(!project) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }
            return project;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async create(project: ProjectInterface): Promise<ProjectInterface> {
        try {
            return this.repository.create(project);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}