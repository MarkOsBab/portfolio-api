import mongoose, { Model } from "mongoose";
import UserInterface from "../../interfaces/user.interface.js";

const userCollection = "users";
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel: Model<UserInterface> = mongoose.model<UserInterface>(userCollection, userSchema);

export { UserModel };