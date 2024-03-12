const { Schema, model } = require("mongoose");


const albumSchema = new Album({
  albumImage: String,
  albumName: { type: String, required: true},
  artistsNames: [String], // artist page retrieved from spotify API
  // tracks: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Track",
  //   },
  // ], tracks (previews) will be retrieved from spotify API
  // genres: [{
  //   type: String,
  //   enum: ["Rock", "Pop", "Electro", "Classical", ""]
  // }],
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