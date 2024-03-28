const { Schema, model } = require("mongoose");

const albumSchema = new Schema({
  albumImage: { type: String },
  albumName: { type: String, required: true },
  artistsNames: [String], // artist page retrieved from spotify API
  // releaseDate: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Album = model("Album", albumSchema);

module.exports = Album;
