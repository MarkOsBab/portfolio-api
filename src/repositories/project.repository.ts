import ProjectInterface from "../interfaces/project.interface.js";
import { project } from "../daos/managers/index.js";

export class ProjectRepository {
    private manager: typeof project;

    constructor(){
        this.manager = project;
    }

    public async getAll(): Promise<ProjectInterface[]> {
        try {
            return await this.manager.getAll();
        } catch (error: any) {
            throw error;
        }
    };

    public async getOne(id: string): Promise<ProjectInterface | null> {
        try {
            return await this.manager.getOne(id);
        } catch (error: any) {
            throw error;
        }
    }

    public async create(project: ProjectInterface): Promise<ProjectInterface> {
        try {
            return await this.manager.create(project);
        } catch (error: any) {
            throw error;
        }
    }

    public async update(id: string, project: ProjectInterface): Promise<ProjectInterface | null> {
        try {
            return await this.manager.update(id, project);
        } catch (error: any) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ProjectInterface | null> {
        try {
            return await this.manager.delete(id);
        } catch (error: any) {
            throw error;
        }
    }
}