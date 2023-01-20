const { User, Reservation, Workspace } = require('../../../models')
const { NotFoundError, SystemError, DuplicityError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')
const {validateDate} = require('validators')
const endOfDay = require ('date-fns/endOfDay')
const startOfDay = require ('date-fns/startOfDay')

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

function createReservation (userId, workspaceId, date) {
    verifyObjectIdString(userId, 'user id')
    verifyObjectIdString(workspaceId, 'workspace id')
    validateDate(date)
    
    return User.findById(userId).lean()
    .catch(error => {
        throw new SystemError(error.message)
    }) 
    .then(user =>{
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        
        return Workspace.findById(workspaceId).lean()
        
                .catch(error =>{
                    throw new SystemError(error.message)
                })

                .then (workspaceFounded => {

                    if(!workspaceFounded) throw new NotFoundError(`workspace with id ${workspaceId} not found`)
                   
                    const year = date.getFullYear()
                    const month = date.getMonth()
                    const day = date.getDate()

                    const sanitizedDate = new Date(year, month, day) // yyyy-MM-dd 00:00:00

                    return Reservation.findOne({workspace:workspaceId, date: sanitizedDate })
                      
                    .then(reservation => { 
                        if(reservation) throw new DuplicityError(`workspace with id ${workspaceId} is busy on ${date}`)

                        return Reservation.create({user: userId, workspace:workspaceId, date: sanitizedDate})
                    })
                    .then(reservation => {
                        return reservation._id.toString()
                    })
                })
        })

    }
    module.exports = createReservation
	
