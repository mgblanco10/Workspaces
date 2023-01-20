const { User } = require('../../../models')
const { validatePassword } = require('validators')
const { verifyObjectIdString } = require('../../../utils')
const { AuthError, Error, ServerError, FormatError} = require('errors')


module.exports = function updateUserPassword(userId, oldPassword, newPassword, newPasswordRepeat) {

    verifyObjectIdString(userId, 'user id')
    validatePassword(oldPassword)
    validatePassword(newPassword)
    validatePassword(newPasswordRepeat)
   
    //return User.findById({ userId: `${user._id}` })
    return  User.findById({_id: `${userId}`})
        .catch(error => {
            throw new ServerError(error.message)
        })
        .then(user => {
            if (!user) throw new AuthError(`user with id ${user._id} not found`)
            if (user.password !== oldPassword) throw new AuthError('wrong Password')
            if (newPassword !== newPasswordRepeat) throw new Error ('please enter same password')
           
            user.password = newPassword

            return user.save()

        })

        .then(() => { })

}