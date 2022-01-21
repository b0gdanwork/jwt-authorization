const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user-controller")


router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/registration', UserController.registration);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);


module.exports = router