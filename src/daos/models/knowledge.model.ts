import mongoose, { Model, Schema } from "mongoose";
import KnowledgeInterface from "../../interfaces/knowledge.interface.js";

const knowledgeCollection: string = "knowledge";

const knowledgeSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    visible: {
        type: Boolean,
        enum: [0, 1],
        default: 1,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
});

const KnowledgeModel: Model<KnowledgeInterface> = mongoose.model<KnowledgeInterface>(knowledgeCollection, knowledgeSchema);

export { KnowledgeModel };