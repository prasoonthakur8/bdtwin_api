import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const gameTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game_id: {
    type: Number,
    required: true
  },
  game_session_id: {
    type: String,
    required: true
  },
  win: {
    type: Number
  },
  loss: {
    type: Number
  }
});

gameTransactionSchema.plugin(mongoosePaginate);

export default mongoose.model('GameTransaction', gameTransactionSchema);
