import fs from "fs";
import path from "path";
import ProjectInterface from "../../interfaces/project.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { ErrorMessages, ErrorNames } from "./../../enums/project.enum.js";
import __dirname from "../../utils/utils.js";

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

    public async update(id: string, project: ProjectInterface): Promise<ProjectInterface | null> {
        try {
            const projectToUpdate = await this.repository.getOne(id);
            if(!projectToUpdate) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }

            if(project.thumbnails && projectToUpdate?.thumbnails) {
                projectToUpdate.thumbnails.forEach((thumbnail: string) => {
                    const thumbnailFileName = path.basename(thumbnail);
                    const thumbnailPath = path.resolve(__dirname, '../public/images', thumbnailFileName);
                    const existingFile = fs.existsSync(thumbnailPath);
                    if(existingFile) {
                        fs.unlinkSync(thumbnailPath);
                    }
                });
            }

            return await this.repository.update(id, project);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async delete(id: string): Promise<ProjectInterface | null> {
        try {
            const projectToUpdate = await this.repository.getOne(id);
            if(!projectToUpdate) {
                CustomError.generateCustomError({
                    name: ErrorNames.NOT_FOUND_NAME,
                    message: ErrorMessages.NOT_FOUND_MESSAGE
                });
            }

            if(projectToUpdate?.thumbnails) {
                projectToUpdate.thumbnails.forEach((thumbnail: string) => {
                    const thumbnailFileName = path.basename(thumbnail);
                    const thumbnailPath = path.resolve(__dirname, '../public/images', thumbnailFileName);
                    const existingFile = fs.existsSync(thumbnailPath);
                    if(existingFile) {
                        fs.unlinkSync(thumbnailPath);
                    } else {
                        return;
                    }
                });
            }

            return await this.repository.delete(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}