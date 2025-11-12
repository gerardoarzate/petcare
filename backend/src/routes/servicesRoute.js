const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const verifyUserRole = require('../middlewares/verifyUserRole');


router.get('/services',  verifyUserRole([]),serviceController.getServices);





module.exports = router;