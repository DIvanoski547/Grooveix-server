const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    album: {                            // -> should change the name from "album" to "albumId", better readable code
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    content: String,
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
