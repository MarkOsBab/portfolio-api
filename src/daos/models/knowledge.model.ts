import mongoose, { Model, Schema } from "mongoose";
import KnowledgeInterface from "../../interfaces/knowledge.interface.js";

const knowledgeCollection: string = "knowledge";

const knowledgeSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    description: String,
    visible: {
        type: Boolean,
        enum: [0, 1],
        default: 1,
    },
    category: String,
    thumbnail: String
});

const KnowledgeModel: Model<KnowledgeInterface> = mongoose.model<KnowledgeInterface>(knowledgeCollection, knowledgeSchema);

export { KnowledgeModel };