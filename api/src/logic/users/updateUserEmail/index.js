const { User } = require('../../../models')
const { validateEmail, } = require('validators')
const { verifyObjectIdString } = require('../../../utils')
const { DuplicityError, SystemError } = require('errors')


module.exports = function updateUserEmail(userId, newEmail) {
  verifyObjectIdString(userId)
  validateEmail(newEmail)

  return User.updateOne({ _id: userId }, { $set: { email: newEmail } })
    .then(() => { })
    .catch(error => {
      if (error.code === 11000) throw new DuplicityError(`user with email ${newEmail} already exists`)
      throw new SystemError(error.message)
    })
}