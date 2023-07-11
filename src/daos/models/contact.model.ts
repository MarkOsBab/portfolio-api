import mongoose, { Model } from "mongoose";
import ContactInterface from "../../interfaces/contact.interface.js";

const contactCollection = "contacts";
const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    was_answered: {
        type: Boolean,
        enum: [0, 1],
        required: false,
        default: 0,
    }
});

const ContactModel: Model<ContactInterface> = mongoose.model<ContactInterface>(contactCollection, contactSchema);

export { ContactModel };