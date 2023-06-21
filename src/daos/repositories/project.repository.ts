import mongoose, { Model } from "mongoose";
import { ProjectModel } from "../models/project.model.js";
import ProjectInterface from "../../interfaces/project.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../services/validations/project.validation.js";

export class ProjectRepository {
    private model: Model<ProjectInterface>;

    constructor(){
        this.model = ProjectModel;
    }

    public async getAll(): Promise<ProjectInterface[]> {
        try {
            return await this.model.find();
        } catch (error: any) {
            throw error;
        }
    };

    public async getOne(id: string): Promise<ProjectInterface | null> {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.ID_NOT_VALID_MESSAGE
                });
            }

            return await this.model.findOne({_id: id});
        } catch (error: any) {
            throw error;
        }
    }

    public async create(project: ProjectInterface): Promise<ProjectInterface> {
        try {
            return await this.model.create(project);
        } catch (error: any) {
            throw error;
        }
    }

    public async update(id: string, project: ProjectInterface): Promise<ProjectInterface | null> {
        try {
            return await this.model.findByIdAndUpdate(id, project, { new: true });
        } catch (error: any) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ProjectInterface | null> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error: any) {
            throw error;
        }
    }
}