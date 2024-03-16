const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
      // match: [/^\S+@\S+\.\S+$/, "Email format is invalid"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      // validate: function (value) {
      //   return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?`~]).{8,}$/.test(
      //     value
      //   );
      // },
      // message: (props) =>
      //   "${props.value} is not a valid password. Password must have 8 characters minimum, incluiding one uppercase letter, one lowercase letter, one digit and one special character",
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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
