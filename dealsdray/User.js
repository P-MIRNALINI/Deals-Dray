import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['HR', 'Manager', 'Sales'],
        default: 'Select'
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    courses: {
        type: [String], // Array of strings to store multiple courses
        default: [] // Default value as empty array
    }
}, { timestamps: true });

const usermodel = mongoose.model('user', userSchema);

export default usermodel;
