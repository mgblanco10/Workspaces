const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { reservations: { retrieveAllReservations } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        debugger
        const userId = verifyToken(req)
        
        return retrieveAllReservations(userId).then ((reservations)=>
            res.status(200).json(reservations))
    }, res, logger)
}

