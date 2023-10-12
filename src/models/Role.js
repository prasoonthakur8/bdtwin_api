import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model('Role', roleSchema);
