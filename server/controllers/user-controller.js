class UserController {
    async registration(req, res, next) {

        try {

        } catch (e) {
            console.log("Ошибка в контроллере")
        }

    }

    async login(req, res, next) {

        try {

        } catch (e) {
            console.log("Ошибка в контроллере")
        }

    }

    async logout(req, res, next) {

        try {

        } catch (e) {
            console.log("Ошибка в контроллере")
        }

    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            console.log("Ошибка в контроллере")
        }
    }

    async getUsers(req, res, next)  {
        try {
            res.json(['123'])
        } catch (e) {
            console.log("Ошибка в контроллере")
        }
    }

    async activate(req, res, next)  {
        try {

        } catch (e) {
            console.log("Ошибка в контроллере")
        }
    }

}

module.exports = new UserController()