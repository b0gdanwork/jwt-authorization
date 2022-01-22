const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user-controller")

router.use(function timeLog(req, res, next) {
    console.log('router.use')
    next();
})
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.getUsers)


module.exports = router