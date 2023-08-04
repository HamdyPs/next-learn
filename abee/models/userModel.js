import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
}, {
  timestamps: true
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User