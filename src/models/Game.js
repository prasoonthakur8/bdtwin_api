import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  details: {
    type: Object,
    required: true
  },
  mobile: {
    type: Boolean
  },
  image: {
    type: String,
    required: false
  },
  image_preview: {
    type: String,
    required: false
  },
  image_filled: {
    type: String,
    required: false
  },
  image_portrait: {
    type: String,
    required: false
  },
  image_square: {
    type: String,
    required: false
  },
  image_background: {
    type: String,
    required: false
  },
  image_bw: {
    type: String,
    required: false
  },
});

gameSchema.plugin(mongoosePaginate);

export default mongoose.model('Game', gameSchema);
