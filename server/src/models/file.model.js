import mongoose from "mongoose";
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    owner: String,
    originalName: String,
    storedName: String,
    salt: String,
    iv: String,
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('file', fileSchema);