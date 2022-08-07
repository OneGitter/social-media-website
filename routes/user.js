const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/profile',userController.profile);
router.get('/',userController.home);

module.exports = router;