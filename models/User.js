import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  reviews: [
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Review"
      }
  ],
  books: [
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Book"
      }
  ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;