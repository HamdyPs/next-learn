import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }
}, {
  timestamps: true
})

const Post = mongoose.models.posts || mongoose.model("posts", postSchema)

export default Post