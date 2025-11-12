const express = require("express");
const router = express.Router();

const vetController = require("../controllers/vetController");
const verifyUserRole = require("../middlewares/verifyUserRole");

router.post('/vets', verifyUserRole([]) ,vetController.createVet);

module.exports = router;