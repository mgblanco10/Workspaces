const { verify } = require('jsonwebtoken')
const { validateText } = require('validators')
const { env: { JWT_SECRET } } = process

module.exports = req => {
    const { headers: { authorization } } = req

    validateText(authorization, 'authorization')

    const token = authorization.substring(7)

    const payload = verify(token, JWT_SECRET)

    const { sub: userId } = payload

    return userId
}
