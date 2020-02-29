import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  coverUrl: {
    type: String,
    required: "Cover URL is required"
  },    
  title: {
        type: String,
        required: "Tilte is required"
  },
  description: String,
  author: String,
  published_date: {
    type: Date
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ] 
});

const model = mongoose.model("Book", BookSchema);
export default model;