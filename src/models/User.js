import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  player_remote_id: {
    type: Number,
    required: false
  },
  user_name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: false
  },
  date_of_birth: {
    type: Date,
    required: false
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  attached_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  date_time: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('User', userSchema);
