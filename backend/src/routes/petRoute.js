const express = require("express");
const router = express.Router();

const petController = require("../controllers/petController");
const verifyUserRole = require("../middlewares/verifyUserRole");

router.post('/pets', verifyUserRole([]), petController.createPet);


module.exports = router;