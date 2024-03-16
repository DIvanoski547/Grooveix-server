const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", isAuthenticated, (req, res, next) => {
  res.json("All good in here");
});

// GET → /startPage → Show starter page for every user.

// GET → / → isLoggedIn → Show homepage if user is signed in.

module.exports = router;
