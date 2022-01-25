const ApiError = require('../exceptions/api-error')
const TokenService = require("../service/token-service")

module.exports = function (req, res, next) {

    try {
        const authorizationHeaders = req.headers.authorization;
        if (!authorizationHeaders) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeaders.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userdata =  TokenService.validateAccessToken(accessToken)
        if (!userdata) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userdata
        next()

    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}