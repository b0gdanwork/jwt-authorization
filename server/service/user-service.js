const UserModel = require("../models/user-model")
const bcript = require("bcrypt")

class UserService {
    async registration(email, password) {
        const newUser = await UserModel.findOne({email})
        if (newUser) {
            throw new Error(`Пользователь с  ${email} уже существует`)
        }
        const hashPassword = await bcript.hash(password, 3)
        const user = await UserModel.create({email, password: hashPassword})

    }
}

module.exports = new UserService()