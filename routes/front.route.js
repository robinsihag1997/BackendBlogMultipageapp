const express = require('express');
const { index, detail, login, register, addUser, loginUser, forgetPassword, forgetPasswordPost, createNewPassword, createNewPasswordPost } = require('../controllers/front.controller');
const router = express.Router();

router.get('/', index) 
router.get('/details/:id', detail)

router.get('/login' , login)
router.post('/login' , loginUser)

router.get('/register', register)
router.post('/register', addUser)

router.get('/forget-password', forgetPassword)
router.post('/forget-password', forgetPasswordPost)

router.get('/create-new-password/:token', createNewPassword)
router.post('/create-new-password', createNewPasswordPost)

module.exports = router;



