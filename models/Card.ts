import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardModel = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Card || mongoose.model("Card", cardModel);
