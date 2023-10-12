import mongoose from "mongoose";

const MainSchema = new mongoose.Schema({
  event_key: {
    type: String,
  },
  status: {
    type: String,
  },
  start_date_time: {
    type: Date,
  },
  end_date_time: {
    type: Date,
  },
  league: {
    type: String,
  },
  type: {
    type: String,
  },
  home: {
    type: String,
  },
  away: {
    type: String,
  },
  bet: {
    type: String,
  },
  isHome: {
    type: Boolean,  // Changed from String to Boolean
  },
  odds: {
    type: Number,
  },
  stake: {
    type: Number,
  },
  profit: {
    type: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date_time: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("Exchange", MainSchema);
