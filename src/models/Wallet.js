import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Wallet', walletSchema);
