const UserService = require("../service/user-service")

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            console.log("Ошибка в контроллере registration", e)
        }

    }

    async login(req, res, next) {
        console.log('login')
        try {

        } catch (e) {
            console.log("Ошибка в контроллере login")
        }

    }

    async logout(req, res, next) {

        try {

        } catch (e) {
            console.log("Ошибка в контроллере logout")
        }

    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            console.log("Ошибка в контроллере refresh")
        }
    }

    async getUsers(req, res, next)  {
        try {
            res.json(['123'])
        } catch (e) {
            console.log("Ошибка в контроллере getUsers")
        }
    }

    async activate(req, res, next)  {
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            console.log("Ошибка в контроллере активации activate", e)
        }
    }

}

module.exports = new UserController()