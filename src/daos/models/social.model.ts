import mongoose, { Model } from "mongoose";
import Socialinterface from "../../interfaces/social.interface.js";

const socialCollection = "socials";

const socialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
});

const SocialModel: Model<Socialinterface> = mongoose.model<Socialinterface>(socialCollection, socialSchema);

export { SocialModel };