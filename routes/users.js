const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create-id',userController.createId);
router.post('/create-session',userController.createSession);

router.post('/log-out',userController.logOut);

module.exports = router;