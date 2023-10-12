import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date_time: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Withdrawal', withdrawalSchema);
