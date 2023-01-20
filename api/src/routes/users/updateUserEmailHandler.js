const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { users: { updateUserEmail } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {

        const userId = verifyToken(req)

        const { body: { newEmail} } = req

        return updateUserEmail(userId, newEmail)
            .then(()=> res.status(204).send())
    }, res, logger)
}