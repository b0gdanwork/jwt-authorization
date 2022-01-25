const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user-controller")
const { body } = require("express-validator");
const AuthMiddleware = require("../middlewares/auth-middleware")

// router.use(function timeLog(req, res, next) {
//     console.log('router.use')
//     next();
// })

router.post('/registration',
    body('email').isEmail(),
    body("password").isLength({ min: 3, max: 32 }),
    UserController.registration)

router.post('/login',
    UserController.login,
)

router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users',AuthMiddleware, UserController.getUsers)


module.exports = router