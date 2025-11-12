const express = require('express');
const router = express.Router();
const specieControler = require('../controllers/specieControler');
const verifyUserRole = require('../middlewares/verifyUserRole');


router.get('/species',  verifyUserRole([]),specieControler.getSpecies);





module.exports = router;