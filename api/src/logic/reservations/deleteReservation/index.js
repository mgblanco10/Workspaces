const { User, Reservation, Workspace } = require('../../../models')
const { NotFoundError, SystemError, AuthError} = require('errors')
const { verifyObjectIdString } = require('../../../utils')


/**
 * Create a reservation for a user
 * 
 * @param {string} userId The user id.
 * @param {string} workspaces The space the work.
 * @Date
 * 
 * @returns {Promise}
 * 
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 * 
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function deleteReservation (reservationId) {
    // verifyObjectIdString(userId, 'user id')
    verifyObjectIdString(reservationId, 'reservation id')
    // debugger
    // return User.findById(userId)
    //     .catch(error => {
    //         throw new SystemError(error.message)
    //     })
    //     .then(user => {
    //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            
            return Reservation.findById(reservationId).lean()
                .catch((error) => {
                    throw new SystemError(error.message)
        })
        .then((reservation) => {
            debugger
            if (!reservation) throw new NotFoundError(`reservation with id ${reservationId} not found`)
debugger
            return Reservation.deleteOne({ _id: reservationId }).catch ((error)=>{
                throw new SystemError (error.message)
            })
        })

        .then((reservation) => { })
}
    module.exports = deleteReservation







