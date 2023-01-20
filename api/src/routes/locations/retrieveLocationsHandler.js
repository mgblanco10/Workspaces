const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { locations: { retrieveLocations }} = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        return retrieveLocations(userId)
        .then(locations => res.status(200).json(locations))

    }, res, logger)
}

