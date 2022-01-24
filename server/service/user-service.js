const UserModel = require("../models/user-model")
const bcript = require("bcrypt")
const uuid = require("uuid")
const MailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")


class UserService {

    async registration(email, password) {
        const newUser = await UserModel.findOne({email})
        if (newUser) {
            throw ApiError.BadRequest(`Пользователь с  ${email} уже существует`)
        }
        const hashPassword = await bcript.hash(String(password), 3)
        const avtivetionLink = uuid.v4()
        console.log('SendActivationMail', `${process.env.API_URL}/api/activate/${avtivetionLink}`)
        // await MailService.SendActivationMail(email, `${process.env.API_URL}/api/active/${avtivetionLink}`)
        const user = await UserModel.create({email:email, password: hashPassword, activationLink: avtivetionLink})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: UserDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Ссылка на активацию не актвивна')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с  ${email} не существует`)
        }
        const isPassEquals = await bcript.compare(String(password), user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: UserDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.remove(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: UserDto}
    }
}

module.exports = new UserService()