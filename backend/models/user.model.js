import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male","female"],
    },
},
{timestamps: true}
);

const User = mongoose.model('User',UserSchema)

export default User;