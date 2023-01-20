const { User, Reservation} = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')


/**
 * retrieve All Reservations
 * 
 * @param {string} userId The user id.
 * @param {string} reservation  
 * @Date
 * 
 * @returns {Promise}
 * 
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function retrieveAllReservations(userId) {
    verifyObjectIdString(userId, 'user id')
debugger
    return User.findById(userId).lean()
        .catch(error => {
            debugger
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Reservation.find({ user: userId }, 'workspace date').populate({path: 'workspace', select: 'image name'}).lean()
                .catch(error => {
                    debugger
                    throw new SystemError(error.message)
                })
        })
        .then(reservations => {
            reservations.forEach(reservation => {

                reservation.id = reservation._id.toString()
                delete reservation._id

                delete reservation.__v
            })

            return reservations
        })
}

module.exports = retrieveAllReservations