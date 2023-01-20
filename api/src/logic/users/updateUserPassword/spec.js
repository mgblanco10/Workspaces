require('dotenv').config()

const { connect, disconnect } = require('mongoose')
const { User } = require('../../../models')
const { AuthError,FormatError, ServerError } = require('errors')
const updateUserPassword = require( '.' )
const { authenticateUser, updatePassword } = require('.')

const MONGO_URL_TEST = process.env.MONGO_URL_TEST

describe('updateUserPassword', () => {
    beforeAll(() => connect(MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('should succeed updating password', () => {
        const name = 'Pepito'
        const email = 'pepito@grillo.com'
        const password = '123123123'
        const newPassword = '123123123'
        const user = new User( { name, email, password } )

        return updateUserPassword ( name, email, password )
            .then(() => authenticateUser(email, password))
            .then(userId => updatePassword(userId, password, newPassword))
            .then(() => User.findOne({ email }))
            .then(user => expect(user.password).toBe(newPassword))
    })

    it('should fail with wrong old password', () => {
        const name = 'Pepito'
        const email = 'pepito@grillo.com'
        const password = '123123123'
        const newPassword = '124124124'
        const user = new User( { name, email, password } )

        return updateUserPassword ( name, email, password )
        .then(() => authenticateUser(email, password))
        .then(userId => updatePassword(userId, password, newPassword))
        .then(() => User.findOne({ email }))
        .then(user => expect(user.password).toBe(newPassword))
        .then(userId => updatePassword(userId, '123123123', newPassword))
            .then(() => {
                throw new FormatError('please enter same password')
            })
            .catch(error => {
                //expect(error).toBeInstanceOf(SystemError)
                //expect(error.message).toEqual('wrong Password')
            })
    })

    afterAll(() => disconnect())
})