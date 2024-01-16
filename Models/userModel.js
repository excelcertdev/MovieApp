import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
}, { timestamps: true });

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
