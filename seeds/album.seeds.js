const mongoose = require("mongoose");
const Album = require("../models/Album.model");

const albums = [
    {albumImage: "https://i.scdn.co/image/ab67616d00001e02de437d960dda1ac0a3586d97", albumName: "Thriller", artistsNames:["Michael Jackson"]},
    {albumImage: "https://i.scdn.co/image/ab67616d0000b2730b51f8d91f3a21e8426361ae", albumName: "Back in Black", artistsNames: ["AC/DC"]},
    {albumImage: "https://i.scdn.co/image/ab67616d0000b27334ef8f7d06cf2fc2146f420a", albumName: "Sgt. Pepper's Lonely Hearts Club Band", artistsNames:["The Beatles"] },
    {albumImage: "https://i.scdn.co/image/ab67616d0000b273530cec85d4543693bd726167", albumName: "Backstreet's Back", artistsNames: ["Backstreet Boys"]},
    {albumImage: "https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42", albumName: "The Marshall Matters LP", artistsNames: ["Eminem"]}
  ];

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Grooveix-server";

  mongoose
    .connect(MONGO_URI)
    .then((x) => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
      return Album.create(albums);
    })
    .then(createdAlbums => console.log(`${createdAlbums.length} albums were added`))
    .then(()=> mongoose.connection.close())
    .catch(err => console.log(err))