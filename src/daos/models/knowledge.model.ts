import mongoose, { Model, Schema } from "mongoose";
import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import uniqueValidator from 'mongoose-unique-validator';

const knowledgeCollection: string = "knowledge";

const knowledgeSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
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

knowledgeSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const KnowledgeModel: Model<KnowledgeInterface> = mongoose.model<KnowledgeInterface>(knowledgeCollection, knowledgeSchema);

export { KnowledgeModel };