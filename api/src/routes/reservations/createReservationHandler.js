
const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const {reservations: {createReservation}} = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { body: { date}, params: { workspaceId } } = req

        return createReservation(userId, workspaceId, new Date(date))
        .then((reservationId) => {
            res.status(201).send(JSON.stringify({ reservationId }))
        })
    },res,logger);
};

