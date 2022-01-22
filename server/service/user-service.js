const UserModel = require("../models/user-model")
const bcript = require("bcrypt")
const uuid = require("uuid")
const MailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dto")

class UserService {

    async registration(email, password) {
        const newUser = await UserModel.findOne({email})
        if (newUser) {
            throw new Error(`Пользователь с  ${email} уже существует`)
        }
        const hashPassword = await bcript.hash(String(password), 3)
        const avtivetionLink = uuid.v4()
        console.log('SendActivationMail', `${process.env.API_URL}/api/activate/${avtivetionLink}`)
        // await MailService.SendActivationMail(email, `${process.env.API_URL}/api/active/${avtivetionLink}`)
        console.log('в создание пользователя передано', email, password)
        const user = await UserModel.create({email:email, password: hashPassword, activationLink: avtivetionLink})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: UserDto}
    }

    async activate(activationLink) {
        console.log('activate', activationLink)
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw new Error('Пользователь по рефреш токену не найден')
        }
        user.isActivated = true
        await user.save()
    }
}

module.exports = new UserService()