const { User, Reservation } = require( "../../../models" );
const { NotFoundError, SystemError, AuthError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')


/**
 * retrieve Reservation
 * 
 * @param {string} userId The user id.
 * @param {string} reservationId  
 * @Date
 * 
 * @returns {Promise}
 * 
 * 
 *  @throws {AuthError} If not is the user. 
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */


function retrieveReservation ( userId, reservationId ) {
    verifyObjectIdString(userId, 'user id')
    verifyObjectIdString(reservationId, 'reservation id')

    return User.findById(userId).lean()
    .catch(error => {
        throw new SystemError(error.message)
    }) 
    .then(user =>{
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    return Reservation.findById( reservationId ).populate({path: 'workspace', select: 'name'}).lean()
        .then( reservation => {
           if(!reservation) throw new NotFoundError(`reservation with id ${reservationId} not found`)
           
            if(reservation.user.toString() !== userId) throw new AuthError(`reservation with id ${reservationId} does not belong to user with id ${userId}`)

            return reservation
        } )
    })
}
module.exports = retrieveReservation