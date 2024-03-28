const router = require("express").Router();


router.get("/api", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
