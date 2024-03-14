const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const album = require("../models/Album.model");
const user = require("../models/User.model");

//GET Route /api/albums -> show all albums 

//POST Route /api/albums -> add new album to the data base

//GET Route /api/albums/:albumId ->  show one specific album

//PUT Route /api/albums/:albumId -> update one specific album

//DELETE Route /api/albums/:albumId -> delete one specific album


module.exports = router;