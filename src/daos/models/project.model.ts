import mongoose, { Model } from "mongoose";
import ProjectInterface from "../../interfaces/project.interface.js";

const projectCollection = 'projects';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    links: [{
        type: String,
        required: true,
    }],
    thumbnails: [{
        type: String,
        required: true,
    }],
    visible: {
        type: Boolean,
        required: true,
    },
});

const ProjectModel: Model<ProjectInterface> = mongoose.model<ProjectInterface>(projectCollection, projectSchema);
export { ProjectModel };