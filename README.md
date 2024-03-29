# Grooveix

Grooveix is a music blog where you can see new album releases, current popular artists, view multpile music albums and review them. For future approach, this web app is meant to be a music album e-commerce.

## Description

- **Starter page**   as a non authenticated user you get to this page to either sign up or login if already a user on the page
- **Sign up**   for new users to create their user account
- **Log in**   for existing users to authenticate themselves
- **Log Out**   as an authenticated user you can logout and delete your token and go back to starter page
- **Add Album**   as an authenticated admin user you can create an album to the database
- **Edit Album**   as an authenticated admin user you can edit an album 
- **Delete album**   as an authenticated admin user you can delete an album 
- **View Album details**   as an authenticated user you can view album details
- **Add Review**   as an authenticated user you can add a review on a specific album
- **View reviews**   as an authenticated user you can see all the reviews for a specific user
- **View users**   as an authenticated admin user you can view a lit of all the users in the app
- **View popular artist**   as an authenticated user you can view a popular artist
- **Profile page**    as an authenticated user you can view your profile page
- **Roles**   admin user and client user, only admin can create/edit/delete albums or view all users on the platform
 
## Backlog

Well as said in the introduction the main idea was an music albums e-commerce, so many things stayed in the backlog:
- Veryfication via email after signing in to 
- Retrieve popular tracks from Spotify API
- Show preview of album's tracks from Spotify API
- Add albums to favourites
- Show favourite albums on profile page
- Add albums to shopping cart
- Complete purchase of items in your order
- Be able to edit or delete your own reviews as a client user

# Server
  
  ## Data models
  ### User model
  ```js
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    profileImage: {
      type: String,
      default: "https://vectorified.com/images/avatar-icon-png-13.png",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 20,
      message: "Username already taken",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    role: {
      type: String,
      default: "client",
      enum: ["admin", "client"],
    },
    favouriteAlbums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
```
  ### Album model
  ```js
const { Schema, model } = require("mongoose");

const albumSchema = new Schema({
  albumImage: { type: String },
  albumName: { type: String, required: true },
  artistsNames: [String],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Album = model("Album", albumSchema);

module.exports = Album;

```
  ### Review model
  ```js
const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    albumId: {
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

```

## Server Endpoints

  | Method | Endpoint            | Response (200)                                         | Action                                                       |
| ------ | ------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`  | `/`                 | [beers]                                                | Get all the beers from the DB                                |
| `GET`  | `/:id`              | { beer }                                               | Get a single/specific beer                                   |
| `GET`  | `/random`           | { beer }                                               | Get a random beer from the DB                                |
| `POST` | `/new`              | { message: "New beer successfully saved to database!"} | Create a new beer (see iteration 7 for fields)               |
| `GET`  | `/search?q={query}` | [beers]                                                | Search beers by name containing the specified term. Example: `/search?q=lager` query will return all beers with the word lager in their name. |
