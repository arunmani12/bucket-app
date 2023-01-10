import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bucket: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bucket",
      },
    ],
    history: [
      {
        card: {
          type: Schema.Types.ObjectId,
          ref: "Card",
        },
        time: { type: Date, required: true },
      },
    ],
    historyTime: [
      {
        id: { type: String, required: true },
        time: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userModel);
