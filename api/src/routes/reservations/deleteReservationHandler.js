const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { reservations: { deleteReservation } } = require('../../logic')
const logger = createLogger(module)


module.exports = (req, res) => {
    runWithErrorHandling(() => {
debugger
        const userId = verifyToken(req)

        const { params: { reservationId } } = req
debugger
        return deleteReservation(reservationId)
            .then(()=> res.status(200).send())

    }, res, logger)
}