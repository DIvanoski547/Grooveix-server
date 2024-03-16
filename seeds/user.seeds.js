const mongoose = require("mongoose");
const User = require("../models/User.model");

const users = [
  {
    firstName: "Manolo",
    lastName: "Tijeras",
    username: "manolotijetas",
    email: "manolotijeras@email.com",
    password: "Manolo123",
  },
  {
    firstName: "Jhonny",
    lastName: "Cash",
    username: "jhonnycash",
    email: "jhonnycash@email.com",
    password: "Jhonnycash1",
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    username: "harrypotter",
    email: "harrypotter@email.com",
    password: "Harrypotter1",
  },
  {
    firstName: "David",
    lastName: "Ivanoski",
    username: "davidivanoski",
    email: "davidivanoski@email.com",
    password: "David123",
  },
  {
    firstName: "Omayma",
    lastName: "El Hadari",
    username: "omaymaelhadari",
    email: "omaymaelhadari@email.com",
    password: "Omayma12",
  },
  {
    firstName: "Jack",
    lastName: "Sparrow",
    username: "jacksparrow",
    email: "jacksparrow@email.com",
    password: "Jack1234",
  },
];

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://omayma_elhadari:nZxTZ97DRBycGgZf@cluster0.aeaoh2h.mongodb.net/grooveix-server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return User.create(users);
  })
  .then((createdUsers) =>
    console.log(`${createdUsers.length} users were added`)
  )
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));
