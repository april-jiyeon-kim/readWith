import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: "Cover thumbnail URL is required"
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
  updater: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ] 
});

const model = mongoose.model("Book", BookSchema);
export default model;