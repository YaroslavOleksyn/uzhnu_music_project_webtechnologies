
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nickNam: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    preference: {
        type: Array,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    imageUrl: String,
},
    {
        Timestamp: true,
    }
);
export default mongoose.model('User', UserSchema);