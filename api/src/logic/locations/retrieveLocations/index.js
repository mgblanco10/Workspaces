const {Location, User} = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')

function retrieveLocations(userId) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Location.find({user:userId}, 'name address image').lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
})
        .then(locations => {
            locations.forEach(location => {
              

                location.id = location._id.toString()
                delete location._id

                delete location.__v
            })

            return locations
        })
}

module.exports = retrieveLocations