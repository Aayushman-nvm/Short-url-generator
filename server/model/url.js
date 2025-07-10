import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  /*createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },*/
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  liked: {
    type: Boolean,
  },
  clicked: {
    type: Number,
  },
});

export const URL = mongoose.model("urls", urlSchema);
